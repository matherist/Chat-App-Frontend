// ...
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import Chat from './components/Chat';
function App() {
  // ...
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (data) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/profile/');
      setUser({
        username: data.username,
        profile: {
          profile_picture: response.data.profile_picture,
        },
      });
      setLoggedIn(true);
    } catch (error) {
      console.error('Error fetching profile', error);
    }
  };

  // ...
  return (
    <div className="App">
      {loggedIn ? (
        <>
          <Profile user={user} />
          <Chat />
        </>
      ) : (
        <>
          <RegistrationForm />
          <LoginForm onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default App;

