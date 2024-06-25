<script>
	export let id = '';
	export let value = '';
	export let placeholder;
	export let type = 'text';
	export let label = '';
	export let name = '';
	export let errorMessage = '';
	export let classIn= 'bg-gray-100';

	const handleInput = (e) => {
		value = e.target.value;
	};

	$: isError = errorMessage != '';
	$: height = label != '' ? 'h-8' : 'h-7';
	$: borderClass = isError ? 'border-2 border-red-400' : 'border-2 border-gray-300';
</script>

<div class="relative mb-5 {height} flex-1">
	{#if label != ''}
		<label class="font-display text-gray-600 font-bold ps-2" for={id}>{label}</label>
	{/if}
	<input
		{id}
		{type}
		{name}
    {value}
		class="w-full text-sm {classIn} box-border h-8 px-2 rounded-md text-gray-700 {borderClass} focus:outline-blue-700 focus:outline-2"
		{placeholder}
		on:input={handleInput}
	/>
	{#if isError}
		<div class="text-xs text-red-400 absolute -bottom-5 left-2">{errorMessage}</div>
	{/if}
</div>

<style>
  input:focus {
    border:none
  }
</style>
