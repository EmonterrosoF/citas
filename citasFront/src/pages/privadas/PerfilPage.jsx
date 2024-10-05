import { Card, CardBody, Skeleton } from "@nextui-org/react";
import FormPerfil from "../../components/formPerfil";
import { useEffect, useState } from "react";
import { obtenerUsuario } from "../../services/usuarios";
import { toast, ToastContainer } from "react-toastify";

export function PerfilPage() {
  const [usuario, setUsuario] = useState({});
  const [isLoading, setIsLoding] = useState(true);

  async function getUsuario() {
    setIsLoding(true);
    const data = await obtenerUsuario();

    if (!data.ocurrioError) {
      setUsuario(data.resultado);
      setIsLoding(false);
      return;
    }
    setIsLoding(false);
    toast.error(data.mensaje);
  }

  useEffect(() => {
    getUsuario();
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
            <FormPerfil usuario={usuario} getUsuario={getUsuario} />
          )}
        </CardBody>
      </Card>
    </div>
  );
}
