import { useContext, useEffect, useState } from "react";
import {
  obtenerHorarioLaboral,
  obtenerCitas,
  obtenerProveedores,
} from "../../services/usuarios";

import { obtenerServicios } from "../../services/servicios";

import { ToastContainer, toast } from "react-toastify";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import español from "dayjs/locale/es-us";
import dayjs from "dayjs";
import ModalCita from "../../components/modalCita";

import { diasDeLaSemana } from "../../utils/diasDeLaSemana";

import { AuthContext } from "../../context/authProvider";

const traduccion = {
  next: "siguiente",
  previous: "anterior",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  event: "Evento",
  date: "Fecha",
  time: "Horario",
  tomorrow: "Mañana",
  yesterday: "Ayer",
  noEventsInRange: "No hay eventos en este rango.",
  allDay: "Todo el día",
  work_week: "Semana laboral",
  showMore: (total) => `+${total} más`,
};

export default function CalendarioPage() {
  // para mostrar modal
  const [verModalCita, setVerModalCita] = useState(false);
  // configuraciones
  dayjs.locale(español);
  const localizer = dayjsLocalizer(dayjs);

  const [eventos, setEventos] = useState([]);

  const [proveedores, setProveedores] = useState([]);
  const [servicios, setServicios] = useState([]);

  // citas
  const [cita, setCita] = useState({});

  const [horarioLaboral, setHorarioLaboral] = useState({});

  const { user } = useContext(AuthContext);

  async function getCitas() {
    const dataCitas = await obtenerCitas();

    if (!dataCitas.ocurrioError) {
      setEventos(dataCitas.resultado);
      return;
    }
    toast.error(dataCitas.mensaje);
    return;
  }

  const getProveedores = async () => {
    const data = await obtenerProveedores();

    if (!data.ocurrioError) {
      setProveedores(data.resultado);
      return;
    }

    toast.error(data.mensaje);
  };

  async function getHorarioLaboral() {
    const dataHorario = await obtenerHorarioLaboral();

    if (!dataHorario.ocurrioError) {
      setHorarioLaboral(dataHorario.resultado);
      return;
    }
    toast.error(dataHorario.mensaje);
    return;
  }

  async function getServicios() {
    const dataServicios = await obtenerServicios();
    if (!dataServicios.ocurrioError) {
      if (dataServicios.resultado.length > 0) {
        setServicios([
          { id: 0, nombre: "-- Seleccionar --" },
          ...dataServicios.resultado.filter((servicio) => !servicio.privado),
        ]);
      } else {
        toast.warning(
          "El catalogo de servicios esta vacio, comunicate con el administrador del sistema para mayor informacion"
        );
      }
      return;
    }
    toast.error(dataServicios.mensaje);
    return;
  }

  useEffect(() => {
    getCitas();
    getProveedores();
    getHorarioLaboral();
    getServicios();
  }, []);

  return (
    <div className="w-full">
      <ToastContainer />
      <Calendar
        // view="week"
        localizer={localizer}
        events={eventos}
        startAccessor={(event) => new Date(event.start)}
        endAccessor={(event) => new Date(event.end)}
        resources={proveedores}
        resourceIdAccessor={"id"}
        resourceTitleAccessor={"title"}
        messages={traduccion}
        className="h-[85vh]"
        step={15} // Intervalos de 15 minutos
        timeslots={4}
        onSelectSlot={({ start, end, resourceId }) => {
          const day = diasDeLaSemana[start.getDay()];
          const horario = horarioLaboral[day];

          // si no es dia laboral no se puede seleccionar el slot
          if (!horario) return;

          // Obtener horas y minutos del slot
          const slotTimeStart = start.getHours() * 60 + start.getMinutes();
          const slotTimeEnd = end.getHours() * 60 + end.getMinutes();

          if (horario?.descanso?.length > 0) {
            const inicioDescanso = horario.descanso[0][0];
            const finDescanso = horario.descanso[0][1];

            // validacion del descanso
            if (
              (slotTimeStart >= inicioDescanso &&
                slotTimeStart < finDescanso) || // Si el inicio está dentro del descanso
              (slotTimeEnd > inicioDescanso && slotTimeEnd <= finDescanso) || // Si el fin está dentro del descanso
              (slotTimeStart < inicioDescanso && slotTimeEnd > finDescanso) // Si el descanso está completamente dentro del rango seleccionado
            )
              return;
          }

          const minTotalMinutes = horario?.min;
          const maxTotalMinutes = horario?.max;

          // Verificar si la hora actual está fuera del rango laboral con precisión de minutos
          if (
            slotTimeStart < minTotalMinutes ||
            slotTimeStart >= maxTotalMinutes ||
            slotTimeEnd < minTotalMinutes ||
            slotTimeEnd >= maxTotalMinutes + 1
          )
            return;

          // Validar si el slot se superpone con citas ya reservadas
          const citasSuperpuestas = eventos.some((cita) => {
            let citaInicio = new Date(cita.start);
            let citaFin = new Date(cita.end);

            // Obtener fecha del slot seleccionado
            const slotDate = start.toDateString(); // Obtener solo la fecha sin hora
            const citaDate = citaInicio.toDateString(); // Obtener solo la fecha de la cita

            // Comparar si son el mismo día
            if (slotDate !== citaDate) return false; // Si no es el mismo día, no hay superposición

            citaInicio = citaInicio.getHours() * 60 + citaInicio.getMinutes();
            citaFin = citaFin.getHours() * 60 + citaFin.getMinutes();

            return (
              (slotTimeStart >= citaInicio && slotTimeStart < citaFin) ||
              (slotTimeEnd > citaInicio && slotTimeEnd <= citaFin) ||
              (slotTimeStart < citaInicio && slotTimeEnd > citaFin)
            );
          });

          if (citasSuperpuestas) {
            // Si hay una cita superpuesta, no se puede seleccionar el slot
            return;
          }

          // si todo va bien, se puede seleccionar el slot para una nueva cita
          setCita({
            id: null,
            fechaInicio: start,
            fechaFinal: end,
            nombre: null,
            apellido: null,
            correo: null,
            telefono: null,
            notas: null,
            idServicio: null,
            idProveedor: resourceId,
          });

          // muestra el modal para crear la cita
          setVerModalCita(!verModalCita);
        }}
        onSelectEvent={(event) => {
          const fechaInicio = new Date(event?.start);
          const fechaFinal = new Date(event?.end);

          setCita({
            id: event?.id,
            fechaInicio,
            fechaFinal,
            nombre: event?.nombre,
            apellido: event?.apellido,
            correo: event?.correo,
            telefono: event?.telefono,
            notas: event?.notas,
            idServicio: event?.idServicio,
            idProveedor: event?.resourceId,
            title: event?.title,
          });
          setVerModalCita(!verModalCita);
        }}
        selectable={user.rol === "ADMIN"}
        slotPropGetter={(date) => {
          const day = diasDeLaSemana[date.getDay()];
          const horario = horarioLaboral[day];

          // validacion para dias no laborables
          if (!horario)
            return {
              style: {
                backgroundColor: "#ffcccc", // Cambia el color de fondo para dias no laborales
              },
            };

          // Obtener la hora y minutos del slot (en minutos totales)
          const slotTotalMinutes = date.getHours() * 60 + date.getMinutes();

          if (horario?.descanso?.length > 0) {
            const inicioDescanso = horario?.descanso[0][0];
            const finDescanso = horario?.descanso[0][1];
            if (
              slotTotalMinutes >= inicioDescanso &&
              slotTotalMinutes < finDescanso
            )
              return {
                style: {
                  backgroundColor: "#e6e6e6", // Cambia el color de fondo para horas de descanso
                },
              };
          }

          // validacion de tiempo muerto tiempo de descanso

          // HORARIO LABORAL
          const minTotalMinutes = horario?.min;
          const maxTotalMinutes = horario?.max;

          // Verificar si la hora actual está fuera del rango laboral
          if (
            slotTotalMinutes < minTotalMinutes ||
            slotTotalMinutes >= maxTotalMinutes
          ) {
            return {
              style: {
                backgroundColor: "#e6e6e6", // Cambia el color de fondo para horas no laborales
              },
            };
          }
        }}
      />
      <ModalCita
        isOpen={verModalCita}
        setOpenChange={setVerModalCita}
        cita={cita}
        proveedores={proveedores}
        servicios={servicios}
        getCitas={getCitas}
      />
    </div>
  );
}
