/* eslint-disable react/prop-types */
import {
  CheckboxGroup,
  Button,
  Checkbox,
  Card,
  CardBody,
  TimeInput,
} from "@nextui-org/react";

import { Time } from "@internationalized/date";

import { useState } from "react";

import { toast } from "react-toastify";
import { guardarHorarioLaboral } from "../services/configuraciones";

function formatTime(time) {
  let [hours, minutes] = time.split(":");
  hours = hours.padStart(2, "0"); // Asegura que las horas tengan dos dígitos
  minutes = minutes.padStart(2, "0"); // Asegura que los minutos tengan dos dígitos
  return `${hours}:${minutes}`;
}

export default function FormConfig({ horario, getHorarioLaboral }) {
  //domingo
  const [isCheckedDomingo, setIsCheckedDomingo] = useState(
    horario?.domingo ? "domingo" : ""
  );
  const [isCheckedDomingoDescanso, setIsCheckeddDomingoDescanso] = useState(
    horario?.domingo?.descanso?.length > 0 ? "domingoDescanso" : ""
  );

  const [domingoInicio, setDomingoInicio] = useState(() => {
    const tiempo = horario?.domingo?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledDomingoInicio, setIsDisabledDomingoInicio] = useState(
    !horario?.domingo?.inicio
  );

  const [domingoFin, setDomingoFin] = useState(() => {
    const tiempo = horario?.domingo?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledDomingoFin, setIsDisabledDomingoFin] = useState(
    !horario?.domingo?.fin
  );

  const [domingoDescansoInicio, setDomingoDescansoInicio] = useState(() => {
    const tiempo = horario?.domingo?.descanso[0]?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledDomingoDescansoInicio, setIsDisabledDomingoDescansoInicio] =
    useState(!horario?.domingo?.descanso[0]?.inicio);

  const [domingoDescansoFin, setDomingoDescansoFin] = useState(() => {
    const tiempo = horario?.domingo?.descanso[0]?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledDomingoDescansoFin, setIsdisabledDomingoDescansoFin] =
    useState(!horario?.domingo?.descanso[0]?.fin);

  //   lunes
  const [isCheckedLunes, setIsCheckedLunes] = useState(
    horario?.lunes ? "lunes" : ""
  );
  const [isCheckedLunesDescanso, setIsCheckedLunesDescanso] = useState(
    horario?.lunes?.descanso?.length > 0 ? "lunesDescanso" : ""
  );

  const [lunesInicio, setLunesInicio] = useState(() => {
    const tiempo = horario?.lunes?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledLunesInicio, setIsDisabledLunesInicio] = useState(
    !horario?.lunes?.inicio
  );

  const [lunesFin, setLunesFin] = useState(() => {
    const tiempo = horario?.lunes?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledLunesFin, setIsDisabledLunesFin] = useState(
    !horario?.lunes?.fin
  );

  const [lunesDescansoInicio, setLunesDescansoInicio] = useState(() => {
    const tiempo = horario?.lunes?.descanso[0]?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledLunesDescansoInicio, setIsDisabledLunesDescansoInicio] =
    useState(!horario?.lunes?.descanso[0]?.inicio);

  const [lunesDescansoFin, setLunesDescansoFin] = useState(() => {
    const tiempo = horario?.lunes?.descanso[0]?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledLunesDescansoFin, setIsDisabledLunesDescansoFin] = useState(
    !horario?.lunes?.descanso[0]?.fin
  );

  //   martes
  const [isCheckedMartes, setIsCheckedMartes] = useState(
    horario?.martes ? "martes" : ""
  );
  const [isCheckedMartesDescanso, setIsCheckedMartesDescanso] = useState(
    horario?.martes?.descanso?.length > 0 ? "martesDescanso" : ""
  );

  const [martesInicio, setMartesInicio] = useState(() => {
    const tiempo = horario?.martes?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledMartesInicio, setIsDisabledMartesInicio] = useState(
    !horario?.martes?.inicio
  );

  const [martesFin, setMartesFin] = useState(() => {
    const tiempo = horario?.martes?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledMartesFin, setIsDisabledMartesFin] = useState(
    !horario?.martes?.fin
  );

  const [martesDescansoInicio, setMartesDescansoInicio] = useState(() => {
    const tiempo = horario?.martes?.descanso[0]?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledMartesDescansoInicio, setIsDisabledMartesDescansoInicio] =
    useState(!horario?.martes?.descanso[0]?.inicio);
  const [martesDescansoFin, setMartesDescansoFin] = useState(() => {
    const tiempo = horario?.martes?.descanso[0]?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledMartesDescansoFin, setIsDisabledMartesDescansoFin] =
    useState(!horario?.martes?.descanso[0]?.fin);

  //   miercoles
  const [isCheckedMiercoles, setIsCheckedMiercoles] = useState(
    horario?.miercoles ? "miercoles" : ""
  );
  const [isCheckedMiercolesDescanso, setIsCheckedMiercolesDescanso] = useState(
    horario?.miercoles?.descanso?.length > 0 ? "miercolesDescanso" : ""
  );

  const [miercolesInicio, setMiercolesInicio] = useState(() => {
    const tiempo = horario?.miercoles?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledMiercolesInicio, setIsDisabledMiercolesInicio] = useState(
    !horario?.miercoles?.inicio
  );
  const [miercolesFin, setMiercolesFin] = useState(() => {
    const tiempo = horario?.miercoles?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });

  const [isDisabledMiercolesFin, setIsDisabledMiercolesFin] = useState(
    !horario?.miercoles?.fin
  );

  const [miercolesDescansoInicio, setMiercolesDescansoInicio] = useState(() => {
    const tiempo = horario?.miercoles?.descanso[0]?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [
    isDisabledMiercolesDescansoInicio,
    setIsDisabledMiercolesDescansoInicio,
  ] = useState(!horario?.miercoles?.descanso[0]?.inicio);

  const [miercolesDescansoFin, setMiercolesDescansoFin] = useState(() => {
    const tiempo = horario?.miercoles?.descanso[0]?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });

  const [isDisabledMiercolesDescansoFin, setIsDisabledMiercolesDescansoFin] =
    useState(!horario?.miercoles?.descanso[0]?.fin);

  //   jueves
  const [isCheckedJueves, setIsCheckedJueves] = useState(
    horario?.jueves ? "jueves" : ""
  );
  const [isCheckedJuevesDescanso, setIsCheckedJuevesDescanso] = useState(
    horario?.jueves?.descanso?.length > 0 ? "juevesDescanso" : ""
  );

  const [juevesInicio, setJuevesInicio] = useState(() => {
    const tiempo = horario?.jueves?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });

  const [isDisabledJuevesInicio, setIsDisabledJuevesInicio] = useState(
    !horario?.jueves?.inicio
  );
  const [juevesFin, setJuevesFin] = useState(() => {
    const tiempo = horario?.jueves?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledJuevesFin, setIsDisabledJuevesFin] = useState(
    !horario?.jueves?.fin
  );

  const [juevesDescansoInicio, setJuevesDescansoInicio] = useState(() => {
    const tiempo = horario?.jueves?.descanso[0]?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledJuevesDescansoInicio, setIsDisabledJuevesDescansoInicio] =
    useState(!horario?.jueves?.descanso[0]?.inicio);

  const [juevesDescansoFin, setJuevesDescansoFin] = useState(() => {
    const tiempo = horario?.jueves?.descanso[0]?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledJuevesDescansoFin, setIsDisabledJuevesDescansoFin] =
    useState(!horario?.jueves?.descanso[0]?.fin);

  //   viernes
  const [isCheckedViernes, setIsCheckedViernes] = useState(
    horario?.viernes ? "viernes" : ""
  );
  const [isCheckedViernesDescanso, setIsCheckedViernesDescanso] = useState(
    horario?.viernes?.descanso?.length > 0 ? "viernesDescanso" : ""
  );

  const [viernesInicio, setViernesInicio] = useState(() => {
    const tiempo = horario?.viernes?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledViernesInicio, setIsDisabledViernesInicio] = useState(
    !horario?.viernes?.inicio
  );

  const [viernesFin, setViernesFin] = useState(() => {
    const tiempo = horario?.viernes?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledViernesFin, setIsDisableldViernesFin] = useState(
    !horario?.viernes?.fin
  );

  const [viernesDescansoInicio, setViernesDescansoInicio] = useState(() => {
    const tiempo = horario?.viernes?.descanso[0]?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledViernesDescansoInicio, setIsDisabledViernesDescansoInicio] =
    useState(!horario?.viernes?.descanso[0]?.inicio);

  const [viernesDescansoFin, setViernesDescansoFin] = useState(() => {
    const tiempo = horario?.viernes?.descanso[0]?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });

  const [isDisabledViernesDescansoFin, setIsDisabledViernesDescansoFin] =
    useState(!horario?.viernes?.descanso[0]?.fin);

  //   sabado
  const [isCheckedSabado, setIsCheckedSabado] = useState(
    horario?.sabado ? "sabado" : ""
  );
  const [isCheckedSabadoDescanso, setIsCheckedSabadoDescanso] = useState(
    horario?.sabado?.descanso?.length > 0 ? "sabadoDescanso" : ""
  );

  const [sabadoInicio, setSabadoInicio] = useState(() => {
    const tiempo = horario?.sabado?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledSabadoInicio, setIsDisabledSabadoInicio] = useState(
    !horario?.sabado?.inicio
  );

  const [sabadoFin, setSabadoFin] = useState(() => {
    const tiempo = horario?.sabado?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledSabadoFin, setIsDisabledSabadoFin] = useState(
    !horario?.sabado?.fin
  );

  const [sabadoDescansoInicio, setSabadoDescansoInicio] = useState(() => {
    const tiempo = horario?.sabado?.descanso[0]?.inicio || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledSabadoDescansoInicio, setIsDisabledSabadoDescansoInicio] =
    useState(!horario?.sabado?.descanso[0]?.inicio);

  const [sabadoDescansoFin, setSabadoDescansoFin] = useState(() => {
    const tiempo = horario?.sabado?.descanso[0]?.fin || "00:00";
    const [horas, minutos] = tiempo.split(":").map(Number);
    return `${horas}:${minutos}`;
  });
  const [isDisabledSabadoDescansoFin, setIsDisabledSabadoDescansoFin] =
    useState(!horario?.sabado?.descanso[0]?.fin);

  // dias checkeados
  const [diasChecked, setDiasChecked] = useState([
    isCheckedDomingo,
    isCheckedDomingoDescanso,
    isCheckedLunes,
    isCheckedLunesDescanso,
    isCheckedMartes,
    isCheckedMartesDescanso,
    isCheckedMiercoles,
    isCheckedMiercolesDescanso,
    isCheckedJueves,
    isCheckedJuevesDescanso,
    isCheckedViernes,
    isCheckedViernesDescanso,
    isCheckedSabado,
    isCheckedSabadoDescanso,
  ]);

  const [isLoadingSubmit, setisLoadingSubmit] = useState(false);

  //   domingo
  const changeDomingoInicio = (valor) => {
    setDomingoInicio(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeDomingoFin = (valor) => {
    setDomingoFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeDomingoDescansoInicio = (valor) => {
    setDomingoDescansoInicio(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };
  const changeDomingoDescansoFin = (valor) => {
    setDomingoDescansoFin(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };

  //   lunes
  const changeLunesInicio = (valor) => {
    setLunesInicio(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeLunesFin = (valor) => {
    setLunesFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeLunesDescansoInicio = (valor) => {
    setLunesDescansoInicio(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };
  const changeLunesDescansoFin = (valor) => {
    setLunesDescansoFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };

  //   martes
  const changeMartesInicio = (valor) => {
    setMartesInicio(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeMartesFin = (valor) => {
    setMartesFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeMartesDescansoInicio = (valor) => {
    setMartesDescansoInicio(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };
  const changeMartesDescansoFin = (valor) => {
    setMartesDescansoFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };

  //   miercoles
  const changeMiercolesInicio = (valor) => {
    setMiercolesInicio(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeMiercolesFin = (valor) => {
    setMiercolesFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeMiercolesDescansoInicio = (valor) => {
    setMiercolesDescansoInicio(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };
  const changeMiercolesDescansoFin = (valor) => {
    setMiercolesDescansoFin(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };

  //   jueves
  const changeJuevesInicio = (valor) => {
    setJuevesInicio(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeJuevesFin = (valor) => {
    setJuevesFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeJuevesDescansoInicio = (valor) => {
    setJuevesDescansoInicio(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };
  const changeJuevesDescansoFin = (valor) => {
    setJuevesDescansoFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };

  //   viernes
  const changeViernesInicio = (valor) => {
    setViernesInicio(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeViernesFin = (valor) => {
    setViernesFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeViernesDescansoInicio = (valor) => {
    setViernesDescansoInicio(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };
  const changeViernesDescansoFin = (valor) => {
    setViernesDescansoFin(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };

  //   sabado
  const changeSabadoInicio = (valor) => {
    setSabadoInicio(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeSabadoFin = (valor) => {
    setSabadoFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };
  const changeSabadoDescansoInicio = (valor) => {
    setSabadoDescansoInicio(
      `${valor.hour.toString()}:${valor.minute.toString()}`
    );
  };
  const changeSabadoDescansoFin = (valor) => {
    setSabadoDescansoFin(`${valor.hour.toString()}:${valor.minute.toString()}`);
  };

  const changeValueCheck = (dias) => {
    setDiasChecked(dias);
    setIsCheckedDomingo("");
    setIsCheckeddDomingoDescanso("");
    setIsDisabledDomingoInicio(true);
    setIsDisabledDomingoFin(true);
    setIsDisabledDomingoDescansoInicio(true);
    setIsdisabledDomingoDescansoFin(true);

    setIsCheckedLunes("");
    setIsCheckedLunesDescanso("");
    setIsDisabledLunesInicio(true);
    setIsDisabledLunesFin(true);
    setIsDisabledLunesDescansoInicio(true);
    setIsDisabledLunesDescansoFin(true);

    setIsCheckedMartes("");
    setIsCheckedMartesDescanso("");
    setIsDisabledMartesInicio(true);
    setIsDisabledMartesFin(true);
    setIsDisabledMartesDescansoInicio(true);
    setIsDisabledMartesDescansoFin(true);

    setIsCheckedMiercoles("");
    setIsCheckedMiercolesDescanso("");
    setIsDisabledMiercolesInicio(true);
    setIsDisabledMiercolesFin(true);
    setIsDisabledMiercolesDescansoInicio(true);
    setIsDisabledMiercolesDescansoFin(true);

    setIsCheckedJueves("");
    setIsCheckedJuevesDescanso("");
    setIsDisabledJuevesInicio(true);
    setIsDisabledJuevesFin(true);
    setIsDisabledJuevesDescansoInicio(true);
    setIsDisabledJuevesDescansoFin(true);

    setIsCheckedViernes("");
    setIsCheckedViernesDescanso("");
    setIsDisabledViernesInicio(true);
    setIsDisableldViernesFin(true);
    setIsDisabledViernesDescansoInicio(true);
    setIsDisabledViernesDescansoFin(true);

    setIsCheckedSabado("");
    setIsCheckedSabadoDescanso("");
    setIsDisabledSabadoInicio(true);
    setIsDisabledSabadoFin(true);
    setIsDisabledSabadoDescansoInicio(true);
    setIsDisabledSabadoDescansoFin(true);

    dias.forEach((dia) => {
      switch (dia) {
        case "domingo":
          setIsDisabledDomingoInicio(false);
          setIsDisabledDomingoFin(false);
          break;
        case "domingoDescanso":
          if (!dias.some((dia) => dia === "domingo")) return;

          setIsDisabledDomingoDescansoInicio(false);
          setIsdisabledDomingoDescansoFin(false);

          break;
        case "lunes":
          setIsDisabledLunesInicio(false);
          setIsDisabledLunesFin(false);
          break;
        case "lunesDescanso":
          if (!dias.some((dia) => dia === "lunes")) return;

          setIsDisabledLunesDescansoInicio(false);
          setIsDisabledLunesDescansoFin(false);
          break;
        case "martes":
          setIsDisabledMartesInicio(false);
          setIsDisabledMartesFin(false);
          break;
        case "martesDescanso":
          if (!dias.some((dia) => dia === "martes")) return;

          setIsDisabledMartesDescansoInicio(false);
          setIsDisabledMartesDescansoFin(false);
          break;
        case "miercoles":
          setIsDisabledMiercolesInicio(false);
          setIsDisabledMiercolesFin(false);
          break;
        case "miercolesDescanso":
          if (!dias.some((dia) => dia === "miercoles")) return;

          setIsDisabledMiercolesDescansoInicio(false);
          setIsDisabledMiercolesDescansoFin(false);
          break;
        case "jueves":
          setIsDisabledJuevesInicio(false);
          setIsDisabledJuevesFin(false);
          break;
        case "juevesDescanso":
          if (!dias.some((dia) => dia === "jueves")) return;

          setIsDisabledJuevesDescansoInicio(false);
          setIsDisabledJuevesDescansoFin(false);
          break;
        case "viernes":
          setIsDisabledViernesInicio(false);
          setIsDisableldViernesFin(false);
          break;
        case "viernesDescanso":
          if (!dias.some((dia) => dia === "viernes")) return;

          setIsDisabledViernesDescansoInicio(false);
          setIsDisabledViernesDescansoFin(false);
          break;
        case "sabado":
          setIsDisabledSabadoInicio(false);
          setIsDisabledSabadoFin(false);
          break;
        case "sabadoDescanso":
          if (!dias.some((dia) => dia === "sabado")) return;

          setIsDisabledSabadoDescansoInicio(false);
          setIsDisabledSabadoDescansoFin(false);
          break;
        default:
          break;
      }
    });
  };

  const onSubmitUsuario = async (e) => {
    e.preventDefault();

    setisLoadingSubmit(true);

    let dataDias = {
      domingo: null,
      lunes: null,
      martes: null,
      miercoles: null,
      jueves: null,
      viernes: null,
      sabado: null,
    };

    const existeErrores = [];

    // Función para validar los rangos de hora (inicio < fin y diferencia de al menos 1 hora)
    const validarRango = (
      inicio,
      fin,
      dia,
      diferenciaMinima = 1,
      tipo = "horario laboral"
    ) => {
      const inicioHora = new Date(`1970-01-01T${formatTime(inicio)}:00`);
      const finHora = new Date(`1970-01-01T${formatTime(fin)}:00`);
      const diffHoras = (finHora - inicioHora) / (1000 * 60 * 60); // Diferencia en horas

      if (inicioHora >= finHora) {
        toast.error(
          `La hora de inicio (${formatTime(
            inicio
          )}) debe ser menor que la hora de fin (${formatTime(
            fin
          )}) del dia ${dia} del ${tipo}`
        );
        existeErrores.push(true);
        return false;
      }

      if (diffHoras < diferenciaMinima) {
        toast.error(
          `El rango entre inicio (${formatTime(inicio)}) y fin (${formatTime(
            fin
          )}) debe ser de al menos ${
            diferenciaMinima * 60
          } minutos del dia ${dia} del ${tipo}`
        );
        existeErrores.push(true);
        return false;
      }

      existeErrores.push(false);

      return true;
    };

    // Función para agregar un día si no existe
    const agregarDia = (dia, inicio, fin) => {
      if (!validarRango(inicio, fin, dia)) return; // Si no pasa la validación, salir
      if (!dataDias[dia]) {
        dataDias[dia] = {
          inicio: formatTime(inicio),
          fin: formatTime(fin),
          descanso: [],
        };
        return;
      }
      dataDias[dia].inicio = formatTime(inicio);
      dataDias[dia].fin = formatTime(fin);
    };

    // Función para agregar un descanso a un día
    const agregarDescanso = (dia, descansoInicio, descansoFin) => {
      if (
        !validarRango(
          descansoInicio,
          descansoFin,
          dia,
          0.5,
          "periodo de descanso"
        )
      )
        return; // Validar descanso
      if (!dataDias[dia]) {
        dataDias[dia] = {
          inicio: null,
          fin: null,
          descanso: [
            {
              inicio: formatTime(descansoInicio),
              fin: formatTime(descansoFin),
            },
          ],
        };
        return;
      }
      dataDias[dia].descanso.push({
        inicio: formatTime(descansoInicio),
        fin: formatTime(descansoFin),
      });
    };

    // Iterar sobre los días seleccionados
    diasChecked.forEach((dia) => {
      switch (dia) {
        case "domingo":
          agregarDia("domingo", domingoInicio, domingoFin);
          break;
        case "domingoDescanso":
          if (!diasChecked.some((dia) => dia === "domingo")) return;

          agregarDescanso("domingo", domingoDescansoInicio, domingoDescansoFin);
          break;
        case "lunes":
          agregarDia("lunes", lunesInicio, lunesFin);
          break;
        case "lunesDescanso":
          if (!diasChecked.some((dia) => dia === "lunes")) return;

          agregarDescanso("lunes", lunesDescansoInicio, lunesDescansoFin);
          break;
        case "martes":
          agregarDia("martes", martesInicio, martesFin);
          break;
        case "martesDescanso":
          if (!diasChecked.some((dia) => dia === "martes")) return;

          agregarDescanso("martes", martesDescansoInicio, martesDescansoFin);
          break;
        case "miercoles":
          agregarDia("miercoles", miercolesInicio, miercolesFin);
          break;
        case "miercolesDescanso":
          if (!diasChecked.some((dia) => dia === "miercoles")) return;

          agregarDescanso(
            "miercoles",
            miercolesDescansoInicio,
            miercolesDescansoFin
          );
          break;
        case "jueves":
          agregarDia("jueves", juevesInicio, juevesFin);
          break;
        case "juevesDescanso":
          if (!diasChecked.some((dia) => dia === "jueves")) return;

          agregarDescanso("jueves", juevesDescansoInicio, juevesDescansoFin);
          break;
        case "viernes":
          agregarDia("viernes", viernesInicio, viernesFin);
          break;
        case "viernesDescanso":
          if (!diasChecked.some((dia) => dia === "viernes")) return;

          agregarDescanso("viernes", viernesDescansoInicio, viernesDescansoFin);
          break;
        case "sabado":
          agregarDia("sabado", sabadoInicio, sabadoFin);
          break;
        case "sabadoDescanso":
          if (!diasChecked.some((dia) => dia === "sabado")) return;

          agregarDescanso("sabado", sabadoDescansoInicio, sabadoDescansoFin);
          break;
        default:
          break;
      }
    });

    const existeError = existeErrores.some((error) => error);

    if (!existeError) {
      const data = await toast.promise(guardarHorarioLaboral(dataDias), {
        pending: "Cargando...",
      });
      if (!data.ocurrioError) {
        getHorarioLaboral();
        toast.success(data.mensaje);
      } else {
        toast.error(data.mensaje);
      }
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
        Configuracion del horario laboral
      </h4>

      <CheckboxGroup
        defaultValue={diasChecked}
        onValueChange={changeValueCheck}
        label="Seleccionar horario laboral"
      >
        <Card>
          <CardBody>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="domingo">
                Domingo
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(domingoInicio.split(":")[0]),
                    Number(domingoInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledDomingoInicio}
                onChange={changeDomingoInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(domingoFin.split(":")[0]),
                    Number(domingoFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledDomingoFin}
                onChange={changeDomingoFin}
              />
            </div>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="domingoDescanso">
                Periodo descanso
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(domingoDescansoInicio.split(":")[0]),
                    Number(domingoDescansoInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledDomingoDescansoInicio}
                onChange={changeDomingoDescansoInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(domingoDescansoFin.split(":")[0]),
                    Number(domingoDescansoFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledDomingoDescansoFin}
                onChange={changeDomingoDescansoFin}
              />
            </div>
          </CardBody>
        </Card>
        {/* lunes */}
        <Card>
          <CardBody>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="lunes">
                Lunes
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(lunesInicio.split(":")[0]),
                    Number(lunesInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledLunesInicio}
                onChange={changeLunesInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(lunesFin.split(":")[0]),
                    Number(lunesFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledLunesFin}
                onChange={changeLunesFin}
              />
            </div>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="lunesDescanso">
                Periodo descanso
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(lunesDescansoInicio.split(":")[0]),
                    Number(lunesDescansoInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledLunesDescansoInicio}
                onChange={changeLunesDescansoInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(lunesDescansoFin.split(":")[0]),
                    Number(lunesDescansoFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledLunesDescansoFin}
                onChange={changeLunesDescansoFin}
              />
            </div>
          </CardBody>
        </Card>
        {/* martes */}
        <Card>
          <CardBody>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="martes">
                Martes
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(martesInicio.split(":")[0]),
                    Number(martesInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledMartesInicio}
                onChange={changeMartesInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(martesFin.split(":")[0]),
                    Number(martesFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledMartesFin}
                onChange={changeMartesFin}
              />
            </div>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="martesDescanso">
                Periodo descanso
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(martesDescansoInicio.split(":")[0]),
                    Number(martesDescansoInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledMartesDescansoInicio}
                onChange={changeMartesDescansoInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(martesDescansoFin.split(":")[0]),
                    Number(martesDescansoFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledMartesDescansoFin}
                onChange={changeMartesDescansoFin}
              />
            </div>
          </CardBody>
        </Card>
        {/* miercoles */}
        <Card>
          <CardBody>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="miercoles">
                Miercoles
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(miercolesInicio.split(":")[0]),
                    Number(miercolesInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledMiercolesInicio}
                onChange={changeMiercolesInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(miercolesFin.split(":")[0]),
                    Number(miercolesFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledMiercolesFin}
                onChange={changeMiercolesFin}
              />
            </div>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="miercolesDescanso">
                Periodo descanso
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(miercolesDescansoInicio.split(":")[0]),
                    Number(miercolesDescansoInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledMiercolesDescansoInicio}
                onChange={changeMiercolesDescansoInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(miercolesDescansoFin.split(":")[0]),
                    Number(miercolesDescansoFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledMiercolesDescansoFin}
                onChange={changeMiercolesDescansoFin}
              />
            </div>
          </CardBody>
        </Card>
        {/* jueves */}
        <Card>
          <CardBody>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="jueves">
                Jueves
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(juevesInicio.split(":")[0]),
                    Number(juevesInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledJuevesInicio}
                onChange={changeJuevesInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(juevesFin.split(":")[0]),
                    Number(juevesFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledJuevesFin}
                onChange={changeJuevesFin}
              />
            </div>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="juevesDescanso">
                Periodo descanso
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(juevesDescansoInicio.split(":")[0]),
                    Number(juevesDescansoInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledJuevesDescansoInicio}
                onChange={changeJuevesDescansoInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(juevesDescansoFin.split(":")[0]),
                    Number(juevesDescansoFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledJuevesDescansoFin}
                onChange={changeJuevesDescansoFin}
              />
            </div>
          </CardBody>
        </Card>
        {/* viernes */}
        <Card>
          <CardBody>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="viernes">
                Viernes
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(viernesInicio.split(":")[0]),
                    Number(viernesInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledViernesInicio}
                onChange={changeViernesInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(viernesFin.split(":")[0]),
                    Number(viernesFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledViernesFin}
                onChange={changeViernesFin}
              />
            </div>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="viernesDescanso">
                Periodo descanso
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(viernesDescansoInicio.split(":")[0]),
                    Number(viernesDescansoInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledViernesDescansoInicio}
                onChange={changeViernesDescansoInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(viernesDescansoFin.split(":")[0]),
                    Number(viernesDescansoFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledViernesDescansoFin}
                onChange={changeViernesDescansoFin}
              />
            </div>
          </CardBody>
        </Card>
        {/* sabado */}
        <Card>
          <CardBody>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="sabado">
                Sabado
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(sabadoInicio.split(":")[0]),
                    Number(sabadoInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledSabadoInicio}
                onChange={changeSabadoInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(sabadoFin.split(":")[0]),
                    Number(sabadoFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledSabadoFin}
                onChange={changeSabadoFin}
              />
            </div>
            <div
              style={{ padding: "0.75rem 0 0 0" }}
              className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
            >
              <Checkbox className="min-w-28" value="sabadoDescanso">
                Periodo descanso
              </Checkbox>
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(sabadoDescansoInicio.split(":")[0]),
                    Number(sabadoDescansoInicio.split(":")[1])
                  )
                }
                isRequired
                label="Inicio"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledSabadoDescansoInicio}
                onChange={changeSabadoDescansoInicio}
              />
              <TimeInput
                hourCycle={24}
                description={"formato en 24 hrs"}
                value={
                  new Time(
                    Number(sabadoDescansoFin.split(":")[0]),
                    Number(sabadoDescansoFin.split(":")[1])
                  )
                }
                isRequired
                label="Fin"
                placeholder="0:00"
                type="text"
                className="min-w-60"
                isDisabled={isDisabledSabadoDescansoFin}
                onChange={changeSabadoDescansoFin}
              />
            </div>
          </CardBody>
        </Card>
      </CheckboxGroup>

      <Button
        style={{ marginBottom: "10px" }}
        className={`py-6`}
        isDisabled={isLoadingSubmit}
        color="primary"
        type="submit"
      >
        Guardar horario laboral
      </Button>
    </form>
  );
}
