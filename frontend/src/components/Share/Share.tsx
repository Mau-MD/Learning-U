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
  Text,
  useClipboard,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  code: string;
}

const Share = ({ isOpen, onClose, code }: Props) => {
  const { onCopy, hasCopied } = useClipboard(code);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share this course to your friends!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={7}>
          <Flex gap={2}>
            <Input value={code} isReadOnly />
            <Button onClick={onCopy}>{hasCopied ? "Copied" : "Copy"}</Button>
          </Flex>
          <Text mt={4}>
            Share this code with your friends, and tell them to paste it when
            creating a new course!
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Share;
