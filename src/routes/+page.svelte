<script>
	let appHeight = 750;
	let myname = 'Dan';

	let messageValue = '';
	let minRows = 1;
	let maxRows = 5;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;

	// Chat Messages
	let headerHeight = 0;
	let inputHeight = 0;
	let chatBodyHeight = 0;
	$: {
		chatBodyHeight = appHeight - (headerHeight + inputHeight);
		console.log(chatBodyHeight);
	}

	const messages = [
		{
			username: 'Dan',
			message: 'Hello'
		},
		{
			username: 'Louis',
			message: 'Hi guys'
		},
		{
			username: 'Chris',
			message: 'How are you guys?'
		},
		{
			username: 'Dan',
			message: "I'm ok."
		},
		{
			username: 'Dan',
			message: 'Hello'
		},
		{
			username: 'Louis',
			message: 'Hi guys'
		},
		{
			username: 'Chris',
			message: 'How are you guys?'
		},
		{
			username: 'Dan',
			message: "I'm ok."
		},
		{
			username: 'Dan',
			message: 'Hello'
		},
		{
			username: 'Louis',
			message: 'Hi guys'
		},
		{
			username: 'Chris',
			message: 'How are you guys?'
		},
		{
			username: 'Dan',
			message: "I'm ok."
		},
		{
			username: 'Dan',
			message: 'Hello'
		},
		{
			username: 'Louis',
			message: 'Hi guys'
		},
		{
			username: 'Chris',
			message: 'How are you guys?'
		},
		{
			username: 'Dan',
			message: "I'm ok."
		},
		{
			username: 'Dan',
			message: 'Hello'
		},
		{
			username: 'Louis',
			message: 'Hi guys'
		},
		{
			username: 'Chris',
			message: 'How are you guys?'
		},
		{
			username: 'Dan',
			message: "I'm ok."
		},
		{
			username: 'Dan',
			message: 'Hello'
		},
		{
			username: 'Louis',
			message: 'Hi guys'
		},
		{
			username: 'Chris',
			message: 'How are you guys?'
		},
		{
			username: 'Dan',
			message: "I'm ok."
		}
	];
</script>

<svelte:head>
	<title>Svelte Chat App</title>
</svelte:head>

<main class="bg-gray-200 flex items-center justify-center h-screen w-full">
	<div
		class="shadow-lg border-2 rounded-xl min-w-[400px] min-h-[{appHeight}px] bg-white overflow-hidden flex flex-col"
	>
		<!-- Header -->
		<header
			class="flex items-center bg-blue-700 w-full text-white font-bold px-4 py-2"
			bind:clientHeight={headerHeight}
		>
			<h1>Chat Group</h1>
		</header>

		<!-- Chat Body -->
		<div
			class="flex-1 bg-blue-50 overflow-y-scroll flex flex-col-reverse gap-1"
			style="max-height: {chatBodyHeight}px;"
		>
			{#each messages as message}
				{#if myname == message.username}
					<div class="py-2 px-4 flex flex-col items-end">
						<div class="text-sm text-gray-800 mb-1 font-bold">
							{message.username}
						</div>
						<div class="bg-blue-700 text-white w-fit px-2 py-1 rounded-md">
							{message.message}
						</div>
					</div>
        {:else}
					<div class="py-2 px-4">
						<div class="text-sm text-gray-800 mb-1 font-bold">
							{message.username}
						</div>
						<div class="bg-white w-fit px-2 py-1 rounded-md">
							{message.message}
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Input -->
		<div class="bg-white py-2 px-4 flex items-center gap-2" bind:clientHeight={inputHeight}>
			<div class="flex-1 flex items-center relative">
				<pre
					class="border-2 rounded-xl px-4 py-1 opacity-0 pointer-events-none"
					style="min-height: {minHeight}; max-height: {maxHeight}">{messageValue}</pre>
				<textarea
					type="text"
					class="w-full h-full absolute top-0 bg-gray-50 border-2 rounded-xl px-4 py-1 resize-none"
					rows="1"
					placeholder="Send a message..."
					bind:value={messageValue}
				></textarea>
			</div>
			<button class="bg-blue-700 p-2 rounded-full hover:bg-blue-600 active:bg-blue-500">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#FFFFFF"
					><path
						d="M176-183q-20 8-38-3.5T120-220v-180l320-80-320-80v-180q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37L176-183Z"
					/></svg
				>
			</button>
		</div>
	</div>
</main>
