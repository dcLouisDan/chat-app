<script>
	import TextInput from '$lib/components/TextInput.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import SecondaryButtonLink from '$lib/components/SecondaryButtonLink.svelte';

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let repeatPassword = '';
	let repeatPasswordError = '';
	let isSubmitDisabled = true;

	$: repeatPasswordError = password == repeatPassword ? '' : 'Passwords do not match';
	$: isSubmitDisabled = checkMissingValues([firstName, lastName, email, password, repeatPassword]);

	const checkMissingValues = (fieldsArray) => {
		if (!Array.isArray(fieldsArray)) return true;

		for (let i = 0; i < fieldsArray.length; i++) {
			if (fieldsArray[i] === '') return true;
		}

		if (repeatPasswordError != '') return true;

		return false;
	};
</script>

<svelte:head>
	<title>Create Account</title>
</svelte:head>

<div class="bg-white h-full w-full sm:max-w-md px-8 flex flex-col justify-center">
	<div class="pb-10">
		<h1 class="text-5xl font-display font-bold text-center text-blue-700">Create your account</h1>
	</div>
	<form method="POST">
		<TextInput
			name="firstName"
			bind:value={firstName}
			id="firstName"
			label="First Name"
			type="text"
			placeholder="Enter your first name"
		/>
		<TextInput
			name="lastName"
			bind:value={lastName}
			id="lastName"
			label="Last Name"
			type="text"
			placeholder="Enter your last name"
		/>
		<TextInput
			bind:value={email}
			name="email"
			id="email"
			label="Email"
			type="email"
			placeholder="Enter your email"
		/>
		<TextInput
			name="password"
			id="password"
			label="Password"
			type="password"
			placeholder="Enter your Password"
			bind:value={password}
		/>
		<TextInput
			id="repeatPassword"
			label="Repeat Password"
			type="password"
			placeholder="Confirm Password"
			bind:value={repeatPassword}
			errorMessage={repeatPasswordError}
			on:keydown
		/>
		<div class="flex flex-col gap-1 mt-5">
			<PrimaryButton isDisabled={isSubmitDisabled} type="submit">Create Account</PrimaryButton>
			<SecondaryButtonLink href="/login">Login using existing account</SecondaryButtonLink>
		</div>
	</form>
</div>
