<script>
	import profilePlaceholder from '$lib/assets/profile_placeholder.png';
	import ConvoListItem from '$lib/components/ConvoListItem.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
  
  export let data;
  const auth = data.auth
  console.log(data)

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
	<div class="flex-1 bg-white w-full rounded-xl">
    <h1 class="text-center font-display text-3xl py-10">
      Welcome <span class="font-display font-bold text-blue-700">{auth.firstName}</span>
    </h1>
  </div>
</div>
