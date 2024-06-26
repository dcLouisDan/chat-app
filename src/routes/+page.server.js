import { fail, redirect } from '@sveltejs/kit';
const apiURL = import.meta.env.VITE_API_URL;
export const actions = {
  logout: async ({ cookies }) => {
    const token = cookies.get('token');

    if (!token) {
      return fail(400, {
        error: 'token not found'
      });
    }

    cookies.delete('token', { path: '/' });
    throw redirect(302, '/login');
  },
  update: async ({ cookies, request }) => {
    const token = cookies.get('token');
    const updateUrl = apiURL + '/profile/update'

    if (!token) {
      return fail(400, {
        error: 'token not found'
      });
    }

    const formData = await request.formData();
    const firstName = formData.get('editFirstName');
    const lastName = formData.get('editLastName');
    const email = formData.get('editEmail');
    console.log('firstname: ', firstName);

    if (firstName == '') {
      return fail(400, {
        editFirstNameError: 'Please enter your first name',
        isAccountInfoEditing: true,
        firstName,
        lastName,
        email
      });
    }
    if (lastName == '') {
      return fail(400, {
        editLastNameError: 'Please enter your last name',
        isAccountInfoEditing: true,
        firstName,
        lastName,
        email
      });
    }
    if (email == '') {
      return fail(400, {
        editEmailError: 'Please enter your email',
        isAccountInfoEditing: true,
        firstName,
        lastName,
        email
      });
    }

    const response = await fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email
      })
    })

    const data = await response.json()

    if(response.ok) {
      return {
        firstName,
        lastName, 
        email,
        success: true
      }
    } else {
      return {
        error: data.error
      }
    }
  },
  profilePictureUpdate: async ({ cookies, request }) => {
    const ppUpdateUrl = apiURL + '/profile/updateProfilePhoto';

    const formData = await request.formData();
    const file = formData.get('profilePicture');

    if (!file) {
      return fail(400, {
        error: 'No image'
      });
    }
    console.log(file);

    const validExtensions = ['jpeg', 'jpg', 'png'];
    const extension = file.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(extension)) {
      return fail(400, {
        error: 'Invalid image format. Only JPEG, JPG, and PNG are allowed.'
      });
    }
    const goFormData = new FormData();
    goFormData.append('profile_picture', file);

    const token = cookies.get('token');
    if (!token) {
      return fail(400, {
        error: 'missing token'
      });
    }

    const response = await fetch(ppUpdateUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: goFormData
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true
      };
    } else {
      return fail(400, {
        error: result?.error
      });
    }
  }
};
