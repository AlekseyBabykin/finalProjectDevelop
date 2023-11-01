import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserStore } from "./store/UserStore";
import { DeviceStore } from "./store/DeviceStore";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const Context = createContext(null);
console.log(process.env.REACT_APP_API_URL);
root.render(
  <GoogleOAuthProvider clientId="66281561993-5antearpdsj0sdelmcfjckehd8h7dapa.apps.googleusercontent.com">
    <Context.Provider
      value={{ user: new UserStore(), device: new DeviceStore() }}
    >
      <App />
    </Context.Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
