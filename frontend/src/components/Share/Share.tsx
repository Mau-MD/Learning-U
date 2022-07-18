import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useClipboard,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Share = ({ isOpen, onClose }: Props) => {
  const [value, setValue] = useState("CODE");

  const { onCopy, hasCopied } = useClipboard(value);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share this course to your friends!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <Flex gap={2}>
            <Input value={value} isReadOnly />
            <Button onClick={onCopy}>{hasCopied ? "Copied" : "Copy"}</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Share;
