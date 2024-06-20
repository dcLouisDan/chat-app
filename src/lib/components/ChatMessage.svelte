<script>
export let message
export let myname
</script>

{#if myname == message.username}
	<div class="py-2 pe-4 ps-10 flex flex-col items-end">
		<div class="text-sm text-gray-800 mb-1 font-bold">
			{message.username}
		</div>
		<div class="bg-blue-700 text-white w-fit px-2 py-1 rounded-md">
			{message.message}
		</div>
	</div>
{:else}
	<div class="py-2 pe-10 ps-4 flex flex-col items-start">
		<div class="text-sm text-gray-800 mb-1 font-bold">
			{message.username}
		</div>
		<div class="bg-white w-fit px-2 py-1 rounded-md">
			{message.message}
		</div>
	</div>
{/if}
