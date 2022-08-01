import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Input,
  Button,
  Text,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}
const MakeFeaturedModal = ({ isOpen, onClose, courseId }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Make this course featured!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={7}>
          <Text>
            This will share this course to all users and it would become public.
            You cannot undo this action.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={3}>Close</Button>
          <Button colorScheme={"green"}>Make featured!</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MakeFeaturedModal;
