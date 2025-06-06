// src/components/Login.js
import React, { useEffect } from 'react';

function Login() {
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "1068845982043-a4am45r9u6v456oqnn4mjposrg6ve89m.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("g_id_signin"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    const token = response.credential;
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Login with Google</h2>
      <div id="g_id_signin"></div>
    </div>
  );
}

export default Login;
