import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaGithub } from 'react-icons/fa';
import Apis from "../Apis";
function FirebaseLogin() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user info to your backend
      const res = await fetch(Apis.GOOGLE_SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
        }),
      });

      const data = await res.json();
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";

    } catch (error) {
      console.log("Error during Google login", error);
    }
  };

  return (
     <div className="social-login">
            <button type="button"  onClick={handleLogin} className="social-button google">
              <FaGoogle /> Google
            </button>
             
          </div>
           
  );
}

export default FirebaseLogin;
