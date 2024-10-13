import {parse, type AST} from 'svelte/compiler';
import {walk, type Visitors} from 'zimmerframe';

// TODO types are bad, so many any

export interface Parsed_Docinfo {
	docinfo: Docinfo;
	ast: AST.Root;
}

export interface Docinfo {
	props: Docinfo_Prop[];
	exports: Docinfo_Export[];
	generics: string | null; // TODO parse with ts-morph?
}

export interface Docinfo_Prop {
	name: string;
	comment: string[] | null;
	type: string;
	optional: boolean;
	bindable: boolean;
	default: null | string;
}

export interface Docinfo_Export {
	name: string;
	comment: string[] | null;
	// type: string; // TODO infer with tsmorph? something else? is lossy to parse from the AST
}

export const parse_docinfo = (contents: string): Parsed_Docinfo => {
	const ast = parse(contents, {modern: true});
	return {docinfo: ast_to_docinfo(ast, contents), ast};
};

export const ast_to_docinfo = (parsed: AST.Root, contents: string): Docinfo => {
	const interface_props: Map<string, {type: string; comment: null | string[]; optional: boolean}> =
		new Map();
	const defaults: Map<string, {bindable: boolean; default: string | null}> = new Map();
	let generics: string | null = null;
	const exports: Docinfo_Export[] = [];

	const visitors: Visitors<any, any> = {
		// handle $props
		VariableDeclarator(node: any, {next, path}) {
			if (node.init.callee?.name !== '$props') {
				return;
			}
			for (const property of node.id.properties) {
				if (
					property.type === 'Property' &&
					property.key.type === 'Identifier' &&
					property.value.type === 'AssignmentPattern'
				) {
					const prop_name = property.key.name;
					let default_value: string | null;
					let bindable = false;

					const right = property.value.right;
					if (
						right.type === 'CallExpression' &&
						right.callee.type === 'Identifier' &&
						right.callee.name === '$bindable'
					) {
						default_value = right.arguments.length
							? contents.substring(right.arguments[0].start, right.arguments[0].end)
							: null;
						bindable = true;
					} else {
						default_value = contents.substring(right.start, right.end) || null;
					}

					defaults.set(prop_name, {
						default: default_value,
						bindable,
					});
				}
			}

			const {typeAnnotation} = node.id;
			if (typeAnnotation.typeAnnotation.type === 'TSTypeLiteral') {
				// handle `const {type}: {type: 'literal'} = $props();`
				add_type_members(interface_props, contents, typeAnnotation.typeAnnotation.members);
			} else if (typeAnnotation.typeAnnotation.type === 'TSTypeReference') {
				// handle `const {type}: Props = $props();`
				const name = typeAnnotation.typeAnnotation.typeName.name;
				const program_node = path.find((n) => n.type === 'Program');
				walk(
					program_node,
					{},
					{
						TSInterfaceDeclaration(node: any) {
							if (node.id.name === name) {
								add_type_members(interface_props, contents, node.body.body);
							}
						},
					},
				);
			}

			next();
		},
		ExportNamedDeclaration(node: any, {next}) {
			let name: string;

			// TODO instead of parsing these further, probably use ts-morph for inference?
			if (node.declaration.type === 'VariableDeclaration') {
				name = node.declaration.declarations[0].id.name; // TODO what could the other indices be?
			} else if (node.declaration.type === 'FunctionDeclaration') {
				name = node.declaration.id.name;
			} else {
				next();
				return;
			}

			const comment = node.leadingComments ? parse_leading_comments(node.leadingComments) : null;

			exports.push({name, comment});

			next();
		},
		Script(node: any, {next}) {
			const generics_attr = node.attributes.find((a: any) => a.name === 'generics');
			if (generics_attr) {
				generics = generics_attr.value[0].data; // TODO parse with ts-morph?
			}
			next();
		},
	};

	walk(parsed, {}, visitors);

	const props: Docinfo_Prop[] = Array.from(interface_props.entries()).map(
		([prop_name, prop_info]) => {
			const default_info = defaults.get(prop_name);

			return {
				name: prop_name,
				comment: prop_info.comment,
				type: prop_info.type,
				optional: prop_info.optional,
				bindable: default_info ? default_info.bindable : false,
				default: default_info ? default_info.default : null,
			};
		},
	);

	return {props, exports, generics};
};

const add_type_members = (
	interface_props: Map<string, {type: string; comment: null | string[]; optional: boolean}>,
	contents: string,
	members: any[],
) => {
	for (const member of members) {
		if (member.type !== 'TSPropertySignature' || member.key.type !== 'Identifier') {
			continue; // TODO maybe unnecessary
		}
		const prop_name = member.key.name;
		const prop_optional = member.optional ?? false;
		const prop_type = member.typeAnnotation
			? contents.substring(
					member.typeAnnotation.typeAnnotation.start,
					member.typeAnnotation.typeAnnotation.end,
				)
			: 'any';
		const comment = member.leadingComments ? parse_leading_comments(member.leadingComments) : null;
		interface_props.set(prop_name, {
			type: prop_type,
			comment,
			optional: prop_optional,
		});
	}
};

const parse_leading_comments = (nodes: any[]): string[] | null => {
	const c = nodes
		.slice()
		.reverse()
		.find((n) => n.type === 'Block' && n.value.startsWith('*'));
	if (!c) return null;
	return parse_jsdoc_comment(c.value);
};

/**
 * Parses a JSDoc comment and returns an array of comment lines.
 * Preserves standalone newlines as individual `'\n'` strings.
 * Handles JSDoc tags by keeping them as separate entries.
 *
 * @todo replace with something like TSDoc
 */
const parse_jsdoc_comment = (comment: string): string[] => {
	// Step 1: Split the comment into individual lines and clean each line
	const lines = comment.split('\n').map((line) => {
		let trimmed = line.trim();

		// Remove leading '/**' or trailing '*/'
		if (trimmed.startsWith('/**')) {
			trimmed = trimmed.substring(3).trim();
		}
		if (trimmed.startsWith('*/')) {
			trimmed = trimmed.substring(2).trim();
		}

		// Remove leading '*' and any following space
		if (trimmed.startsWith('*')) {
			trimmed = trimmed.substring(1).trim();
		}

		return trimmed;
	});

	// Step 2: Remove leading and trailing empty lines to prevent unwanted '\n's
	while (lines.length > 0 && lines[0] === '') {
		lines.shift();
	}
	while (lines.length > 0 && lines[lines.length - 1] === '') {
		lines.pop();
	}

	const result: string[] = [];
	let s = '';
	let blank_line_count = 0;

	// Step 3: Iterate through each cleaned line
	for (const line of lines) {
		if (line.startsWith('@')) {
			// Handle JSDoc tags
			if (s) {
				result.push(s);
				s = '';
			}
			result.push(line);
			blank_line_count = 0; // Reset blank line count after a tag
		} else if (line === '') {
			// Count consecutive blank lines
			blank_line_count += 1;
		} else {
			if (blank_line_count > 0) {
				// Before inserting '\n's, ensure `s` is pushed to result
				if (s) {
					result.push(s);
					s = '';
				}

				// Determine the number of '\n's to insert based on blank_line_count
				// For n blank lines, insert (n - 1) '\n's
				const num_newlines = blank_line_count > 1 ? blank_line_count - 1 : 0;
				for (let i = 0; i < num_newlines; i++) {
					result.push('\n');
				}

				blank_line_count = 0; // Reset after handling
			}

			// Accumulate the current line into `s`
			s += (s ? ' ' : '') + line;
		}
	}

	// Step 4: Push any remaining content to the result
	if (s) {
		result.push(s);
	}

	return result;
};
