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
	import { afterUpdate } from 'svelte';
	import DropDown from '../lib/components/DropDown.svelte';
	import TextInputSm from '../lib/components/TextInputSm.svelte';

	export let data;
	export let form;
  console.log(form)
	let { auth, apiURL } = data;
	let profilePictureSrc =
		auth.profilePicture.String != ''
			? apiURL + '/' + auth.profilePicture.String
			: profilePlaceholder;
	let profileEditBtn;
	let profileImgInput;
	let showProfilePictureModal = false;
	let showProfileMenu = false;
	let isCropping = false;
	let croppingImg;
	let resultImgInput;
	let imageSrc = profilePlaceholder;
	let imageUpdateForm;
	let isAccountInfoEditing = form?.isAccountInfoEditing ?? false;
	const mimeTypes = {
		'image/jpeg': 'jpg',
		'image/png': 'png',
		'image/gif': 'gif',
		'image/bmp': 'bmp',
		'image/webp': 'webp',
		'application/pdf': 'pdf',
		'text/plain': 'txt'
	};

	let cropper;

	const showProfileEdit = () => {
		profileEditBtn.style.display = 'block';
	};
	const hideProfileEdit = () => {
		profileEditBtn.style.display = 'none';
	};
	const toggleProfileModal = () => {
		showProfilePictureModal = !showProfilePictureModal;
		isCropping = false;
	};
	const handleImageInputChange = (e) => {
		const { files } = e.target;
		if (!files || !files.length) return;

		const file = files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			imageSrc = String(reader.result);
			isCropping = true;
			if (!profileImgInput) return;
			profileImgInput.value = '';
		};
	};

	afterUpdate(() => {
		if (isCropping) {
			cropper = new Cropper(croppingImg, {
				aspectRatio: 1 / 1
			});
		} else {
			if (cropper) {
				cropper.destroy();
			}
		}
	});

	const getResult = () => {
		if (!cropper) return;
		cropper.getCroppedCanvas({}).toBlob((blob) => {
			console.log(blob.type);
			const dataTransfer = new DataTransfer();
			const fileName = 'profilePicture.' + mimeTypes[blob.type];
			var file = new File([blob], fileName, {
				type: blob.type
			});
			dataTransfer.items.add(file);
			resultImgInput.files = dataTransfer.files;
			imageUpdateForm.submit();
		});
	};

	// User Update
	let editFirstNameValue = form?.firstName ?? auth?.firstName;
	let editLastNameValue = form?.lastName ?? auth?.lastName;
	let editEmailValue = form?.email ?? auth?.email;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>
<div class="px-4 h-full w-full flex max-w-screen-xl gap-4">
	<div class="w-16 py-2 flex flex-col gap-2">
		<DropDown show={showProfileMenu}>
			<button
				slot="trigger"
				class="h-16 rounded-full overflow-hidden"
				on:click={() => (showProfileMenu = !showProfileMenu)}
			>
				<img src={profilePictureSrc} alt="profile_photo" />
			</button>
			<div slot="content">
				<div class="w-40 bg-gray-100 shadow-md flex flex-col text-sm rounded-sm">
					<a href="/" class="px-3 py-2 hover:bg-gray-200 active:bg-gray-300">Edit Account</a>
					<form action="?/logout" method="POST">
						<button
							type="submit"
							class="px-3 py-2 text-start hover:bg-gray-200 active:bg-gray-300 w-full"
							>Logout</button
						>
					</form>
				</div>
			</div>
		</DropDown>
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
			<img src={profilePictureSrc} alt="profile_phot" />
		</div>
		<h1 class="text-center font-display text-3xl py-5">
			Welcome <span class="font-display font-bold text-blue-700">{auth.firstName}</span>
		</h1>

		<!-- Account Info -->
		<div class="border-t-2 pt-4 px-10">
			<h1 class="font-display text-blue-700 text-lg">Account Information</h1>
			{#if !isAccountInfoEditing}
				<div class="flex gap-5 py-1">
					<div class="flex flex-1 gap-2 items-center">
						<h2 class="font-bold text-sm">First Name:</h2>
						<h2 class="font-display flex-1 border-b-2 px-2 py-1">{auth.firstName}</h2>
					</div>
					<div class="flex flex-1 gap-2 items-center">
						<h2 class="font-bold text-sm">Last Name:</h2>
						<h2 class="font-display flex-1 border-b-2 px-2 py-1">{auth.lastName}</h2>
					</div>
				</div>
				<div class="flex gap-2 items-center">
					<h2 class="font-bold text-sm">Email:</h2>
					<h2 class="font-display flex-1 border-b-2 px-2 py-1">{auth.email}</h2>
				</div>
				<div class="flex justify-end">
					<div class="w-32 py-5">
						<PrimaryButton size="sm" on:click={() => (isAccountInfoEditing = true)}
							>Edit Account</PrimaryButton
						>
					</div>
				</div>
			{:else}
				<form method="POST" action="?/update">
					<div class="flex gap-5 py-1">
						<div class="flex flex-1 gap-2 items-center">
							<label class="font-bold text-sm h-7" for="editFirstName">First Name:</label>
							<TextInputSm
								placeholder="Enter your first name"
								errorMessage={form?.editFirstNameError ?? ''}
								bind:value={editFirstNameValue}
								id="editFirstName"
								name="editFirstName"
							/>
						</div>
						<div class="flex flex-1 gap-2 items-center">
							<label class="font-bold text-sm h-7" for="editLastName">Last Name:</label>
							<TextInputSm
								placeholder="Enter your last name"
								errorMessage={form?.editLastNameError ?? ''}
								bind:value={editLastNameValue}
								id="editLastName"
								name="editLastName"
							/>
						</div>
					</div>
					<div class="flex gap-2 items-center">
						<label class="font-bold text-sm h-7" for="editEmail">Email:</label>
						<TextInputSm
							placeholder="Enter your email"
							errorMessage={form?.editEmailError ?? ''}
							bind:value={editEmailValue}
							id="editEmail"
							name="editEmail"
						/>
					</div>
					<div class="flex justify-end gap-2 items-center">
						<div class="w-32 py-5">
							<SecondaryButton size="sm" on:click={() => (isAccountInfoEditing = false)}
								>Cancel</SecondaryButton
							>
						</div>
						<div class="w-32 py-5">
							<PrimaryButton size="sm" type="submit">Save Changes</PrimaryButton>
						</div>
					</div>
				</form>
			{/if}
		</div>
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
		{#if !isCropping}
			<div class="p-5 flex flex-col items-center gap-2">
				<PrimaryButton type="button" on:click={() => profileImgInput.click()}
					>Upload from computer</PrimaryButton
				>
				<input
					class="hidden"
					bind:this={profileImgInput}
					type="file"
					name="cropPicture"
					id="cropPicture"
					on:change={handleImageInputChange}
					accept=".png,.jpg,.jpeg,.gif,.pdf"
				/>
				<SecondaryButton>Remove Profile Picture</SecondaryButton>
			</div>
		{:else}
			<div class="overflow-hidden p-3 max-h-[500px] w-full flex items-center justify-center">
				<img
					src={imageSrc}
					alt="cropping"
					bind:this={croppingImg}
					id="croppingImg"
					class="h-full"
				/>
			</div>
			<div class="p-2 flex justify-end border-t-2">
				<div class="w-24">
					<PrimaryButton on:click={getResult}>Crop</PrimaryButton>
				</div>
			</div>
			<form
				class="hidden"
				action="?/profilePictureUpdate"
				enctype="multipart/form-data"
				method="POST"
				bind:this={imageUpdateForm}
			>
				<input
					type="file"
					name="profilePicture"
					bind:this={resultImgInput}
					id="profilePicture"
					accept=".png,.jpg,.jpeg,.gif,.pdf"
					required
				/>
			</form>
		{/if}
	</div>
</Modal>
