/* eslint-disable react/prop-types */
import { Modal, ModalContent, ModalBody, ModalHeader } from "@nextui-org/react";
import FormServicio from "./formServicio";

export default function ModalServicio({
  isOpen,
  setOpenChange,
  servicio,
  getServicios,
  accion,
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
              <FormServicio
                servicio={servicio}
                setOpenChange={setOpenChange}
                getServicios={getServicios}
                accion={accion}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
