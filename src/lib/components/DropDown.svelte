<script>
	import { slide } from 'svelte/transition';

	export let show;


</script>

<div class="relative">
	<slot name="trigger" />

	{#if show}
		<div class="absolute z-50 right-0" transition:slide={{ duration: 100 }}>
			<slot name="content" data-role="dropdown-menu" />
		</div>
	{/if}
</div>
