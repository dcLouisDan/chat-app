<script>
	export let show = false;

	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher()

  const close = () => {
    dispatch('close')
  }
</script>

{#if show}
	<div class="h-screen w-full absolute z-50" transition:fade={{duration: 100}}>
		<div
			class="
      h-full w-full absolute top-0 left-0 -z-10 bg-black bg-opacity-70
      "
      on:click={close}
      aria-hidden="true"
		></div>
		<div role="dialog" class="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
			<slot />
		</div>
	</div>
{/if}
