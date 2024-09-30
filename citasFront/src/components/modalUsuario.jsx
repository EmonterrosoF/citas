/* eslint-disable react/prop-types */
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import FormUsuario from "./formUsuario";

export default function ModalUsuario({
  isOpen,
  setOpenChange,
  usuario,
  getUsuarios,
  accion,
  servicios,
  serviciosSeleccionados,
}) {
  return (
    <Modal
      backdrop="blur"
      size="xl"
      isOpen={isOpen}
      onOpenChange={setOpenChange}
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
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <FormUsuario
                usuario={usuario}
                setOpenChange={setOpenChange}
                getUsuarios={getUsuarios}
                accion={accion}
                serviciosList={servicios}
                idServiciosSeleccionados={serviciosSeleccionados}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
