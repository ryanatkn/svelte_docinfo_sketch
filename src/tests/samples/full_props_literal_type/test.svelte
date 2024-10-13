<script lang="ts">
	import type {Snippet} from 'svelte';

	let {
		some_normal_prop,
		some_literal_prop,
		some_optional_prop,
		some_optional_prop_with_default = 1,
		some_optional_bindable_prop = $bindable([]),
		some_object_literal_prop,
		some_tuple_literal_prop,
		some_class_prop,
		some_snippet_prop,
	}: {
		some_normal_prop: boolean;
		some_literal_prop: 'a string literal';
		some_optional_prop?: number;
		some_optional_prop_with_default?: number;
		some_optional_bindable_prop?: unknown[];
		some_object_literal_prop: {a: number; b: string};
		some_tuple_literal_prop: [c: number, d: string];
		some_class_prop: Set<string>;
		/**
		 * Some prop comment.
		 * @hi lol
		 */
		some_commented_prop: Map<string, Date>;
		some_snippet_prop: Snippet;
	} = $props();

	// silence the errors
	some_normal_prop;
	some_literal_prop;
	some_optional_prop;
	some_optional_prop_with_default;
	some_optional_bindable_prop;
	some_object_literal_prop;
	some_tuple_literal_prop;
	some_class_prop;
	some_snippet_prop;
</script>
