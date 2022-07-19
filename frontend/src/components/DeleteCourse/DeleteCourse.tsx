import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import VideoCard from "../Hub/VideoCard";
import VideoCardToDelete from "./VideoCardToDelete";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteCourse = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure you want to delete this course?</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={7}>
          <Text mb={2}>Select which tutorials you didn{"'"}t like</Text>
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap={5}>
            <VideoCardToDelete title="Video 1" src="" />
            <VideoCardToDelete title="Video 1" src="" />
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCourse;
