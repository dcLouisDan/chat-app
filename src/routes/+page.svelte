<script>
	import profilePlaceholder from '$lib/assets/profile_placeholder.png';
	import ConvoListItem from '$lib/components/ConvoListItem.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import 'cropperjs/dist/cropper.css';
	import Close from 'virtual:icons/mdi/close';
	import Cropper from 'cropperjs';

	export let data;
	let profileEditBtn;
	let profileImgInput;
	let showProfilePictureModal = false;

	const auth = data.auth;
	const showProfileEdit = () => {
		profileEditBtn.style.display = 'block';
	};
	const hideProfileEdit = () => {
		profileEditBtn.style.display = 'none';
	};
	const toggleProfileModal = () => {
		showProfilePictureModal = !showProfilePictureModal;
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>
<div class="px-4 h-full w-full flex max-w-screen-xl gap-4">
	<div class="w-16 py-2 flex flex-col gap-2">
		<div class="h-16 rounded-full overflow-hidden">
			<img src={profilePlaceholder} alt="profile_photo" />
		</div>
	</div>
	<div class="bg-white min-w-80 rounded-xl">
		<div class="px-4 py-2">
			<h1 class="font-display text-lg text-blue-700 font-bold py-1">Messages</h1>
			<TextInput placeholder="Search" classIn="bg-gray-200" />
		</div>
		<div class="flex flex-col">
			<ConvoListItem />
		</div>
	</div>
	<div class="flex-1 p-5 bg-white w-full rounded-xl">
		<div
			class="h-32 w-32 relative mx-auto border-2 rounded-full overflow-hidden object-cover"
			on:mouseover={showProfileEdit}
			on:focus={showProfileEdit}
			on:mouseleave={hideProfileEdit}
			on:blur={hideProfileEdit}
			role="button"
			tabindex="0"
		>
			<button
				bind:this={profileEditBtn}
				on:click={toggleProfileModal}
				class="absolute bg-black hidden opacity-40 text-white text-sm py-1 w-full bottom-0 left-1/2 -translate-x-1/2 hover:opacity-70 active:opacity-80"
				>Edit</button
			>
			<img src={profilePlaceholder} alt="profile_phot" />
		</div>
		<h1 class="text-center font-display text-3xl py-5">
			Welcome <span class="font-display font-bold text-blue-700">{auth.firstName}</span>
		</h1>
	</div>
</div>
<Modal show={showProfilePictureModal} on:close={toggleProfileModal}>
	<div class="bg-white rounded-lg">
		<div class="flex px-2 py-1 border-b-2">
			<button
				class="flex ms-auto items-center justify-center hover:bg-gray-200 active:bg-gray-50 rounded-full h-6 w-6"
        on:click={toggleProfileModal}
			>
				<Close />
			</button>
		</div>
		<div class="p-5 flex flex-col items-center gap-2">
			<PrimaryButton type="button" on:click={() => profileImgInput.click()}
				>Upload from computer</PrimaryButton
			>
			<input
				class="hidden"
				bind:this={profileImgInput}
				type="file"
				name="profilePicture"
				id="profilePicture"
			/>
			<SecondaryButton>Remove Profile Picture</SecondaryButton>
		</div>
	</div>
</Modal>
