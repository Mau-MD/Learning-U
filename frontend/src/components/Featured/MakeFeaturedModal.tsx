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
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import React from "react";
import { useMutation } from "react-query";
import { ErrorType } from "../../types/requests";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}
const MakeFeaturedModal = ({ isOpen, onClose, courseId }: Props) => {
  const { user } = useSession();
  const toast = useToast();

  const makeFeatured = useMutation(
    async (courseId: string) => {
      if (!user) throw new Error("User isn not defined");

      const res = await axios.post(
        `${baseURL}/course/makeFeatured/${courseId}`,
        null,
        getConfig(user.sessionToken)
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Course made featured!",
          description: "Your course is now available to the public!",
          isClosable: true,
        });
        onClose();
      },
      onError: (error: AxiosError<ErrorType>) => {
        toast({
          title: "An error ocurred",
          description: error.response?.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

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
          <Button mr={3} onClick={() => onClose()}>
            Close
          </Button>
          <Button
            colorScheme={"green"}
            isLoading={makeFeatured.isLoading}
            onClick={() => makeFeatured.mutate(courseId)}
          >
            Make featured!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MakeFeaturedModal;
