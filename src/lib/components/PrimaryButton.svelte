<script>
	export let type = 'button';
  export let size = 'base'
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
	class="disabled:opacity-50 disabled:pointer-events-none rounded-md duration-150 font-display bg-blue-700 hover:bg-blue-600 active:bg-blue-500 text-white w-full {sizeClasses}"
	on:click
>
	<slot />
</button>
