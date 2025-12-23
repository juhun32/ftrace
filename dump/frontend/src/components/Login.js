import React from "react";

const Login = () => {
  return (
    <div>
      <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=profile email">
        Login with Google
      </a>
    </div>
  );
};

export default Login;
