<script lang="ts" generics="T, U">
	// atm the type reference form with an interface like `Props` doesn't work with generics

	const {
		some_normal_prop,
		some_other_prop,
	}: {
		some_normal_prop: Set<T>;
		some_other_prop: Set<U>;
	} = $props();

	// silence the errors
	some_normal_prop;
	some_other_prop;
</script>
