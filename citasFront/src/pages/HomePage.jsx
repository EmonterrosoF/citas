import {
  Tabs,
  Tab,
  Input,
  Button,
  Card,
  CardBody,
  Calendar,
  Textarea,
  Select,
  SelectItem,
  Spinner,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Modal,
} from "@nextui-org/react";

import { useState, useEffect } from "react";
import { I18nProvider } from "@react-aria/i18n";

import { obtenerServiciosCliente } from "../services/servicios";
import { obtenerProveedoresPorServicio } from "../services/usuarios";
import {
  guardarCitaCliente,
  obtenerCitasPorProveedor,
  obtenerDiasNoLaborales,
  obtenerHorariosDisponiblesPorFecha,
  preGuardarCitaCliente,
} from "../services/citas";

import { format } from "@formkit/tempo";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";

import imagenBarberia from "../assets/barberia.jpg";

import { today, getLocalTimeZone } from "@internationalized/date";

import { diasDeLaSemana } from "../utils/diasDeLaSemana";
import PinField from "react-pin-field";

const nombreEmpresa = "THE KING BARBER";
function HomePage() {
  const [selectedTab, setSelectedTab] = useState("step1");

  // servicios
  const [servicios, setServicios] = useState([]);
  const [SelectedIdServicio, setDefaultSelectedIdServicio] = useState(["0"]);
  const [isLoadingServicios, setIsLoadingServicios] = useState(false);

  // proveedores
  const [proveedores, setProveedores] = useState([]);
  const [isDisabledSelectProveedores, setIsDisabledSelectProveedores] =
    useState(true);
  const [SelectedIdProveedor, setDefaultSelectedIdProveedor] = useState(["0"]);
  const [isLoadingProveedores, setIsLoadingProveedores] = useState(false);

  // citas reservadas
  const [citasReservadas, setCitasReservadas] = useState([]);

  // configuraciones
  const [diasNoLaborales, setDiasNoLaborales] = useState([]);

  // fecha
  const [esDiaInvalido, setEsDiaInvalido] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fechaSeleccionadaValida, setFechaSeleccionadaValida] = useState(null);
  const [isLoadingFechas, setIsLoadingFechas] = useState(false);

  // horario disponible
  const [horarioDisponible, setHorarioDisponible] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(["0"]);
  const [isLoadingHorarioDIsponible, setIsLoadingHorarioDIsponible] =
    useState(false);

  // datos de la persona
  const [nombre, setNombre] = useState("");
  const [esNombreInvalido, setEsNombreInvalido] = useState(null);
  const [nombreMensajeError, setNombreMensajeError] = useState(null);

  const [apellido, setApellido] = useState("");
  const [esApellidoInvalido, setEsApellidoInvalido] = useState(null);
  const [apellidoMensajeError, setApellidoMensajeError] = useState(null);

  const [correo, setCorreo] = useState("");
  const [esCorreoinvalido, setEsCorreoinvalido] = useState(null);
  const [correoMensajeError, setCorreoMensajeError] = useState(null);

  const [telefono, setTelefono] = useState("");
  const [esTelefonoInvalido, setEsTelefonoInvalido] = useState(null);
  const [telefonoMensajeError, setTelefonoMensajeError] = useState(null);

  const [notas, setNotas] = useState("");
  const [esNotasInvalido] = useState(null);
  const [notasMensajeError] = useState(null);

  // steps
  const [isDisabledStep2, setIsDisabledStep2] = useState(true);
  const [isDisabledStep3, setIsDisabledStep3] = useState(true);
  // const [isDisabledStep4, setIsDisabledStep4] = useState(true);

  // boton envio datos
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mensajeModal, setMensajeModal] = useState(null);

  const [token, setToken] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);

  // para mostrar modal
  const [isOpenConfirmacion, setIsOpenConfirmacion] = useState(false);

  async function getServicios() {
    // reinicar todo los campos por defecto
    setIsDisabledSelectProveedores(true);
    setDefaultSelectedIdProveedor(["0"]);
    setDefaultSelectedIdServicio(["0"]);
    setNombre("");
    setApellido("");
    setCorreo("");
    setTelefono("");
    setNotas("");
    setFechaSeleccionadaValida(null);
    setHorarioSeleccionado(["0"]);
    setHorarioDisponible([]);

    // reiniciar la tap
    setSelectedTab("step1");

    // desabilitar las tabs
    setIsDisabledStep2(true);
    setIsDisabledStep3(true);

    setIsLoadingServicios(true);
    const data = await obtenerServiciosCliente();

    if (!data.ocurrioError) {
      if (data.resultado.length > 0) {
        setServicios([
          { id: 0, nombre: "-- Seleccionar --" },
          ...data.resultado,
        ]);
      } else {
        toast.warning(
          "El catalogo de servicios esta vacio, comunicate con el administrador del sistema para mayor informacion"
        );
      }
      setIsLoadingServicios(false);
      return;
    }

    toast.error(data.mensaje);
    setIsLoadingServicios(false);
  }

  useEffect(() => {
    getServicios();
  }, []);

  const onChangeServicio = async (e) => {
    setIsDisabledSelectProveedores(true);
    setIsDisabledStep2(true);

    setServicios(servicios.filter((servicio) => servicio.id != 0));

    setIsLoadingProveedores(true);
    const data = await obtenerProveedoresPorServicio(e.target.value);

    setDefaultSelectedIdProveedor(["0"]);

    if (!data.ocurrioError) {
      if (data.resultado.length > 0) {
        setProveedores([
          { id: 0, nombre: "-- Seleccionar --" },
          ...data.resultado,
        ]);
        setIsDisabledSelectProveedores(false);
      } else {
        toast.warning(
          "El catalogo de proveedores esta vacio, comunicate con el administrador del sistema para mayor informacion"
        );
      }
      setDefaultSelectedIdServicio([e.target.value]);
      setIsLoadingProveedores(false);
      return;
    }

    toast.error(data.mensaje);
    setIsLoadingProveedores(false);
  };

  const onChangeProveedores = async (e) => {
    setIsDisabledStep2(true);

    setProveedores(proveedores.filter((proveedor) => proveedor.id != 0));

    setDefaultSelectedIdProveedor([e.target.value]);

    if (e.target.value != 0) {
      setIsLoadingButton(true);
      setIsLoadingFechas(true);
      const dataCitas = await obtenerCitasPorProveedor(e.target.value);

      if (!dataCitas.ocurrioError) {
        const dataDias = await obtenerDiasNoLaborales();

        if (!dataDias.ocurrioError) {
          setCitasReservadas(dataCitas.resultado);
          setDiasNoLaborales(dataDias.resultado);
          setIsDisabledStep2(false);
          setIsLoadingFechas(false);
          setIsLoadingButton(false);
          return;
        }

        setIsLoadingFechas(false);
        setIsLoadingButton(false);
        toast.error(dataDias.mensaje);
        return;
      }

      toast.error(dataCitas.mensaje);

      setIsLoadingFechas(false);
      setIsLoadingButton(false);
    }
  };

  const fechasReservadas = (fecha) => {
    return citasReservadas?.some((cita) => {
      const reservada = new Date(cita);
      const fechaCalendario = new Date(fecha);

      return (
        reservada.getUTCFullYear() === fechaCalendario.getUTCFullYear() &&
        reservada.getUTCMonth() === fechaCalendario.getUTCMonth() &&
        reservada.getUTCDate() === fechaCalendario.getUTCDate()
      );
    });
  };

  const changeFecha = async (fecha) => {
    const diaSeleccionado = diasDeLaSemana[new Date(fecha).getUTCDay()];
    const esInvalido = diasNoLaborales.some((dia) => dia === diaSeleccionado);
    setHorarioDisponible([]);
    setEsDiaInvalido(esInvalido);
    setFechaSeleccionada(fecha);
    setFechaSeleccionadaValida(null);
    setIsDisabledStep3(true);

    if (!esInvalido) {
      setIsLoadingHorarioDIsponible(true);

      setFechaSeleccionadaValida(fecha);
      const data = await obtenerHorariosDisponiblesPorFecha(
        fecha.toString(),
        SelectedIdProveedor[0],
        servicios.find((servicio) => servicio.id == SelectedIdServicio[0])
          ?.duracion
      );

      if (!data.ocurrioError) {
        if (data?.resultado?.length > 0)
          setHorarioDisponible(["-- Seleccionar --", ...data.resultado]);

        setHorarioSeleccionado(["0"]);
        setIsLoadingHorarioDIsponible(false);
        return;
      }
      toast.error(data.mensaje);
      setIsLoadingHorarioDIsponible(false);
    }
  };

  const changeHorarioSeleccionado = (e) => {
    const horario = e.target.value;
    setIsDisabledStep3(true);
    setHorarioSeleccionado([horario]);

    if (horario != 0) setIsDisabledStep3(horario ? false : true);
  };

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
    if (valor.length < 120) setNotas(valor);
  };

  const presubmitDatosCita = async (e) => {
    setIsLoadingButton(true);
    e.preventDefault();

    const correoCliente = correo;

    const data = await preGuardarCitaCliente(correoCliente, nombre);

    if (!data.ocurrioError) {
      setIsOpenConfirmacion(true);
      toast.success(data.mensaje);
    } else {
      toast.error(data.mensaje);
    }

    setIsLoadingButton(false);
  };

  const submitDatosCita = async (e) => {
    setIsLoadingButton(true);
    e.preventDefault();
    const idServicio = SelectedIdServicio[0];
    const duracionServicio = servicios.find(
      (servicio) => servicio.id == SelectedIdServicio[0]
    )?.duracion;

    const idProveedor = SelectedIdProveedor[0];
    const fechaInicio = fechaSeleccionadaValida.toString();
    const hora = horarioDisponible[horarioSeleccionado[0]];

    const nombreCliente = nombre;
    const apellidoCliente = apellido;
    const correoCliente = correo;
    const telefonoCliente = telefono;
    const notasCLiente = notas;

    const data = await guardarCitaCliente(
      idServicio,
      duracionServicio,
      idProveedor,
      fechaInicio,
      hora,
      nombreCliente,
      apellidoCliente,
      correoCliente,
      telefonoCliente,
      notasCLiente,
      token
    );

    if (!data.ocurrioError) {
      onOpen(true);
      setIsOpenConfirmacion(false);

      toast.success(
        `${data.mensaje} para el dia ${format(
          fechaSeleccionadaValida?.toString(),
          "full"
        )} a las ${horarioDisponible[horarioSeleccionado[0]]} hrs.`
      );
      setMensajeModal(
        `${data.mensaje} para el dia ${format(
          fechaSeleccionadaValida?.toString(),
          "full"
        )} a las ${horarioDisponible[horarioSeleccionado[0]]} hrs.`
      );
    } else {
      toast.error(data.mensaje);
    }

    setIsLoadingButton(false);
  };

  function formatFechaInicioToGoogleCalendar() {
    const fechaInicio = new Date(
      `${fechaSeleccionadaValida.toString()}T${
        horarioDisponible[horarioSeleccionado[0]]
      }`
    );

    const year = fechaInicio.getFullYear();
    const month = String(fechaInicio.getMonth() + 1).padStart(2, "0");
    const day = String(fechaInicio.getDate()).padStart(2, "0");
    const hours = String(fechaInicio.getHours()).padStart(2, "0");
    const minutes = String(fechaInicio.getMinutes()).padStart(2, "0");
    const seconds = String(fechaInicio.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  }

  function formatFechaFinToGoogleCalendar() {
    const fechaInicio = new Date(
      `${fechaSeleccionadaValida.toString()}T${
        horarioDisponible[horarioSeleccionado[0]]
      }`
    );

    const duracion = servicios.find(
      (servicio) => servicio.id == SelectedIdServicio[0]
    )?.duracion;

    const fechaFinal = new Date(fechaInicio);
    fechaFinal.setMinutes(fechaFinal.getMinutes() + duracion);

    const year = fechaFinal.getFullYear();
    const month = String(fechaFinal.getMonth() + 1).padStart(2, "0");
    const day = String(fechaFinal.getDate()).padStart(2, "0");
    const hours = String(fechaFinal.getHours()).padStart(2, "0");
    const minutes = String(fechaFinal.getMinutes()).padStart(2, "0");
    const seconds = String(fechaFinal.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  }

  return (
    <>
      <div className="absolute w-full h-full">
        <img
          className="w-full h-full object-cover"
          src={imagenBarberia}
          alt=""
        />
      </div>
      <div className="flex w-full py-36 flex-col">
        <ToastContainer />

        <Card className=" mx-auto p-10 lg:w-[700px] md:w-[700px] ">
          <CardBody className="">
            <form onSubmit={presubmitDatosCita}>
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selectedTab}
                onSelectionChange={setSelectedTab}
              >
                <Tab key="step1" title="Paso uno">
                  <div className="flex flex-col gap-4">
                    <h4
                      style={{ padding: "20px 0 0 0" }}
                      className="font-bold text-large text-center"
                    >
                      Seleccione servicio y proveedor
                    </h4>
                    <div className="flex gap-10 py-3 justify-between items-center flex-col md:flex-row md:items-start lg:flex-row lg:items-start">
                      {isLoadingServicios ? (
                        <div
                          color="primary"
                          className="text-center w-[260px] px-1 py-2"
                        >
                          <Spinner
                            label="Cargando..."
                            color="primary"
                            labelColor="primary"
                          />
                        </div>
                      ) : (
                        <Select
                          onChange={onChangeServicio}
                          labelPlacement={"inside"}
                          label="servicio"
                          className="max-w-xs"
                          isRequired
                          disallowEmptySelection
                          defaultSelectedKeys={SelectedIdServicio}
                        >
                          {servicios.map((servicio) => (
                            <SelectItem
                              key={servicio.id}
                              description={
                                servicio.id != 0 &&
                                `Precio Q ${servicio.precio} - Duración aprox. ${servicio.duracion} min.`
                              }
                            >
                              {servicio.nombre}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                      {isLoadingProveedores ? (
                        <div
                          color="primary"
                          className="text-center w-[260px] px-1 py-2"
                        >
                          <Spinner
                            label="Cargando..."
                            color="primary"
                            labelColor="primary"
                          />
                        </div>
                      ) : (
                        <Select
                          labelPlacement={"inside"}
                          label="proveedor"
                          className="max-w-xs"
                          isDisabled={isDisabledSelectProveedores}
                          isRequired
                          disallowEmptySelection
                          onChange={onChangeProveedores}
                          defaultSelectedKeys={SelectedIdProveedor}
                        >
                          {proveedores.map((proveedor) => (
                            <SelectItem
                              key={proveedor.id}
                              description={
                                proveedor.id != 0 && `${proveedor.apellido}`
                              }
                            >
                              {`${proveedor.nombre}`}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        isDisabled={isDisabledStep2}
                        color="primary"
                        onClick={() => setSelectedTab("step2")}
                      >
                        {isLoadingButton ? "Cargando datos..." : "Continuar"}
                      </Button>
                    </div>
                  </div>
                </Tab>
                <Tab key="step2" title="Paso dos" isDisabled={isDisabledStep2}>
                  <div className="flex flex-col gap-4">
                    <h4
                      style={{ padding: "20px 0 0 0" }}
                      className="font-bold text-large text-center"
                    >
                      Seleccione fecha y hora de cita
                    </h4>
                    <div className="flex gap-10 py-3 justify-between items-center flex-col md:flex-row md:items-start lg:flex-row lg:items-start">
                      {isLoadingFechas ? (
                        <div
                          color="primary"
                          className="text-center w-[260px] px-1 py-2"
                        >
                          <Spinner
                            label="Cargando..."
                            color="primary"
                            labelColor="primary"
                          />
                        </div>
                      ) : (
                        <I18nProvider locale="es-ES">
                          <Calendar
                            className="min-w-max"
                            aria-label="Date (Max Date Value)"
                            isDateUnavailable={fechasReservadas}
                            errorMessage={
                              esDiaInvalido
                                ? `El dia ${
                                    diasDeLaSemana[
                                      new Date(fechaSeleccionada).getUTCDay()
                                    ]
                                  } no es dia laboral, porfavor seleccione otro dia`
                                : undefined
                            }
                            isInvalid={esDiaInvalido}
                            value={fechaSeleccionadaValida}
                            onChange={changeFecha}
                            minValue={today(getLocalTimeZone())}
                          />
                        </I18nProvider>
                      )}
                      {isLoadingHorarioDIsponible ? (
                        <div
                          color="primary"
                          className="text-center w-[260px] px-1 py-2"
                        >
                          <Spinner
                            label="Cargando..."
                            color="primary"
                            labelColor="primary"
                          />
                        </div>
                      ) : horarioDisponible.length > 0 ? (
                        <Select
                          labelPlacement={"inside"}
                          label="Horario"
                          className="max-w-xs"
                          isRequired
                          onChange={changeHorarioSeleccionado}
                          defaultSelectedKeys={horarioSeleccionado}
                        >
                          {horarioDisponible.map((horario, i) => (
                            <SelectItem key={i}>{horario}</SelectItem>
                          ))}
                        </Select>
                      ) : (
                        <div
                          color="primary"
                          className="text-center w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100"
                        >
                          <span className=" text-red-400">
                            Horario no disponible
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 justify-between">
                      <Button
                        onClick={() => setSelectedTab("step1")}
                        color="primary"
                      >
                        Regresar
                      </Button>
                      <Button
                        isDisabled={isDisabledStep3}
                        onClick={() => setSelectedTab("step3")}
                        color="primary"
                      >
                        Continuar
                      </Button>
                    </div>
                  </div>
                </Tab>
                <Tab key="step3" title="Paso tres" isDisabled={isDisabledStep3}>
                  <form className="flex flex-col gap-4">
                    <h4
                      style={{ padding: "20px 0 0 0" }}
                      className="font-bold text-large text-center"
                    >
                      Ingrese su información
                    </h4>
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
                        errorMessage={correoMensajeError}
                        isInvalid={esCorreoinvalido}
                        onValueChange={changeCorreo}
                        SelectedIdServicio
                      />
                      <Input
                        isRequired
                        label="Telefono"
                        placeholder="Ingresa tu telefono"
                        type="text"
                        className="min-w-60"
                        value={telefono}
                        errorMessage={telefonoMensajeError}
                        isInvalid={esTelefonoInvalido}
                        onValueChange={changeTelefono}
                      />
                    </div>
                    <Textarea
                      label="Notas"
                      placeholder="Ingresa una nota"
                      value={notas}
                      errorMessage={notasMensajeError}
                      isInvalid={esNotasInvalido}
                      onValueChange={changeNotas}
                    />

                    <div className="flex gap-2 justify-between">
                      <Button
                        onClick={() => setSelectedTab("step2")}
                        color="primary"
                      >
                        Regresar
                      </Button>

                      <Button
                        isDisabled={
                          esNombreInvalido ||
                          !nombre ||
                          esApellidoInvalido ||
                          !apellido ||
                          esCorreoinvalido ||
                          !correo ||
                          esTelefonoInvalido ||
                          !telefono
                        }
                        onClick={() => {
                          setSelectedTab("step4");
                        }}
                        color="primary"
                      >
                        Continuar
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab
                  key="step4"
                  title="Paso cuatro"
                  isDisabled={
                    esNombreInvalido ||
                    !nombre ||
                    esApellidoInvalido ||
                    !apellido ||
                    esCorreoinvalido ||
                    !correo ||
                    esTelefonoInvalido ||
                    !telefono ||
                    isDisabledStep3
                  }
                >
                  <h4
                    style={{ padding: "20px 0 0 0" }}
                    className="font-bold text-large text-center"
                  >
                    Confirmación de cita
                  </h4>
                  <div className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row py-10">
                    <div>
                      <span className="font-bold">Servicio: </span>
                      {
                        servicios.find(
                          (servicio) => servicio.id == SelectedIdServicio[0]
                        )?.nombre
                      }
                      <br />
                      <span className="font-bold">Precio: </span>Q
                      {
                        servicios.find(
                          (servicio) => servicio.id == SelectedIdServicio[0]
                        )?.precio
                      }
                      <br />
                      <span className="font-bold">Duracion aprox: </span>
                      {
                        servicios.find(
                          (servicio) => servicio.id == SelectedIdServicio[0]
                        )?.duracion
                      }{" "}
                      min.
                      <br />
                      <span className="font-bold">Proveedor: </span>
                      {
                        proveedores.find(
                          (servicio) => servicio.id == SelectedIdProveedor[0]
                        )?.nombre
                      }{" "}
                      {
                        proveedores.find(
                          (servicio) => servicio.id == SelectedIdProveedor[0]
                        )?.apellido
                      }
                      <br />
                      <span className="font-bold">Fecha cita: </span>
                      {format(fechaSeleccionadaValida?.toString(), "full")} a
                      las {horarioDisponible[horarioSeleccionado[0]]} hrs.
                    </div>
                    <div>
                      <span className="font-bold">Nombre: </span>
                      {nombre}
                      <br />
                      <span className="font-bold">Apellido: </span>
                      {apellido}
                      <br />
                      <span className="font-bold">correo: </span>
                      {correo}
                      <br />
                      <span className="font-bold">Telefono: </span>
                      {telefono}
                      <br />
                      <span className="font-bold">Notas: </span>
                      {notas}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <Button
                      onClick={() => setSelectedTab("step3")}
                      color="primary"
                    >
                      Regresar
                    </Button>

                    <Button
                      isDisabled={isLoadingButton}
                      color="primary"
                      type="submit"
                    >
                      {isLoadingButton ? "Cargando..." : "Confirmar cita"}
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </form>
          </CardBody>
        </Card>

        <Card className="absolute bottom-0 left-0 right-0 rounded-none">
          <section className="py-5 bg-gray-800 text-white">
            <div className="container mx-auto text-center">
              <p>La mejor barbería de Chiquimulilla.</p>
              <Link
                to="/"
                className="bg-yellow-500 text-black px-6 py-3 rounded mt-4 inline-block"
              >
                Regresar a la pagina de inicio
              </Link>
            </div>
            <div className="container mx-auto text-center my-2">
              <p>
                &copy; 2024 The King Barber Life. Todos los derechos reservados.
              </p>
            </div>
          </section>
        </Card>

        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled
          hideCloseButton
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Informacion de la solicitud
                </ModalHeader>
                <ModalBody>
                  <p>{mensajeModal}</p>
                  <Button
                    as={Link}
                    className="py-5"
                    color="primary"
                    to={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cita+agendada+en+${nombreEmpresa}&dates=${formatFechaInicioToGoogleCalendar()}%2F${formatFechaFinToGoogleCalendar()}&location=${nombreEmpresa}&details=${notas}`}
                    target="_blank"
                  >
                    Guardar el recordatorio en tu calendario de google
                  </Button>
                  <Button
                    onPress={onClose}
                    className="py-5"
                    color="secondary"
                    onClick={async () => await getServicios()}
                  >
                    Realizar una nueva cita
                  </Button>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          backdrop="blur"
          size="xl"
          isOpen={isOpenConfirmacion}
          onOpenChange={setIsOpenConfirmacion}
          isDismissable={false}
          isKeyboardDismissDisabled
          hideCloseButton
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Confirmar Cita
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={submitDatosCita}>
                    <div className="text-center my-10">
                      <div className="flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-bold mb-4">
                          Introduce tu código de verificación
                        </h2>
                        <div className="flex  items-center justify-center">
                          <PinField
                            autoFocus
                            length={6}
                            className=" w-12 h-12 text-2xl border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-center mx-1"
                            onChange={(value) => {
                              setIsValidToken(value.length === 6);
                              setToken(value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end py-5">
                      <Button
                        type="submit"
                        fullWidth
                        color="primary"
                        isDisabled={!isValidToken || isLoadingButton}
                      >
                        Continuar
                      </Button>
                    </div>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default HomePage;
