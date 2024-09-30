/* eslint-disable react/prop-types */
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import FormCitas from "./formCitas";

export default function ModalCita({
  isOpen,
  setOpenChange,
  cita,
  proveedores,
  servicios,
  getCitas,
}) {
  return (
    <Modal
      backdrop="blur"
      size="xl"
      isOpen={isOpen}
      onOpenChange={setOpenChange}
      //   isDismissable={false}
      //   isKeyboardDismissDisabled
      //   hideCloseButton
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
              Informacion de la solicitud
            </ModalHeader>
            <ModalBody>
              <FormCitas
                cita={cita}
                proveedores={proveedores}
                servicios={servicios}
                setOpenChange={setOpenChange}
                getCitas={getCitas}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
