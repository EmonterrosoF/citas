/* eslint-disable react/prop-types */
import { Input, Button } from "@nextui-org/react";

import { useState } from "react";

import { toast } from "react-toastify";

import { actualizarPerfil } from "../services/usuarios";

export default function FormPerfil({ usuario, getUsuario }) {
  const [idUsuario] = useState(usuario?.id);

  const [nombre, setNombre] = useState(usuario?.nombre);
  const [esNombreInvalido, setEsNombreInvalido] = useState(false);
  const [nombreMensajeError, setNombreMensajeError] = useState(null);

  const [apellido, setApellido] = useState(usuario?.apellido);
  const [esApellidoInvalido, setEsApellidoInvalido] = useState(false);
  const [apellidoMensajeError, setApellidoMensajeError] = useState(null);

  const [correo, setcorreo] = useState(usuario?.email ?? "");
  const [esCorreoinvalido, setEsCorreoinvalido] = useState(false);
  const [correoMensajeError, setCorreoMensajeError] = useState(null);

  const [telefono, settelefono] = useState(usuario?.telefono);
  const [esTelefonoInvalido, setEsTelefonoInvalido] = useState(false);
  const [telefonoMensajeError, setTelefonoMensajeError] = useState(null);

  const [direccion, setdireccion] = useState(usuario?.direccion);
  const [esDireccionInvalido, setEsDireccionInvalido] = useState(false);
  const [direccionMensajeError, setDireccionMensajeError] = useState(null);

  const [username, setUsername] = useState(usuario?.username);
  const [esUsernameInvalido, setEsUsernameInvalido] = useState(false);
  const [usernameMensajeError, setUsernameMensajeError] = useState(null);

  const [password, setPassword] = useState("");
  const [esPasswordInvalido, setEsPasswordInvalido] = useState(false);
  const [passwordMensajeError, setPasswordMensajeError] = useState(null);

  const [isLoadingSubmit, setisLoadingSubmit] = useState(false);

  const changeNombre = (valor) => {
    if (valor.length > 40) return (valor = nombre);
    setNombre(valor);
    if (!valor) {
      setEsNombreInvalido(true);
      setNombreMensajeError("Nombre es requerido");
      return;
    }
    setEsNombreInvalido(false);
  };

  const changeApellido = (valor) => {
    if (valor.length > 40) return (valor = apellido);
    setApellido(valor);
    if (!valor) {
      setEsApellidoInvalido(true);
      setApellidoMensajeError("Apellido es requerido");
      return;
    }
    setEsApellidoInvalido(false);
  };

  const changeCorreo = (valor) => {
    if (valor.length > 40) return (valor = correo);
    setcorreo(valor);
    if (!valor) {
      setEsCorreoinvalido(true);
      setCorreoMensajeError("Correo electronico es requerido");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(valor)) {
      setEsCorreoinvalido(true);
      setCorreoMensajeError("El correo electronico es invalido");
      return;
    }
    setEsCorreoinvalido(false);
  };

  const changeTelefono = (valor) => {
    if (isNaN(valor) || valor.length > 8 || parseInt(valor) < 0)
      return (valor = telefono);

    if (!valor) {
      setEsTelefonoInvalido(true);
      setTelefonoMensajeError("Telefono es requerido");
      return settelefono("");
    }

    settelefono(valor.replace(/\D/g, ""));

    setEsTelefonoInvalido(false);
  };

  const changeDireccion = (valor) => {
    if (valor.length > 100) return (valor = direccion);
    setdireccion(valor);
    if (!valor) {
      setEsDireccionInvalido(true);
      setDireccionMensajeError("Direccion es requerida");
      return;
    }
    setEsDireccionInvalido(false);
  };

  const changeUsername = (valor) => {
    if (valor.length > 40) return (valor = username);

    setUsername(valor);

    if (valor.length < 3) {
      setEsUsernameInvalido(true);
      setUsernameMensajeError(
        "El nombre de usuario debe ser minimo de 3 caracteres"
      );
      return;
    }

    if (!valor) {
      setEsUsernameInvalido(true);
      setUsernameMensajeError("El nombre de usuario es requerido");
      return;
    }
    setEsUsernameInvalido(false);
  };

  const changePassword = (valor) => {
    if (valor.length > 40) return (valor = password);

    setPassword(valor);

    if (!valor) {
      setEsPasswordInvalido(true);
      setPasswordMensajeError("La contraseña es requerido");
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        valor
      )
    ) {
      setEsPasswordInvalido(true);
      setPasswordMensajeError(
        "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial como @$!%*?&"
      );
      return;
    }

    setEsPasswordInvalido(false);
  };

  const onSubmitUsuario = async (e) => {
    e.preventDefault();
    setisLoadingSubmit(true);

    const data = await toast.promise(
      actualizarPerfil(
        idUsuario,
        nombre,
        apellido,
        correo,
        telefono,
        direccion,
        username,
        password
      ),

      {
        pending: "Cargando...",
      }
    );

    if (!data.ocurrioError) {
      toast.success(data.mensaje);
      getUsuario();
    } else {
      toast.error(data.mensaje);
    }

    setisLoadingSubmit(false);
  };
  return (
    <form
      className="flex flex-col gap-4 w-full"
      style={{ paddingBottom: "70px" }}
      onSubmit={onSubmitUsuario}
    >
      <h4
        style={{ padding: "20px 0 0 0" }}
        className="font-bold text-large text-center"
      >
        Detalle usuario
      </h4>
      <div
        style={{ padding: "0.75rem 0 0 0" }}
        className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
      >
        <Input
          isRequired
          label="Nombre"
          placeholder="Ingresa el nombre"
          type="text"
          className="min-w-60"
          value={nombre}
          errorMessage={nombreMensajeError}
          isInvalid={esNombreInvalido}
          onValueChange={changeNombre}
        />
        <Input
          isRequired
          label="Apellido"
          placeholder="Ingresa el apellido"
          type="text"
          className="min-w-60"
          value={apellido}
          errorMessage={apellidoMensajeError}
          isInvalid={esApellidoInvalido}
          onValueChange={changeApellido}
        />
      </div>
      <div className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row">
        <Input
          isRequired
          label="Correo"
          placeholder="Ingresa el correo"
          type="text"
          className="min-w-60"
          value={correo}
          errorMessage={correoMensajeError}
          isInvalid={esCorreoinvalido}
          onValueChange={changeCorreo}
        />
        <Input
          isRequired
          label="Telefono"
          placeholder="Ingresa el telefono"
          type="text"
          className="min-w-60"
          value={telefono}
          errorMessage={telefonoMensajeError}
          isInvalid={esTelefonoInvalido}
          onValueChange={changeTelefono}
        />
      </div>
      <div className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row">
        <Input
          isRequired
          label="Nombre de usuario"
          placeholder="Ingresa el nombre de usuario"
          type="text"
          className="min-w-60"
          value={username}
          errorMessage={usernameMensajeError}
          isInvalid={esUsernameInvalido}
          onValueChange={changeUsername}
        />
        <Input
          isRequired
          label="Contraseña"
          placeholder="Ingresa la contraseña"
          type="text"
          className="min-w-60"
          value={password}
          errorMessage={passwordMensajeError}
          isInvalid={esPasswordInvalido}
          onValueChange={changePassword}
        />
      </div>
      <Input
        isRequired
        label="Dirección"
        placeholder="Ingresa la dirección"
        type="text"
        className="min-w-60"
        value={direccion}
        errorMessage={direccionMensajeError}
        isInvalid={esDireccionInvalido}
        onValueChange={changeDireccion}
      />
      <Button
        style={{ marginBottom: "10px" }}
        className={`py-6`}
        isDisabled={
          esNombreInvalido ||
          !nombre ||
          esApellidoInvalido ||
          !apellido ||
          esCorreoinvalido ||
          !correo ||
          esTelefonoInvalido ||
          !telefono ||
          esDireccionInvalido ||
          !direccion ||
          esPasswordInvalido ||
          !password ||
          isLoadingSubmit
        }
        color="primary"
        type="submit"
      >
        Guardar usuario
      </Button>
    </form>
  );
}
