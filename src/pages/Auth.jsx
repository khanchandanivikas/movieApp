import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Auth = (props) => {
  const accesoGestionar = props.gestionarAcceso;

  const [loginActive, setLoginActive] = useState(true);
  const [signupActive, setSignupActive] = useState(false);
  const handleLoginClick = () => {
    setLoginActive(true);
    setSignupActive(false);
  };
  const handleSignupClick = () => {
    setLoginActive(false);
    setSignupActive(true);
  };

  return (
    <div className="container">
      <div className="wrapper-contenido">
        <h1 className="heading-login">Tu Cuenta</h1>
        <div className="butones-login">
          <button
            onClick={handleLoginClick}
            className={loginActive ? "login-btn-activo" : "login"}
          >
            Login
          </button>
          <button
            onClick={handleSignupClick}
            className={signupActive ? "signup-btn-activo" : "signup"}
          >
            Signup
          </button>
        </div>
        <div className="container-formularios">
          <div className="card">
            <div className={loginActive ? "front-active" : "front"}>
              <LoginForm accesoGestionar={accesoGestionar} />
            </div>
            <div className={signupActive ? "back-active" : "back"}>
              <SignUpForm accesoGestionar={accesoGestionar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
