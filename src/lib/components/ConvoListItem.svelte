<script>
	import profilePlaceholder from '$lib/assets/profile_placeholder.png';
	import DropDown from './DropDown.svelte';
	import MoreHoriz from 'virtual:icons/mdi/more-horiz';

	export let profilePhoto = null;

  let showMenu = false
	$: src = profilePhoto ?? profilePlaceholder;
</script>

<div class="flex gap-2 hover:bg-gray-100 px-4 py-2 relative">
	<div class="h-14 w-14 overflow-hidden rounded-lg border-2">
		<img {src} alt="profile_photo" />
	</div>
	<div class="flex-1 py-1">
		<h5 class="font-bold">Dan Louis Dela Cruz</h5>
		<p class="text-sm text-gray-500">Hello, how are you?</p>
	</div>
	<div class="absolute top-1/2 -translate-y-1/2 right-5">
		<DropDown show={showMenu}>
			<button class="flex items-center justify-center hover:bg-gray-200 active:bg-gray-50 rounded-full h-6 w-6" slot="trigger" on:click={() => showMenu = !showMenu}>
				<MoreHoriz />
			</button>
			<div slot="content">
				<div class="w-40 bg-gray-100 shadow-md">
					<div class="px-3 py-2">Edit</div>
				</div>
			</div>
		</DropDown>
	</div>
</div>
