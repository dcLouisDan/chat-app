<script>
	import { messages } from '../stores/messagesStore.js';
	import { beforeUpdate, afterUpdate, onMount } from 'svelte';
	import ChatMessage from '../components/ChatMessage.svelte';
	import Modal from '../components/Modal.svelte';

	let appHeight = 750;
	let appWidth = 400;
	let myname = 'Dan';
	let showModal = false;

	let messageValue = '';
	let minRows = 1;
	let maxRows = 5;

	// Chat Messages
	let headerHeight = 0;
	let inputHeight = 0;
	let chatBodyHeight = 0;
	let chatBodyDiv;
	let chatInput;
	let autoscroll = true;

	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
	$: chatBodyHeight = appHeight - (headerHeight + inputHeight);

	const addMessage = () => {
		const newMessage = {
			username: myname,
			message: chatInput.value
		};
		messages.set([...$messages, newMessage]);
		messageValue = '';
	};

	const handleKeydown = (e) => {
		if (messageValue.trim() === '') return;
		if (e.key !== 'Enter') return;
		e.preventDefault();
		console.log('Enter');
		addMessage();
	};

	const handleModalToggle = () => {
		showModal = !showModal;
	};

	beforeUpdate(() => {
		if (chatBodyDiv) {
			const scrollableDistance = chatBodyDiv.scrollHeight - chatBodyDiv.offsetHeight;
			autoscroll = chatBodyDiv.scrollTop > scrollableDistance - 20;
		}
	});

	afterUpdate(() => {
		if (autoscroll) {
			chatBodyDiv.scrollTo(0, chatBodyDiv.scrollHeight);
		}
	});
</script>

<svelte:head>
	<title>Svelte Chat App</title>
</svelte:head>

<main class="bg-gray-200 flex items-center justify-center h-screen w-full">
	<div
		class="shadow-lg border-2 rounded-xl bg-white overflow-hidden flex flex-col"
		style="min-width: {appWidth}px; min-height: {appHeight}px"
	>
		<!-- Header -->
		<header
			class="flex justify-between items-center bg-blue-700 w-full text-white font-bold px-4 py-2"
			bind:clientHeight={headerHeight}
		>
			<h1>Chat Group</h1>
			<button
				class="text-xs bg-white text-blue-700 py-1 px-2 rounded-sm hover hover:bg-blue-50 active:bg-blue-100"
				on:click={handleModalToggle}
			>
				Settings
			</button>
		</header>

		<!-- Chat Body -->
		<div
			class="flex-1 bg-blue-50 overflow-y-scroll flex-col gap-1 scroll-smooth w-full"
			style="max-height: {chatBodyHeight}px;min-height: {chatBodyHeight}px"
			bind:this={chatBodyDiv}
		>
			{#each $messages as message}
				<ChatMessage bind:message bind:myname />
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
					name="message"
					placeholder="Send a message..."
					bind:value={messageValue}
					bind:this={chatInput}
					on:keydown={handleKeydown}
				></textarea>
			</div>
			<button
				class="bg-blue-700 p-2 rounded-full hover:bg-blue-600 active:bg-blue-500"
				on:click={addMessage}
			>
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

	<Modal show={showModal} on:close={handleModalToggle}>
		<div class="rounded-lg overflow-hidden">
			<div class="bg-blue-700 relative text-white px-4 py-2 w-full font-bold">
				<h1>User Settings</h1>
				<button class="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center p-1 rounded-full hover:bg-blue-600 active:bg-blue-500"
        on:click={ handleModalToggle }
        >
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e8eaed"
						><path
							d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
						/></svg
					>
				</button>
			</div>
			<div class="px-4 py-2 bg-white">
				<label for="username" class="text-sm font-bold text-blue-700">Username:</label>
				<input
					class="w-full bg-gray-100 p-3 rounded-lg"
					type="text"
					id="username"
					name="username"
					bind:value={myname}
				/>
			</div>
		</div>
	</Modal>
</main>
