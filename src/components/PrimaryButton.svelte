<script>
  export let type = "button"
</script>
<button {type} class="rounded-md duration-150 font-display bg-blue-700 hover:bg-blue-600 active:bg-blue-500 text-white w-full px-5 py-2" on:click>
	<slot />
</button>
