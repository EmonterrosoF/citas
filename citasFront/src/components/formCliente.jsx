/* eslint-disable react/prop-types */
import { Input } from "@nextui-org/react";

export default function FormCliente({ cliente }) {
  return (
    <form
      className="flex flex-col gap-4 w-full"
      style={{ paddingBottom: "70px" }}
    >
      <h4
        style={{ padding: "20px 0 0 0" }}
        className="font-bold text-large text-center"
      >
        Detalle cliente
      </h4>
      <div
        style={{ padding: "0.75rem 0 0 0" }}
        className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row"
      >
        <Input
          isRequired
          label="Nombre"
          placeholder="Ingresa tu nombre"
          type="text"
          className="min-w-60"
          value={cliente.nombre}
          disabled
        />
        <Input
          isRequired
          label="Apellido"
          placeholder="Ingresa tu apellido"
          type="text"
          className="min-w-60"
          value={cliente.apellido}
          disabled
        />
      </div>
      <div className="flex gap-5 justify-between flex-col md:flex-row lg:flex-row">
        <Input
          isRequired
          label="Correo"
          placeholder="Ingresa tu correo electronico"
          type="email"
          className="min-w-60"
          value={cliente.email}
          disabled
        />
        <Input
          isRequired
          label="Telefono"
          placeholder="Ingresa tu telefono"
          type="text"
          className="min-w-60"
          value={cliente.telefono}
          disabled
        />
      </div>
    </form>
  );
}
