import { Input, Button, Card, CardBody, Image } from "@nextui-org/react";

import Logo from "../../assets/logo.png";

export default function RecuperarPage() {
  return (
    <div className="flex flex-col w-full">
      <Card className="mx-auto my-20  py-14 px-5">
        <CardBody className="items-center">
          <Image isZoomed isBlurred width={100} src={Logo} />
          <form className="flex flex-col gap-4 py-5">
            <Input
              className="min-w-60 w-[450px]"
              isRequired
              label="correo"
              placeholder="Ingresa tu correo"
              type="text"
            />
            <Input
              className="min-w-60 w-[450px]"
              isRequired
              label="Usuario"
              placeholder="Ingresa tu usuario"
              type="text"
            />
            <Input
              className="min-w-60 w-[450px] "
              isRequired
              label="contraseña"
              placeholder="Ingresa tu contraseña"
              type="password"
            />
            <Input
              className="min-w-60 w-[450px] "
              isRequired
              label="confirmar contraseña"
              placeholder="Ingresa de nuevo la contraseña"
              type="password"
            />

            <div className="flex gap-2 justify-end">
              <Button fullWidth color="primary">
                Recuparar usuario
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
