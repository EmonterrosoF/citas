/* eslint-disable react/prop-types */
import { Input, Textarea, Button, Switch } from "@nextui-org/react";

import { useState } from "react";

import { toast } from "react-toastify";
import {
  actualizarServicio,
  eliminarServicio,
  guardarServicio,
} from "../services/servicios";

export default function FormServicio({
  servicio,
  setOpenChange,
  getServicios,
  accion,
}) {
  const [idServicio] = useState(servicio?.id ?? "");

  const [nombre, setNombre] = useState(servicio?.nombre ?? "");
  const [esNombreInvalido, setEsNombreInvalido] = useState(false);
  const [nombreMensajeError, setNombreMensajeError] = useState(null);

  const [precio, setPrecio] = useState(servicio?.precio ?? "");
  const [esPrecioInvalido, setEsPrecioInvalido] = useState(false);
  const [precioMensajeError, setPrecioMensajeError] = useState(null);

  const [descripcion, setDescripcion] = useState(servicio?.descripcion ?? "");
  const [esDescripcioninvalido, setEsDescripcioninvalido] = useState(false);

  const [privado, setPrivado] = useState(servicio?.privado ?? false);

  const [duracion, setDuracion] = useState(servicio?.duracion ?? "");
  const [esDuracionInvalido, setEsDuracionInvalido] = useState(false);
  const [duracionMensajeError, setDuracionMensajeError] = useState(null);

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

  const changePrecio = (valor) => {
    if (valor.length > 10) return (valor = precio);
    if (!valor) {
      setEsPrecioInvalido(true);
      setPrecioMensajeError("Precio es requerido");
      return setPrecio("");
    }
    // Elimina cualquier carácter que no sea un número o punto decimal
    let montoLimpio = valor
      .replace(/^0+(?=\d)/, "") // Eliminar ceros a la izquierda
      .replace(/[^\d.]/g, "") // Eliminar caracteres no numéricos, excepto el punto
      .replace(/^\./, "") // Evitar que el primer carácter sea un punto
      .replace(/(\..*)\./g, "$1") // Evitar múltiples puntos
      .replace(/(\.\d{2})\d+/, "$1"); // Limitar a dos decimales

    // Cambia la longitud máxima en función del punto decimal
    let maxLength = montoLimpio.includes(".") ? 10 : 7;

    // Verifica si excede la longitud máxima
    if (montoLimpio.length > maxLength) {
      return;
    }

    setPrecio(montoLimpio);

    setEsPrecioInvalido(false);
  };

  const changeDuracion = (valor) => {
    if (isNaN(valor) || valor.length > 5 || parseInt(valor) < 1)
      return (valor = duracion);

    if (!valor) {
      setEsDuracionInvalido(true);
      setDuracionMensajeError("Duracion es requerido");
      return setDuracion("");
    }

    setDuracion(valor.replace(/\D/g, ""));

    setEsDuracionInvalido(false);
  };

  const changeDescripcion = (valor) => {
    if (valor.length > 40) return (valor = descripcion);
    setDescripcion(valor);

    setEsDescripcioninvalido(false);
  };

  const onSubmitServicio = async (e) => {
    e.preventDefault();
    setisLoadingSubmit(true);
    if (idServicio && accion == "ELIMINAR") {
      const data = await toast.promise(eliminarServicio(idServicio), {
        pending: "Cargando...",
      });

      if (!data.ocurrioError) {
        getServicios();
        toast.success(data.mensaje);
      } else {
        toast.error(data.mensaje);
      }
    } else if (idServicio && accion == "EDITAR") {
      const data = await toast.promise(
        actualizarServicio(
          idServicio,
          nombre,
          precio,
          duracion,
          privado,
          descripcion
        ),
        {
          pending: "Cargando...",
        }
      );

      if (!data.ocurrioError) {
        getServicios();
        toast.success(data.mensaje);
      } else {
        toast.error(data.mensaje);
      }
    } else {
      const data = await toast.promise(
        guardarServicio(nombre, precio, duracion, privado, descripcion),
        { pending: "Cargando..." }
      );

      if (!data.ocurrioError) {
        getServicios();
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
      onSubmit={onSubmitServicio}
    >
      <h4
        style={{ padding: "20px 0 0 0" }}
        className="font-bold text-large text-center"
      >
        Detalle servicio
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
          isDisabled={idServicio && accion != "EDITAR"}
          errorMessage={nombreMensajeError}
          isInvalid={esNombreInvalido}
          onValueChange={changeNombre}
        />
        <Input
          isRequired
          label="Precio"
          placeholder="0.00"
          type="text"
          className="min-w-60"
          value={precio}
          isDisabled={idServicio && accion != "EDITAR"}
          errorMessage={precioMensajeError}
          isInvalid={esPrecioInvalido}
          onValueChange={changePrecio}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">Q</span>
            </div>
          }
          onBlur={(e) => {
            if (e.target.value === "") return;
            setPrecio(
              new Intl.NumberFormat("es-US", {
                style: "decimal",
                minimumFractionDigits: 2,
              })
                .format(e.target.value)
                .replace(/,/g, "")
            );
          }}
        />
      </div>
      <div className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row">
        <Input
          isRequired
          label="Duracion en minutos"
          placeholder="Ingresa la duracion"
          className="min-w-60"
          value={duracion}
          isDisabled={idServicio && accion != "EDITAR"}
          errorMessage={duracionMensajeError}
          isInvalid={esDuracionInvalido}
          onValueChange={changeDuracion}
        />
        <div className="min-w-60">
          <Switch
            isDisabled={idServicio && accion != "EDITAR"}
            isSelected={privado}
            onValueChange={setPrivado}
          >
            Es privado
          </Switch>
        </div>
      </div>
      <Textarea
        label="Descripcion"
        value={descripcion}
        isDisabled={idServicio && accion != "EDITAR"}
        onValueChange={changeDescripcion}
      />
      <Button
        style={{ marginBottom: "10px" }}
        className={`py-6  ${
          idServicio && accion === "ELIMINAR" ? `` : `hidden`
        }`}
        isDisabled={isLoadingSubmit}
        color={"danger"}
        type="submit"
      >
        Eliminar servicio
      </Button>
      <Button
        style={{ marginBottom: "10px" }}
        className={`py-6  ${idServicio && accion !== "EDITAR" ? `hidden` : ``}`}
        isDisabled={
          esNombreInvalido ||
          !nombre ||
          esPrecioInvalido ||
          !precio ||
          esDuracionInvalido ||
          !duracion ||
          esDescripcioninvalido ||
          isLoadingSubmit
        }
        color={accion === "EDITAR" ? "secondary" : "primary"}
        type="submit"
      >
        {accion === "EDITAR" ? "Actualizar servicio" : "Confirmar servicio"}
      </Button>
    </form>
  );
}
