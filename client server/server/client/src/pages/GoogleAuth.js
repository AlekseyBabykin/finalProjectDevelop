import React, { useState, useEffect, useContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { registration, login } from "../http/userAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";

const App = observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const { user } = useContext(Context);
  const [userGoogle, setUserGoogle] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUserGoogle(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (userGoogle) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${userGoogle.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          setProfile(res.data);
          let dataGoogleUser;
          if (isLogin) {
            dataGoogleUser = await login(res.data.email, res.data.id);
            localStorage.setItem("userInfo", JSON.stringify(dataGoogleUser));
          } else {
            dataGoogleUser = await registration(res.data.email, res.data.id);
            localStorage.setItem("userInfo", JSON.stringify(dataGoogleUser));
          }
          user.setUser(user);
          user.setIsAuth(true);
          navigate(SHOP_ROUTE);
        })
        .catch((err) => console.log(err));
    }
  }, [userGoogle]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.setItem("google", null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => loginGoogle()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
});
export default App;
