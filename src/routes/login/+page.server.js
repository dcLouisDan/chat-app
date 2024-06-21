import { fail, redirect } from '@sveltejs/kit';
export const actions = {
	default: async ({ cookies, request }) => {
		const apiURL = import.meta.env.VITE_API_URL;
		const loginURL = apiURL + '/login';
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		if (email == '') {
			return fail(400, {
				emailError: 'Please enter your email',
				email,
				password
			});
		}
		if (password == '') {
			return fail(400, {
				passwordError: 'Please enter your password',
				email,
				password
			});
		}

		const response = await fetch(loginURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		const data = await response.json();

		if (response.ok) {
      if (data.token === "") {
        return fail(400, {
          error: "No token received"
        })
      }
      console.log(data)
      cookies.set('token', data.token, {path: '/'})

	    throw redirect(301, "/")
		} else {
			return fail(400, {
				emailError: 'Login failed. Please check your email',
				passwordError: 'Login failed. Please check you password',
				email,
				password
			});
		}
	}
};
