# svelte_docinfo_sketch

> a sketch of a module for extracting metadata from Svelte components

This repo is for experimenting. It's not maintained software and it's not published to npm.
Please use it however you'd like, it's public domain.
Contributions are welcome, issues/PRs/discussions.

It's like [Sveld](https://github.com/carbon-design-system/sveld)
but [supporting Svelte 5](https://github.com/carbon-design-system/sveld/issues/128),
and probably SvelteKit soon. It might get opinionated.

Uses [`zimmerframe`](https://github.com/rich-harris/zimmerframe) for AST walking
and Svelte's [`parse`](https://github.com/sveltejs/svelte/blob/6534f507ce0a39b50b851d67868a1716cca6efae/packages/svelte/src/compiler/index.js#L105)
with `{modern: true}`.

## Usage

There's one module, [`$lib/docinfo.ts`](./src/lib/docinfo.ts).

To get the metadata from a component:

```ts
import {parse_docinfo} from '$lib/docinfo.js;';

const docinfo = parse_docinfo(`
<script lang="ts" generics="T, U extends string">
	const {
		some_simple_prop,
		some_bindable_prop = $bindable('fallback'),
	}: {
		/**
		 * comments
		 * go here
		 *
		 * etc
		 */
		some_simple_prop: T;
		some_bindable_prop?: U;
	} = $props();

  export const exported = 'TODO infer type for exports';
</script>
`);
/*
{
	"props": [
		{
			"name": "some_simple_prop",
			"comment": ["comments go here", "etc"],
			"type": "T",
			"optional": false,
			"bindable": false,
			"default": null
		},
		{
			"name": "some_bindable_prop",
			"comment": null,
			"type": "U",
			"optional": true,
			"bindable": true,
			"default": "'fallback'"
		}
	],
	"exports": [{"name": "exported", "comment": null}],
	"generics": "T, U extends string"
}
*/

import some_component_contents from '$routes/+layout.svelte?raw';
const docinfo = parse_docinfo(some_component_contents);

import {ast_to_docinfo} from '$lib/docinfo.js;';
const docinfo = ast_to_docinfo(some_modern_svelte_ast, some_component_contents);
```

Tests at [`$tests/docinfo.test.ts`](./src/tests/docinfo.test.ts)
and [`$tests/samples`](./src/tests/samples).

```ts
// $lib/docinfo.ts

export const parse_docinfo: (contents: string, parse_options?: ParserOptions) => Parsed_Docinfo;

export const ast_to_docinfo: (ast: AST.Root, contents: string) => Docinfo;

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
	// TODO infer with ts-morph? something else? is lossy to parse from the AST
	// type: string;
}
```

Run tests:

```bash
npm i
npm test
```

To see some output in your terminal:

```bash
npx gro run src/tests/print_parsed.ts
```

## Todo

- inferred exports types (ts-morph?)
- support metadata extraction from `.svelte.ts` files
- magical rune detection
- probably expand scope to SvelteKit projects
- probably other things, please open issues/PRs/discussions

## License

[Unlicense](license) ⚘ public domain
