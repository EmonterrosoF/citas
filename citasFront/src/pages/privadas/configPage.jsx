import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import { obtenerHorarioLaboral } from "../../services/configuraciones";
import FormConfig from "../../components/formConfig";

export default function ConfigPage() {
  const [horario, setHorario] = useState({});
  const [isLoading, setIsLoding] = useState(true);

  async function getHorarioLaboral() {
    setIsLoding(true);
    const data = await obtenerHorarioLaboral();

    if (!data.ocurrioError) {
      console.log(data.resultado);
      setHorario(data.resultado);
      setIsLoding(false);
      return;
    }
    setIsLoding(false);
    toast.error(data.mensaje);
  }

  useEffect(() => {
    getHorarioLaboral();
  }, []);
  return (
    <div>
      <ToastContainer />
      <Card className="mx-auto max-w-3xl">
        <CardBody>
          {isLoading ? (
            <>
              <div
                style={{ padding: "0.75rem 0 0 0" }}
                className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
              >
                <Skeleton className="w-3/5 h-14"></Skeleton>
                <Skeleton className="w-3/5 rounded-lg"></Skeleton>
              </div>
              <div
                style={{ padding: "0.75rem 0 0 0" }}
                className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
              >
                <Skeleton className="w-3/5 h-14"></Skeleton>
                <Skeleton className="w-3/5 rounded-lg"></Skeleton>
              </div>
              <div
                style={{ padding: "0.75rem 0 0 0" }}
                className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
              >
                <Skeleton className="w-3/5 h-14"></Skeleton>
                <Skeleton className="w-3/5 rounded-lg"></Skeleton>
              </div>
              <Skeleton className="w-full h-14 rounded-lg my-4"></Skeleton>
            </>
          ) : (
            <FormConfig
              horario={horario}
              getHorarioLaboral={getHorarioLaboral}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
