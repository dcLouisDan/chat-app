<script>
	import TextInput from '../../components/TextInput.svelte';
	import PrimaryButton from '../../components/PrimaryButton.svelte';
	import SecondaryButtonLink from '../../components/SecondaryButtonLink.svelte';

	export let form;
	console.log('token: ', form);
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="bg-white h-full w-full sm:max-w-md px-8 flex flex-col justify-center">
	<div class="pb-10">
		<h1 class="text-5xl font-display font-bold text-center text-blue-700">Login</h1>
	</div>
	<form method="POST">
		<TextInput
			id="email"
			name="email"
			value={form?.email ?? ''}
			errorMessage={form?.emailError ?? ''}
			label="Email"
			type="email"
			placeholder="Enter your email"
		/>
		<TextInput
			id="password"
			name="password"
			value={form?.password ?? ''}
			errorMessage={form?.passwordError ?? ''}
			label="Password"
			type="password"
			placeholder="Password"
		/>
		<div class="flex flex-col gap-1 mt-5">
			<PrimaryButton type="submit">Login</PrimaryButton>
			<SecondaryButtonLink href="/register">Register</SecondaryButtonLink>
		</div>
	</form>
</div>
