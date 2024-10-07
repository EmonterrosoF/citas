import { Input, Button, Card, CardBody, Image } from "@nextui-org/react";

import Logo from "../../assets/logo.png";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { recuperarUsuario } from "../../services/usuarios";

import { Link } from "react-router-dom";

export default function RecuperarPage() {
  const [isLoadingSubmit, setisLoadingSubmit] = useState();

  const [correo, setCorreo] = useState("");
  const [esCorreoinvalido, setEsCorreoinvalido] = useState(false);
  const [correoMensajeError, setCorreoMensajeError] = useState(null);

  const [usuario, setUsuario] = useState("");
  const [esUsuarioinvalido, setEsUsuarioinvalido] = useState(false);
  const [usuarioMensajeError, setusUarioMensajeError] = useState(null);

  const changeUsuario = (valor) => {
    if (valor.length > 40) return (valor = usuario);
    setUsuario(valor);
    if (!valor) {
      setEsUsuarioinvalido(true);
      setusUarioMensajeError("Usuario es requerido");
      return;
    }
    setEsUsuarioinvalido(false);
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

  const onSubmitRecuperar = async (e) => {
    e.preventDefault();
    setisLoadingSubmit(true);

    const data = await toast.promise(recuperarUsuario(correo, usuario), {
      pending: "Cargando...",
    });

    if (!data.ocurrioError) {
      toast.success(data.mensaje);
    } else {
      toast.error(data.mensaje);
    }

    setisLoadingSubmit(false);
  };

  return (
    <div className="flex flex-col w-full">
      <ToastContainer />
      <Card className="mx-auto my-20  py-14 px-5">
        <CardBody className="items-center">
          <Image isZoomed isBlurred width={100} src={Logo} />
          <form
            onSubmit={onSubmitRecuperar}
            className="flex flex-col gap-4 py-5"
          >
            <Input
              className="min-w-60 w-[450px]"
              isRequired
              label="correo"
              placeholder="Ingresa tu correo"
              type="text"
              value={correo}
              errorMessage={correoMensajeError}
              isInvalid={esCorreoinvalido}
              onValueChange={changeCorreo}
            />
            <Input
              className="min-w-60 w-[450px]"
              isRequired
              label="Usuario"
              placeholder="Ingresa tu usuario"
              type="text"
              value={usuario}
              errorMessage={usuarioMensajeError}
              isInvalid={esUsuarioinvalido}
              onValueChange={changeUsuario}
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="submit"
                fullWidth
                color="primary"
                isDisabled={
                  !usuario ||
                  esUsuarioinvalido ||
                  !correo ||
                  esCorreoinvalido ||
                  isLoadingSubmit
                }
              >
                Recuparar usuario
              </Button>
            </div>
            <div className="flex gap-2 justify-end">
              <Link
                to={"/login"}
                className="bg-purple-600 w-full text-center py-2 rounded-lg text-white text-sm"
              >
                Regresar al inicio de sesión
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
