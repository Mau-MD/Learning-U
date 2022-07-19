import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteCourse = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share this course to your friends!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={7}></ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCourse;
