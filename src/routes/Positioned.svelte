<script lang="ts">
	import {onMount, type Snippet} from 'svelte';

	// TODO what should the name/scope of this component be?

	interface Props {
		x: number;
		y: number;
		scale: number;
		children: Snippet;
	}

	const {x, y, scale, children}: Props = $props();

	let scale_ready = $state(false);
	const final_scale = $derived(scale_ready ? scale : 0);

	// TODO what's a better way to do this? problem is using Svelte's `in:scale`
	// makes things go haywire in some cases because we're also setting `transform`
	onMount(() => {
		setTimeout(() => (scale_ready = true), 20); // TODO fixes initial scale, doing `await tick()` even 3x doesn't work but timeout does, idk
	});
</script>

<div
	class="item"
	style:transform="translate3d({x}px, {y}px, 0px) scale3d({final_scale}, {final_scale}, {final_scale})"
>
	{@render children()}
</div>

<style>
	.item {
		position: absolute;
		left: 0;
		top: 0;
		transition: transform 1s ease-out;
	}
</style>
