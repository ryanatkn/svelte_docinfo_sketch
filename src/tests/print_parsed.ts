import {parse_docinfo} from '$lib/docinfo.js';
// import some_component_contents from '$routes/+layout.svelte?raw';

// usage: `gro run src/tests/print_parsed.ts`

const some_component_contents = `
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

  export const exported_needs_inference: Date = new Date();

  export const exported = 'TODO infer type for exports';
</script>
`;

const parsed = parse_docinfo(some_component_contents);

console.log(`\nparsed`, JSON.stringify(parsed.ast));
console.log(`\nparsed`, JSON.stringify(parsed.docinfo));

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
	"exports": [
		{"name": "export_with_type", "comment": null, "type": "Date"},
		{"name": "exported", "comment": null, "type": null}
	],
	"generics": "T, U extends string"
}

*/
