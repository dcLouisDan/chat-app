<script>
	export let type = 'button';
	export let isDisabled = false;
	$: disabled = isDisabled ? 'disabled' : '';
</script>

<button
	{type}
	{disabled}
	class="disabled:opacity-50 disabled:pointer-events-none rounded-md duration-150 font-display bg-blue-700 hover:bg-blue-600 active:bg-blue-500 text-white w-full px-5 py-2"
	on:click
>
	<slot />
</button>
