<script lang="ts" module>
	export function some_exported_function_in_module_context(v: boolean): string {
		return v + '';
	}
</script>

<script lang="ts">
	// this comment is ignored
	export function some_exported_function(): number {
		return 0;
	}

	/**
	 * this is a doc comment that gets parsed
	 */
	export function some_exported_function_with_comment(): string {
		return '';
	}
</script>
