import {
  SP_CANCELAR_CITA,
  SP_CITAS_RESERVADAS,
  SP_CITAS_RESERVADAS_POR_FECHA,
  SP_GUARDAR_CITA,
  SP_HORARIO_LABORAL,
} from "../utils/sp.js";
import { ejecutarSP } from "../data/dbConexion.js";
const diasDeLaSemana = {
  0: "lunes",
  1: "martes",
  2: "miercoles",
  3: "jueves",
  4: "viernes",
  5: "sabado",
  6: "domingo",
};

export const getCitasReservadasProveedor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const citasReservadas = await ejecutarSP(SP_CITAS_RESERVADAS, [id]);

    const resultado = await ejecutarSP(SP_HORARIO_LABORAL);

    const horarioLaboral = JSON.parse(resultado[0].valor);

    // Objeto para agrupar las citas por día
    const duracionesPorDia = {};

    //lista de dias reservados
    const diasReservados = [];

    citasReservadas.forEach((fechaCita) => {
      const fecha = new Date(fechaCita.fechaInicio).toString();
      console.log(fecha);
      let dia = new Date(fechaCita.fechaInicio).getDay();
      dia = diasDeLaSemana[dia];
      console.log(dia);

      const horario = horarioLaboral[dia];

      const inicioHoras = new Date(fechaCita.fechaInicio).getHours();
      const inicioMinutos = new Date(fechaCita.fechaInicio).getMinutes();
      const finHoras = new Date(fechaCita.fechaFin).getHours();
      const finMinutos = new Date(fechaCita.fechaFin).getMinutes();

      const minutosInicio = inicioHoras * 60 + inicioMinutos;
      const minutosFin = finHoras * 60 + finMinutos;

      const duracionCita = minutosFin - minutosInicio;

      // Agregar la duración de la cita al día correspondiente
      if (!duracionesPorDia[fecha]) {
        duracionesPorDia[fecha] = duracionCita;
      } else {
        duracionesPorDia[fecha] += duracionCita;
      }

      // Calcular la duración total del día laboral
      if (horario) {
        let [inicioHoras, inicioMinutos] = horario.inicio
          ?.split(":")
          .map(Number);
        let [finHoras, finMinutos] = horario.fin?.split(":").map(Number);

        // Convertir las horas de inicio y fin a minutos
        const minutosInicioLaboral = inicioHoras * 60 + inicioMinutos;
        const minutosFinLaboral = finHoras * 60 + finMinutos;

        // Calcular la duración total del día en minutos
        let duracionTotalLaboral = minutosFinLaboral - minutosInicioLaboral;

        // Restar los descansos
        if (horario.descanso) {
          horario.descanso.forEach((descanso) => {
            const [inicioDescansoHoras, inicioDescansoMinutos] = descanso.inicio
              .split(":")
              .map(Number);
            const [finDescansoHoras, finDescansoMinutos] = descanso.fin
              .split(":")
              .map(Number);

            const minutosInicioDescanso =
              inicioDescansoHoras * 60 + inicioDescansoMinutos;
            const minutosFinDescanso =
              finDescansoHoras * 60 + finDescansoMinutos;

            // Restar el descanso de la duración total
            duracionTotalLaboral -= minutosFinDescanso - minutosInicioDescanso;
          });
          //   console.log(horario);
          //   console.log(duracionTotal / 60);
        }

        if (duracionesPorDia[fecha] >= duracionTotalLaboral) {
          diasReservados.push(fecha);
        }
      }
    });

    res.json({
      resultado: diasReservados,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};

export const getdiasNoLaborales = async (req, res, next) => {
  try {
    const horario = await ejecutarSP(SP_HORARIO_LABORAL);

    const horarioLaboral = JSON.parse(horario[0].valor);
    const diasNoLaborales = [];

    Object.entries(horarioLaboral).forEach((x) => {
      const [clave, valor] = x;
      if (!valor) diasNoLaborales.push(clave);
    });

    res.json({
      resultado: diasNoLaborales,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error, por favor intenta de nuevo o mas tarde"
    );
    next(error);
  }
};

export const getHorarioDisponiblePorFecha = async (req, res, next) => {
  try {
    let { fecha, idProveedor, duracionServicio } = req.query;

    duracionServicio = parseInt(duracionServicio);

    console.log("fecha", fecha);
    const diaSemana = new Date(fecha).getDay();
    const citasReservadas = await ejecutarSP(SP_CITAS_RESERVADAS_POR_FECHA, [
      fecha,
      idProveedor,
    ]);

    const resultado = await ejecutarSP(SP_HORARIO_LABORAL);
    const horarioLaboral = JSON.parse(resultado[0].valor);

    const dia = diasDeLaSemana[diaSemana];

    console.log(diaSemana);
    const horario = horarioLaboral[dia];

    console.log("horario", horario);

    if (!horario) {
      return res.json([]); // No hay horario laboral para este día
    }

    // Crear rangos de 15 minutos dentro del horario laboral
    let intervalos = [];
    if (horario?.inicio) {
      const [inicioHoras, inicioMinutos] = horario.inicio
        .split(":")
        .map(Number);
      const [finHoras, finMinutos] = horario.fin.split(":").map(Number);
      let minutosActuales = inicioHoras * 60 + inicioMinutos;
      let minutosFinLaboral = finHoras * 60 + finMinutos;

      while (minutosActuales + 15 <= minutosFinLaboral) {
        // Verificar que el servicio completo (inicio + duración) no exceda el horario laboral
        if (minutosActuales + duracionServicio <= minutosFinLaboral) {
          intervalos.push(minutosActuales);
        }
        minutosActuales += 15;
      }
    }

    console.log("intervalos", intervalos);

    // Restar los intervalos que caen dentro de los descansos
    if (horario?.descanso) {
      horario.descanso.forEach((descanso) => {
        const [inicioDescansoHoras, inicioDescansoMinutos] = descanso.inicio
          .split(":")
          .map(Number);
        const [finDescansoHoras, finDescansoMinutos] = descanso.fin
          .split(":")
          .map(Number);

        const minutosInicioDescanso =
          inicioDescansoHoras * 60 + inicioDescansoMinutos;
        const minutosFinDescanso = finDescansoHoras * 60 + finDescansoMinutos;

        // Filtrar los intervalos que caen dentro del descanso
        intervalos = intervalos.filter(
          (minutos) =>
            minutos < minutosInicioDescanso || minutos >= minutosFinDescanso
        );
      });
    }

    /// Verificar los horarios ocupados y filtrar los intervalos disponibles
    citasReservadas?.forEach((reserva) => {
      const inicioReserva =
        new Date(reserva.fechaInicio).getHours() * 60 +
        new Date(reserva.fechaInicio).getMinutes();
      const finReserva =
        new Date(reserva.fechaFin).getHours() * 60 +
        new Date(reserva.fechaFin).getMinutes();

      intervalos = intervalos.filter(
        (minutos) =>
          minutos + duracionServicio <= inicioReserva || minutos >= finReserva
      );
    });

    // Convertir los intervalos disponibles a formato de horas y minutos
    const horariosDisponibles = intervalos.map((minutos) => {
      const horas = Math.floor(minutos / 60)
        .toString()
        .padStart(2, "0");
      const minutosStr = (minutos % 60).toString().padStart(2, "0");
      return `${horas}:${minutosStr}`;
    });

    res.json({
      resultado: horariosDisponibles,
      ocurrioError: false,
      mensaje: "exito",
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error, al obtener el horario, por favor intenta nuevamente o mas tarde"
    );
    next(error);
  }
};

export const guardarCita = async (req, res, next) => {
  try {
    const {
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
      fechaFin,
    } = req.body;

    let fechaInicioCompleta = null;
    let fechaFinal = null;

    if (!fechaFin) {
      // Combinar fechaInicio y hora para crear un objeto new Date
      const [hours, minutes] = hora.split(":");

      fechaInicioCompleta = new Date(`${fechaInicio}T${hora}`);

      // Calcular la fecha final sumando la duración del servicio (en minutos)
      fechaFinal = new Date(fechaInicioCompleta);
      fechaFinal.setMinutes(fechaFinal.getMinutes() + duracionServicio);
    } else {
      fechaInicioCompleta = new Date(fechaInicio);
      fechaFinal = new Date(fechaFin);
    }

    await ejecutarSP(SP_GUARDAR_CITA, [
      idServicio,
      idProveedor,
      fechaInicioCompleta,
      fechaFinal,
      nombreCliente,
      apellidoCliente,
      correoCliente,
      telefonoCliente,
      notasCLiente,
    ]);

    res.json({
      resultado: null,
      ocurrioError: false,
      mensaje: `Cita reservada exitosamente`,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error, por favor intenta mas tarde"
    );
    next(error);
  }
};

export const cancelarCita = async (req, res, next) => {
  const { idCita, nota } = req.body;

  try {
    await ejecutarSP(SP_CANCELAR_CITA, [idCita, nota]);

    res.json({
      resultado: null,
      ocurrioError: false,
      mensaje: `Cita cancelada exitosamente`,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(
      "Ha ocurrido un error, por favor intenta mas tarde"
    );
    next(error);
  }
};
