<script>
  export let type="button"
</script>
<button {type} class="rounded-md duration-150 box-border font-display border-2 border-gray-400 bg-none hover:bg-gray-100  active:bg-gray-200 text-gray-600 w-full px-5 py-2" on:click>
	<slot />
</button>
