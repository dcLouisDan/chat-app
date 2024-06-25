<script>
	export let type = 'button';
	export let size = 'base';
	export let isDisabled = false;
  let sizeClasses;
	$: disabled = isDisabled ? 'disabled' : '';
  switch (size) {
    case 'sm':
      sizeClasses = 'px-3 py-1 text-sm'
      break;
    default:
      sizeClasses = 'px-5 py-2'
  }
</script>

<button
	{type}
	{disabled}
	class="disabled:opacity-50 disabled:pointer-events-none rounded-md duration-150 bg-gray-100 font-display border-gray-400 bg-none hover:bg-gray-200 active:bg-gray-300 text-gray-600 w-full {sizeClasses}"
	on:click
>
	<slot />
</button>
