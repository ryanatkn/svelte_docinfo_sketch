# svelte_docinfo_sketch

> a sketch of a module for extracting metadata from Svelte components

This is not maintained software and it's not published to npm.
Feel free to use it for whatever, it's public domain.
Contributions are welcome, see the issues/PRs/discussions.

It's like [Sveld](https://github.com/carbon-design-system/sveld)
but supporting Svelte 5, and probably SvelteKit soon.

## Usage

There's one module, [$lib/docinfo.ts](./src/lib/docinfo.ts).

To get the metadata from a thing:

```ts
import {parse_docinfo, ast_to_docinfo} from '$lib/docinfo.js;';
import some_component_contents from '$routes/+layout.svelte?raw';

const parsed = parse_docinfo(`
<script lang="ts">
	const {
		some_simple_prop,
	}: {
		/**
		 * comments
		 * go here
		 *
		 * etc
		 */
		some_simple_prop: boolean;
	} = $props();
</script>
`);
/*
{
	"props": [
		{
			"name": "some_simple_prop",
			"comment": ["comments go here", "etc"],
			"type": "boolean",
			"optional": false,
			"bindable": false,
			"default": null
		}
	],
	"exports": [],
	"generics": null
}
*/
```

Tests at [$tests/docinfo.ts](./src/tests/docinfo.test.ts)
and [$tests/samples](./src/tests/samples).

```ts
// $lib/docinfo.ts

export const parse_docinfo: (contents: string) => Parsed_Docinfo;

export const ast_to_docinfo: (parsed: AST.Root, contents: string) => Docinfo;

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
- probably other things, please open issues/PRs/discussions
- probably expand scope to SvelteKit projects

## License

[Unlicense](license) (public domain)
