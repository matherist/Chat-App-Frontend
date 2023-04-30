import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('profile_picture', profilePicture);

    try {
      const response = await axios.patch('http://127.0.0.1:8000/api/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setProfilePicture(event.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Profile;
