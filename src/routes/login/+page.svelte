<script>
	import TextInput from '../../components/TextInput.svelte';
	import PrimaryButton from '../../components/PrimaryButton.svelte';
	import SecondaryButtonLink from '../../components/SecondaryButtonLink.svelte';

  const apiURL = import.meta.env.VITE_API_URL
  const loginURL = apiURL + "/login"

	let emailError = '';
	let passwordError = '';
	let emailInput;
	let passwordInput;

	const handleSubmit = async () => {
		if (emailInput == '') {
			console.log('empty email');
			emailError = 'Please enter your email';
			return;
		}
		emailError = '';
		if (passwordInput == '') {
			console.log('empty password');
			passwordError = 'Please enter your password';
			return;
		}
		passwordError = '';

    const response = await fetch(loginURL, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      })
    })

    const data = await response.json()

    if (response.ok) {
      console.log(data)
    } else {
      emailError = "Login failed. Please check your email"
      passwordError = "Login failed. Please check your password"
      console.log(data)
    }
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="bg-white h-full w-full sm:max-w-md px-8 flex flex-col justify-center">
	<div class="pb-10">
		<h1 class="text-5xl font-display font-bold text-center text-blue-700">Login</h1>
	</div>
	<form on:submit|preventDefault={handleSubmit}>
		<TextInput
			bind:value={emailInput}
			id="email"
			bind:errorMessage={emailError}
			label="Email"
			type="email"
			placeholder="Enter your email"
		/>
		<TextInput
			bind:value={passwordInput}
			id="password"
			bind:errorMessage={passwordError}
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
