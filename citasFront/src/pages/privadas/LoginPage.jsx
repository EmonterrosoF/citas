import {
  Input,
  Button,
  Card,
  CardBody,
  Image,
  CardHeader,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";

import { toast, ToastContainer } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/logo.png";
import { useState } from "react";
import { autenticar, preAutenticar } from "../../services/auth";

import PinField from "react-pin-field";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [esUsernameInvalido, setEsUsernameInvalido] = useState(false);
  const [usernameMensajeError, setUsernameMensajeError] = useState(null);

  const [password, setPassword] = useState("");
  const [esPasswordInvalido, setEsPasswordInvalido] = useState(false);
  const [passwordMensajeError, setPasswordMensajeError] = useState(null);

  const [isLoadingSubmit, setisLoadingSubmit] = useState(false);

  // para mostrar modal
  const [isOpenConfirmacion, setIsOpenConfirmacion] = useState(false);

  const [token, setToken] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);

  const navigate = useNavigate();

  const changeUsername = (valor) => {
    if (valor.length > 40) return (valor = username);

    setUsername(valor);

    if (!valor) {
      setEsUsernameInvalido(true);
      setUsernameMensajeError("El nombre de usuario es requerido");
      return;
    }
    setEsUsernameInvalido(false);
  };

  const changePassword = (valor) => {
    if (valor.length > 40) return (valor = password);

    setPassword(valor);

    if (!valor) {
      setEsPasswordInvalido(true);
      setPasswordMensajeError("La contraseña es requerido");
      return;
    }

    setEsPasswordInvalido(false);
  };

  const onSubmitPreLogin = async (e) => {
    e.preventDefault();
    setisLoadingSubmit(true);

    const data = await toast.promise(
      preAutenticar(username, password),

      {
        pending: "Cargando...",
      }
    );

    if (!data.ocurrioError) {
      toast.success(data.mensaje);
      setIsOpenConfirmacion(true);
    } else {
      toast.error(data.mensaje);
    }

    setisLoadingSubmit(false);
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setisLoadingSubmit(true);
    const data = await toast.promise(
      autenticar(username, password, token),

      {
        pending: "Cargando...",
      }
    );

    if (!data.ocurrioError) {
      navigate("/panel");
    } else {
      toast.error(data.mensaje);
    }

    setisLoadingSubmit(false);
  };

  return (
    <div className="flex flex-col w-full">
      <ToastContainer />
      <Card className="mx-auto my-20  py-14 px-5">
        <CardHeader>
          <h4 className="font-bold text-large max-w-96 text-center mx-auto">
            ¡Bienvenido! Usted deberá iniciar sesión para ingresar al sistema.
          </h4>
        </CardHeader>
        <CardBody className="items-center">
          <Image isZoomed isBlurred width={100} src={Logo} />
          <form
            onSubmit={onSubmitPreLogin}
            className="flex flex-col gap-4 py-5"
          >
            <Input
              className="min-w-60 w-[450px]"
              isRequired
              label="Usuario"
              placeholder="Ingresa tu usuario"
              type="text"
              value={username}
              onValueChange={changeUsername}
              isInvalid={esUsernameInvalido}
              errorMessage={usernameMensajeError}
            />
            <Input
              className="min-w-60 w-[450px] "
              isRequired
              label="contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
              value={password}
              onValueChange={changePassword}
              isInvalid={esPasswordInvalido}
              errorMessage={passwordMensajeError}
            />
            <p className="text-center text-small">
              <Link to={"/recuperar"} size="sm" className="text-blue-500">
                ¿Olvidó su contraseña?
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                type="submit"
                fullWidth
                color="primary"
                isDisabled={
                  esUsernameInvalido ||
                  !username ||
                  esPasswordInvalido ||
                  !password ||
                  isLoadingSubmit
                }
              >
                Iniciar sesión
              </Button>
            </div>
          </form>
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
                    Confirmar Inicio de Sesion
                  </ModalHeader>
                  <ModalBody>
                    <form onSubmit={onSubmitLogin}>
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
                          isDisabled={!isValidToken || isLoadingSubmit}
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
        </CardBody>
      </Card>
    </div>
  );
}
