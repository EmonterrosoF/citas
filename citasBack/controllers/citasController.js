import {
  SP_CITAS_RESERVADAS,
  SP_CITAS_RESERVADAS_POR_FECHA,
  SP_GUARDAR_CITA,
  SP_HORARIO_LABORAL,
} from "../utils/sp.js";
import { ejecutarSP } from "../data/dbConexion.js";
const diasDeLaSemana = {
  0: "domingo",
  1: "lunes",
  2: "martes",
  3: "miercoles",
  4: "jueves",
  5: "viernes",
  6: "sabado",
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
      const fecha = new Date(fechaCita.fechaInicio).toLocaleDateString();
      console.log(fecha);
      let dia = new Date(fechaCita.fechaInicio).getUTCDay();
      dia = diasDeLaSemana[dia];
      console.log(dia);

      const horario = horarioLaboral[dia];

      const inicioHoras = new Date(fechaCita.fechaInicio).getUTCHours();
      const inicioMinutos = new Date(fechaCita.fechaInicio).getUTCMinutes();
      const finHoras = new Date(fechaCita.fechaFin).getUTCHours();
      const finMinutos = new Date(fechaCita.fechaFin).getUTCMinutes();

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
        console.log(duracionesPorDia[fecha], " ", duracionTotalLaboral);
        if (duracionesPorDia[fecha] >= duracionTotalLaboral) {
          console.log("duracion por dia", duracionesPorDia);
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
    console.log("ocurrio error0", err);
    const error = new Error(
      "Ha ocurrido un error, por favor intenta de nuevo o mas tarde"
    );
    next(error);
  }
};

export const getHorarioDisponiblePorFecha = async (req, res, next) => {
  try {
    let { fecha, idProveedor, duracionServicio } = req.query;

    console.log("query", fecha, idProveedor);
    const diaSemana = new Date(fecha).getUTCDay();
    console.log("fecha", diasDeLaSemana[diaSemana]);
    const citasReservadas = await ejecutarSP(SP_CITAS_RESERVADAS_POR_FECHA, [
      fecha,
      idProveedor,
    ]);
    console.log("CITAS RESERVADAS", citasReservadas);

    const resultado = await ejecutarSP(SP_HORARIO_LABORAL);
    const horarioLaboral = JSON.parse(resultado[0].valor);

    const dia = diasDeLaSemana[diaSemana];

    const horario = horarioLaboral[dia];

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

      while (minutosActuales + 15 <= finHoras * 60 + finMinutos) {
        intervalos.push(minutosActuales);
        minutosActuales += 15;
      }
    }

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
        new Date(reserva.fechaInicio).getUTCHours() * 60 +
        new Date(reserva.fechaInicio).getUTCMinutes();
      const finReserva =
        new Date(reserva.fechaFin).getUTCHours() * 60 +
        new Date(reserva.fechaFin).getUTCMinutes();

      console.log("inicio reserva", inicioReserva, "fin reserva", finReserva);
      console.log("intervalos antes", intervalos);

      intervalos = intervalos.filter(
        (minutos) =>
          minutos + duracionServicio <= inicioReserva || minutos >= finReserva
      );

      console.log("intervalos después", intervalos);
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
    } = req.body;

    // Combinar fechaInicio y hora para crear un objeto new Date
    const [hours, minutes] = hora.split(":");

    console.log(hours, minutes);
    const fechaInicioCompleta = new Date(`${fechaInicio}T${hora}Z`);
    console.log(fechaInicioCompleta);

    // Calcular la fecha final sumando la duración del servicio (en minutos)
    const fechaFinal = new Date(fechaInicioCompleta);
    fechaFinal.setMinutes(fechaFinal.getMinutes() + duracionServicio);

    const data = {
      idServicio,
      duracionServicio,
      idProveedor,
      fechaInicio: fechaInicioCompleta,
      fechaFinal: fechaFinal,
      nombreCliente,
      apellidoCliente,
      correoCliente,
      telefonoCliente,
      notasCLiente,
    };

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
