<script>
	export let href = '#';
</script>

<a
	{href}
	class="transition-all duration-150 text-center rounded-md box-border font-display border-2 border-gray-400 hover:bg-gray-100  active:bg-gray-200 bg-none  text-gray-600 w-full px-5 py-2"
	on:click
>
	<slot />
</a>
