<script lang="ts" module>
	export const some_exported_const_in_module_context = (v: boolean): string => v + '';
</script>

<script lang="ts">
	// this comment is ignored
	export const some_exported_const = 0;

	// this is the only way to get types for exports at the moment, see readme
	export const some_export_with_type: Date = new Date();

	export const some_export_with_complex_type: 'a' | 'b' = 'a';

	/**
	 * this is a doc comment that gets parsed
	 */
	export const some_exported_const_with_comment = '';
</script>
