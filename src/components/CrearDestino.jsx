import { React } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const CrearDestino = (props) => {
  const userData = props.datos;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post(
        process.env.REACT_APP_BACKEND_URL + `api/destinos/`,
        {
          nombre: data.nombre,
          descripcion: data.descripcion,
          direccion: data.direccion,
          creador: userData.userId,
        },
        {
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("destino creado");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert("no tienes permiso para crear destino");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-login-signup">
        <input
          type="text"
          placeholder="Nombre"
          className="form"
          {...register("nombre", { required: true })}
        />
        {errors.nombre && errors.nombre.type === "required" && (
          <span>Se requiere nombre</span>
        )}
        <input
          type="text"
          placeholder="Descripción"
          className="form"
          {...register("descripcion", { required: true })}
        />
        {errors.descripcion && errors.descripcion.type === "required" && (
          <span>Se requiere descripcion</span>
        )}
        <input
          type="text"
          placeholder="Dirección"
          className="form"
          {...register("direccion", { required: true })}
        />
        {errors.direccion && errors.direccion.type === "required" && (
          <span>Se requiere direccion</span>
        )}
        <button type="submit" className="btn-form">GUARDAR</button>
      </form>
    </div>
  );
};

export default CrearDestino;
