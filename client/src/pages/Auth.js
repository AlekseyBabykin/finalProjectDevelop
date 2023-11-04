import React, { useContext, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {
  GOOGLE_AUTH,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";
// import Snowfall from "react-snowfall";
import "../style/Auth.css";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import useSound from "use-sound";
import boopSfx from "../sound/dog-bark-12.mp3";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userGoogle, setUserGoogle] = useState([]);
  const [profile, setProfile] = useState([]);
  const [play] = useSound(boopSfx, { volume: 0.5 });

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

  const click = async () => {
    try {
      let data;
      console.log("Im auth");
      if (isLogin) {
        data = await login(email, password);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      play();
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.massage);
    }
  };
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54, backgroundColor: "grey" }}
    >
      <div class="cat" style={{ height: "35% " }}>
        <div class="ear ear--left"></div>
        <div class="ear ear--right"></div>
        <div class="face">
          <div class="eye eye--left">
            <div class="eye-pupil"></div>
          </div>
          <div class="eye eye--right">
            <div class="eye-pupil"></div>
          </div>
          <div class="muzzle"></div>
        </div>
      </div>
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Login" : "Registration"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-4"
            type="email"
            placeholder="write your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-4"
            type="password"
            placeholder="write your Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex  justify-content-between mt-4">
            {isLogin ? (
              <div>
                no account?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
              </div>
            ) : (
              <div>
                account exist? <NavLink to={LOGIN_ROUTE}>apply</NavLink>
              </div>
            )}
            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? "Apply" : "Registration"}
            </Button>
          </div>
          <Button onClick={loginGoogle}>Google AUTH</Button>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
