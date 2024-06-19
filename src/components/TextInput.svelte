<script>
	export let id = '';
	export let value = '';
	export let placeholder;
	export let type = 'text';
	export let label = '';
	export let name = '';
	export let errorMessage = '';

	const handleInput = (e) => {
		value = e.target.value;
	};

	$: isError = errorMessage != '';
	$: height = label != '' ? 'h-15' : 'h-11';
	$: borderClass = isError ? 'border-2 border-red-400' : 'border-2 border-gray-300';
</script>

<div class="relative mb-5 {height}">
	{#if label != ''}
		<label class="font-display text-gray-600 font-bold ps-2" for={id}>{label}</label>
	{/if}
	<input
		{id}
		{type}
		{name}
    {value}
		class="w-full bg-gray-50 box-border px-5 py-2 rounded-md text-gray-700 {borderClass}"
		{placeholder}
		on:input={handleInput}
	/>
	{#if isError}
		<div class="text-xs text-red-400 absolute -bottom-4 left-2">{errorMessage}</div>
	{/if}
</div>
