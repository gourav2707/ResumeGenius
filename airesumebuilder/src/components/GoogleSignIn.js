import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import axios from 'axios';
import Apis from '../Apis';

const GoogleSignIn = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      // Send token to your backend for verification
      const res = await axios.post(Apis.GOOGLE_SIGNUP, {
        token,
      });

      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard'; // redirect after login
    } catch (error) {
      console.error("Google Login Error", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>Sign in with Google</button>
  );
};

export default GoogleSignIn;
