<script lang="ts">
	interface Props {
		some_required_prop_with_default: number;
		some_optional_prop_with_default?: number;
		some_optional_bindable_prop_without_default?: string;
		some_optional_bindable_prop_with_default?: string[];
	}

	let {
		some_required_prop_with_default = 1,
		some_optional_prop_with_default = 1,
		some_optional_bindable_prop_without_default = $bindable(),
		some_optional_bindable_prop_with_default = $bindable([]),
	}: Props = $props();

	// silence the errors
	some_required_prop_with_default;
	some_optional_prop_with_default;
	some_optional_bindable_prop_without_default;
	some_optional_bindable_prop_with_default;
</script>
