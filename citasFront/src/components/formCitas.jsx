/* eslint-disable react/prop-types */
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { useContext, useState } from "react";

import dayjs from "dayjs";
import { cancelarCita, guardarCita } from "../services/citas";

import { toast } from "react-toastify";
import { AuthContext } from "../context/authProvider";

export default function FormCitas({
  cita,
  proveedores,
  servicios,
  setOpenChange,
  getCitas,
}) {
  // datos de la persona
  const [idCita] = useState(cita?.id ?? null);

  //esto se usa asi porque por algun motivo si no uso de esta forma, me coloca el select
  // de otro color a los demas inputs
  const [disabledSelectedProveedor] = useState(proveedores ?? true);

  const [fechaInicio, setFechaInicio] = useState(cita?.fechaInicio ?? "");

  const [fechaFinal, setFechaFinal] = useState(cita?.fechaFinal ?? "");

  const [nombre, setNombre] = useState(cita?.nombre ?? "");
  const [esNombreInvalido, setEsNombreInvalido] = useState(false);
  const [nombreMensajeError, setNombreMensajeError] = useState(null);

  const [apellido, setApellido] = useState(cita?.apellido ?? "");
  const [esApellidoInvalido, setEsApellidoInvalido] = useState(false);
  const [apellidoMensajeError, setApellidoMensajeError] = useState(null);

  const [correo, setCorreo] = useState(cita?.correo ?? "");
  const [esCorreoinvalido, setEsCorreoinvalido] = useState(false);
  const [correoMensajeError, setCorreoMensajeError] = useState(null);

  const [telefono, setTelefono] = useState(cita?.telefono ?? "");
  const [esTelefonoInvalido, setEsTelefonoInvalido] = useState(false);
  const [telefonoMensajeError, setTelefonoMensajeError] = useState(null);

  const [isLoadingSubmit, setisLoadingSubmit] = useState(false);

  const [notaCliente, setNotaCliente] = useState(cita?.notas ?? "");

  const [nota, setNota] = useState("");
  const [esNotaInvalida, setEsNotaInvalida] = useState(false);
  const [notaMensajeError, setNotaMensajeError] = useState(null);

  const [idSelectedProveedor] = useState(cita?.idProveedor ?? "");

  const [proveedoresList] = useState(proveedores);

  const [idSelectedServicio, setIdSelectedServicio] = useState(
    cita?.idServicio ?? 0
  );
  const [serviciosList, setServiciosList] = useState(servicios);

  const { user } = useContext(AuthContext);

  // change formulario persona
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

    setCorreo(valor);
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
    if (isNaN(valor) || valor.length > 8) return (valor = telefono);
    setTelefono(valor.trim());
    if (!valor || valor == " ") {
      setEsTelefonoInvalido(true);
      setTelefonoMensajeError("Telefono es requerido");
      return;
    }

    if (valor.length < 8) {
      setEsTelefonoInvalido(true);
      setTelefonoMensajeError("Telefono invalido");
      return;
    }
    setEsTelefonoInvalido(false);
  };

  const changeNotas = (valor) => {
    if (valor.length < 120) setNota(valor);

    if (!valor) {
      setEsNotaInvalida(true);
      setNotaMensajeError("Nota es requerida");
      return;
    }

    setEsNotaInvalida(false);
  };

  const changeNotasCliente = (valor) => {
    if (valor.length < 120) setNotaCliente(valor);
  };

  const onChangeServicio = async (e) => {
    setServiciosList(serviciosList.filter((servicio) => servicio.id != 0));
    setIdSelectedServicio(e.target.value);
  };

  const onSubmitCita = async (e) => {
    e.preventDefault();
    setisLoadingSubmit(true);
    if (idCita) {
      const data = await toast.promise(
        cancelarCita(idCita, nota, correo, nombre),
        {
          pending: "Cargando...",
        }
      );

      if (!data.ocurrioError) {
        getCitas();
        toast.success(data.mensaje);
      } else {
        toast.error(data.mensaje);
      }
    } else {
      const data = await guardarCita(
        idSelectedServicio,
        0,
        idSelectedProveedor,
        new Date(fechaInicio),
        "",
        nombre,
        apellido,
        correo,
        telefono,
        notaCliente,
        new Date(fechaFinal)
      );

      if (!data.ocurrioError) {
        getCitas();
        toast.success(data.mensaje);
      } else {
        toast.error(data.mensaje);
      }
    }

    setOpenChange(false);
    setisLoadingSubmit(false);
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={onSubmitCita}>
      <h4
        style={{ padding: "20px 0 0 0" }}
        className="font-bold text-large text-center"
      >
        {cita?.title ? cita.title : "Ingrese la información"}
      </h4>
      <div
        style={{ padding: "0.75rem 0 0 0" }}
        className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
      >
        <Input
          isRequired
          label="Fecha Inicio"
          type="text"
          className="min-w-60"
          value={dayjs(fechaInicio).format("MMMM D, YYYY h:mm A")}
          onValueChange={setFechaInicio}
          disabled
        />
        <Input
          isRequired
          label="Fecha final"
          type="text"
          className="min-w-60"
          value={dayjs(fechaFinal).format("MMMM D, YYYY h:mm A")}
          onValueChange={setFechaFinal}
          disabled
        />
      </div>
      <div
        style={{ padding: "0.75rem 0 0 0" }}
        className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
      >
        <Select
          onChange={onChangeServicio}
          labelPlacement={"inside"}
          label="Servicio"
          className="min-w-60"
          isRequired
          isDisabled={idCita}
          defaultSelectedKeys={[idSelectedServicio?.toString()]}
          disallowEmptySelection
        >
          {serviciosList.map((servicio) => (
            <SelectItem key={servicio.id}>{servicio.nombre}</SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement={"inside"}
          label="Proveedor"
          className="min-w-60"
          isRequired
          isDisabled={disabledSelectedProveedor}
          defaultSelectedKeys={[idSelectedProveedor?.toString()]}
          disallowEmptySelection
        >
          {proveedoresList.map((proveedor) => (
            <SelectItem key={proveedor.id}>{proveedor.title}</SelectItem>
          ))}
        </Select>
      </div>
      <div
        style={{ padding: "0.75rem 0 0 0" }}
        className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
      >
        <Input
          isRequired
          label="Nombre"
          placeholder="Ingresa tu nombre"
          type="text"
          className="min-w-60"
          value={nombre}
          isDisabled={idCita}
          errorMessage={nombreMensajeError}
          isInvalid={esNombreInvalido}
          onValueChange={changeNombre}
        />
        <Input
          isRequired
          label="Apellido"
          placeholder="Ingresa tu apellido"
          type="text"
          className="min-w-60"
          value={apellido}
          isDisabled={idCita}
          errorMessage={apellidoMensajeError}
          isInvalid={esApellidoInvalido}
          onValueChange={changeApellido}
        />
      </div>
      <div className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row">
        <Input
          isRequired
          label="Correo"
          placeholder="Ingresa tu correo electronico"
          type="email"
          className="min-w-60"
          value={correo}
          isDisabled={idCita}
          errorMessage={correoMensajeError}
          isInvalid={esCorreoinvalido}
          onValueChange={changeCorreo}
        />
        <Input
          isRequired
          label="Telefono"
          placeholder="Ingresa tu telefono"
          type="text"
          className="min-w-60"
          value={telefono}
          isDisabled={idCita}
          errorMessage={telefonoMensajeError}
          isInvalid={esTelefonoInvalido}
          onValueChange={changeTelefono}
        />
      </div>
      <Textarea
        label="Observaciones cliente"
        value={notaCliente}
        isDisabled={idCita}
        onValueChange={changeNotasCliente}
      />

      {idCita && user.rol === "ADMIN" && (
        <Textarea
          isRequired
          label="Nota para el cliente"
          placeholder="Ingrese la nota"
          value={nota}
          errorMessage={notaMensajeError}
          isInvalid={esNotaInvalida}
          onValueChange={changeNotas}
        />
      )}

      <Button
        style={{ marginBottom: "10px" }}
        className={`py-6  ${idCita ? `hidden` : ``}`}
        isDisabled={
          esNombreInvalido ||
          !nombre ||
          esApellidoInvalido ||
          !apellido ||
          esCorreoinvalido ||
          !correo ||
          esTelefonoInvalido ||
          !telefono ||
          idSelectedServicio === 0 ||
          isLoadingSubmit
        }
        onClick={() => {}}
        color="primary"
        type="submit"
      >
        Confirmar cita
      </Button>
      {user.rol === "ADMIN" && (
        <Button
          style={{ marginBottom: "10px" }}
          className={` py-6 ${!idCita ? `hidden` : ``}`}
          color="danger"
          isDisabled={!nota || isLoadingSubmit}
          type="submit"
        >
          Cancelar cita
        </Button>
      )}
    </form>
  );
}
