<script>
	import TextInput from '../../components/TextInput.svelte';
	import PrimaryButton from '../../components/PrimaryButton.svelte';
	import SecondaryButtonLink from '../../components/SecondaryButtonLink.svelte';
</script>

<svelte:head>
	<title>Create Account</title>
</svelte:head>

<div class="bg-white h-full w-full sm:max-w-md px-8 flex flex-col justify-center">
	<div class="pb-10">
		<h1 class="text-5xl font-display font-bold text-center text-blue-700">Create your account</h1>
	</div>
	<TextInput id="firstName" label="First Name" type="text" placeholder="Enter your first name" />
	<TextInput id="lastName" label="Last Name" type="text" placeholder="Enter your last name" />
	<TextInput id="email" label="Email" type="email" placeholder="Enter your email" />
	<TextInput id='password' label="Password" type="password" placeholder="Enter your Password" />
	<TextInput id="repeatPassword" label="Repeat Password" type="password" placeholder="Confirm Password" />
	<div class="flex flex-col gap-1 mt-5">
		<PrimaryButton type="button">Create Account</PrimaryButton>
		<SecondaryButtonLink href="/login">Login using existing account</SecondaryButtonLink>
	</div>
</div>
