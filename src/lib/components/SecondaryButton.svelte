<script>
	export let type = 'button';
	export let isDisabled = false;
	$: disabled = isDisabled ? 'disabled' : '';
</script>

<button
	{type}
	{disabled}
	class="disabled:opacity-50 disabled:pointer-events-none rounded-md duration-150 box-border font-display border-2 border-gray-400 bg-none hover:bg-gray-100 active:bg-gray-200 text-gray-600 w-full px-5 py-2"
	on:click
>
	<slot />
</button>
