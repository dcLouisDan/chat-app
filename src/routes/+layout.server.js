import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url }) {
	const token = cookies.get('token');

	if (!token && url.pathname !== '/login' && url.pathname !== '/register') {
		throw redirect(302, '/login');
	}

	if (url.pathname == '/login' || url.pathname == '/register') {
		return;
	}
	const apiURL = import.meta.env.VITE_API_URL;
	const profileURL = apiURL + '/profile';

	const fetchProfile = async () => {
		const response = await fetch(profileURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});

		const userData = await response.json();
		return userData;
	};

	return {
		auth: await fetchProfile(),
    apiURL
	};
}
