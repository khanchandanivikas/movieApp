import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../style/Form.css";

const LoginForm = (props) => {
  const gestionarAcceso = props.accesoGestionar;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "api/usuarios/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        alert("Login Correcto");
        gestionarAcceso(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form
        action=""
        className="form-login-signup"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="correo"
          className="form"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && errors.email.type === "required" && (
          <span>Se requiere e-mail</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <span>Se requiere e-mail válido</span>
        )}
        <input
          className="form"
          type="password"
          name="password"
          id="password"
          placeholder="contraseña"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>Se requiere contraseña</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span>Mínimo de 6 caracteres</span>
        )}
        <button className="btn-form" type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
