import { fail, redirect } from '@sveltejs/kit';
import { checkMissingValues } from '../../lib/utils/utils';
export const actions = {
  default: async ({ request }) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const registerURL = apiURL + '/register';
    const formData = await request.formData();

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');

    if (checkMissingValues([firstName, lastName, email, password])) {
      return fail(400, {
        firstName,
        lastName,
        email,
        password,
        error: '*Please fill up all fields'
      });
    }
    const response = await fetch(registerURL, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
    });

    if (response.ok) {
      throw redirect(301, '/login');
    } else {
      return fail(400, {
        error: 'Something went wrong.',
        firstName,
        lastName,
        email,
        password
      });
    }
  }
};
