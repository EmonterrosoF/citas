/* eslint-disable react/prop-types */
import {
  Input,
  Button,
  Switch,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";

import { useState } from "react";

import { toast } from "react-toastify";

import {
  actualizarUsuario,
  eliminarUsuario,
  guardarUsuario,
} from "../services/usuarios";

export default function FormUsuario({
  usuario,
  setOpenChange,
  getUsuarios,
  accion,
  serviciosList,
  idServiciosSeleccionados,
}) {
  const [idUsuario] = useState(usuario?.id ?? "");

  const [nombre, setNombre] = useState(usuario?.nombre ?? "");
  const [esNombreInvalido, setEsNombreInvalido] = useState(false);
  const [nombreMensajeError, setNombreMensajeError] = useState(null);

  const [apellido, setApellido] = useState(usuario?.apellido ?? "");
  const [esApellidoInvalido, setEsApellidoInvalido] = useState(false);
  const [apellidoMensajeError, setApellidoMensajeError] = useState(null);

  const [correo, setcorreo] = useState(usuario?.email ?? "");
  const [esCorreoinvalido, setEsCorreoinvalido] = useState(false);
  const [correoMensajeError, setCorreoMensajeError] = useState(null);

  const [telefono, settelefono] = useState(usuario?.telefono ?? "");
  const [esTelefonoInvalido, setEsTelefonoInvalido] = useState(false);
  const [telefonoMensajeError, setTelefonoMensajeError] = useState(null);

  const [direccion, setdireccion] = useState(usuario?.direccion ?? "");
  const [esDireccionInvalido, setEsDireccionInvalido] = useState(false);
  const [direccionMensajeError, setDireccionMensajeError] = useState(null);

  const [username, setUsername] = useState(usuario?.username ?? "");
  const [esUsernameInvalido, setEsUsernameInvalido] = useState(false);
  const [usernameMensajeError, setUsernameMensajeError] = useState(null);

  const [privado, setPrivado] = useState(usuario?.privado ?? false);
  const [actualizarPassword, setActualizarPassword] = useState(false);

  const [servicios] = useState(serviciosList ?? []);

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState(
    idServiciosSeleccionados ?? []
  );
  const [
    esServiciosSeleccionadosInvalido,
    setEsServiciosSeleccionadosInvalido,
  ] = useState(false);
  const [
    serviciosSeleccionadosMensajeError,
    setserviciosSeleccionadosMensajeError,
  ] = useState(null);

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

  const changeServicio = (valor) => {
    setServiciosSeleccionados(valor);
    if (valor.length < 1) {
      setEsServiciosSeleccionadosInvalido(true);
      setserviciosSeleccionadosMensajeError(
        "Debes seleccionar al menos un servicio"
      );
      return;
    }
    setEsServiciosSeleccionadosInvalido(false);
  };

  const onSubmitUsuario = async (e) => {
    e.preventDefault();
    setisLoadingSubmit(true);
    if (idUsuario && accion == "ELIMINAR") {
      const data = await toast.promise(eliminarUsuario(idUsuario), {
        pending: "Cargando...",
      });

      if (!data.ocurrioError) {
        getUsuarios();
        toast.success(data.mensaje);
      } else {
        toast.error(data.mensaje);
      }
    } else if (idUsuario && accion == "EDITAR") {
      const data = await toast.promise(
        actualizarUsuario(
          idUsuario,
          nombre,
          apellido,
          correo,
          telefono,
          direccion,
          username,
          privado,
          serviciosSeleccionados,
          actualizarPassword
        ),

        {
          pending: "Cargando...",
        }
      );

      if (!data.ocurrioError) {
        getUsuarios();
        toast.success(data.mensaje);
      } else {
        toast.error(data.mensaje);
      }
    } else {
      const data = await toast.promise(
        guardarUsuario(
          nombre,
          apellido,
          correo,
          telefono,
          direccion,
          username,
          privado,
          serviciosSeleccionados
        ),
        { pending: "Cargando..." }
      );

      if (!data.ocurrioError) {
        getUsuarios();
        toast.success(data.mensaje);
      } else {
        toast.error(data.mensaje);
      }
    }

    setOpenChange(false);
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
          isDisabled={idUsuario && accion != "EDITAR"}
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
          isDisabled={idUsuario && accion != "EDITAR"}
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
          isDisabled={idUsuario && accion != "EDITAR"}
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
          isDisabled={idUsuario && accion != "EDITAR"}
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
          isDisabled={idUsuario && accion != "EDITAR"}
          errorMessage={usernameMensajeError}
          isInvalid={esUsernameInvalido}
          onValueChange={changeUsername}
        />
        <div className="min-w-60">
          <Switch
            isDisabled={idUsuario && accion != "EDITAR"}
            isSelected={privado}
            onValueChange={setPrivado}
          >
            Es privado
          </Switch>
        </div>
      </div>
      <Input
        isRequired
        label="Dirección"
        placeholder="Ingresa la dirección"
        type="text"
        className="min-w-60"
        value={direccion}
        isDisabled={idUsuario && accion != "EDITAR"}
        errorMessage={direccionMensajeError}
        isInvalid={esDireccionInvalido}
        onValueChange={changeDireccion}
      />
      <CheckboxGroup
        isRequired
        orientation="horizontal"
        description="Servicios"
        isInvalid={esServiciosSeleccionadosInvalido}
        errorMessage={serviciosSeleccionadosMensajeError}
        label="Seleccione los servicios"
        onValueChange={changeServicio}
        isDisabled={idUsuario && accion != "EDITAR"}
        defaultValue={serviciosSeleccionados}
      >
        {servicios.map((servicio) => (
          <Checkbox key={servicio.id} value={servicio.id}>
            {servicio.nombre}
          </Checkbox>
        ))}
      </CheckboxGroup>
      {accion === "EDITAR" && (
        <div className="min-w-60">
          <Switch
            isSelected={actualizarPassword}
            onValueChange={setActualizarPassword}
          >
            Actualizar Contraseña
          </Switch>
        </div>
      )}
      <Button
        style={{ marginBottom: "10px" }}
        className={`py-6  ${
          idUsuario && accion === "ELIMINAR" ? `` : `hidden`
        }`}
        isDisabled={isLoadingSubmit}
        color={"danger"}
        type="submit"
      >
        Eliminar usuario
      </Button>
      <Button
        style={{ marginBottom: "10px" }}
        className={`py-6  ${idUsuario && accion !== "EDITAR" ? `hidden` : ``}`}
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
          esServiciosSeleccionadosInvalido ||
          serviciosSeleccionados.length < 1 ||
          isLoadingSubmit
        }
        color={accion === "EDITAR" ? "secondary" : "primary"}
        type="submit"
      >
        {accion === "EDITAR" ? "Actualizar usuario" : "Confirmar usuario"}
      </Button>
    </form>
  );
}
