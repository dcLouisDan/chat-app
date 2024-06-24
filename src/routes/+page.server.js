import { fail } from '@sveltejs/kit';
export const actions = {
  profilePictureUpdate: async ({ cookies, request }) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const ppUpdateUrl = apiURL + '/profile/updateProfilePhoto';

    const formData = await request.formData();
    const file = formData.get('profilePicture');

    if (!file) {
      return fail(400, {
        error: 'No image'
      });
    }
    console.log(file)
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name;

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

    const result=  await response.json()

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
