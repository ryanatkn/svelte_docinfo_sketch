<script lang="ts" module>
	export const some_exported_const_in_module_context = (v: boolean): string => v + '';
</script>

<script lang="ts">
	// this comment is ignored
	export const some_exported_const = 0;

	/**
	 * this is a doc comment that gets parsed
	 */
	export const some_exported_const_with_comment = '';
</script>
