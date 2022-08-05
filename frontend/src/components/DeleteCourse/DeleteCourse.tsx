import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Grid,
  Button,
  ModalFooter,
  Spinner,
  HStack,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { IResource } from "../../types/resource";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import VideoCardPreview from "./VideoCardPreview";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ErrorType } from "../../types/requests";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

const DeleteCourse = ({ isOpen, onClose, courseId }: Props) => {
  const { user, isFetching } = useSession();
  const queryClient = useQueryClient();
  const toast = useToast();

  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  const {
    data: resources,
    isFetching: isQueryFetching,
    isLoading,
  } = useQuery(
    `hub-${courseId}`,
    async () => {
      if (!user) throw new Error("User is not defined");

      const res = await axios.get<IResource[]>(
        `${baseURL}/resources/byCourse/${courseId}`,
        getConfig(user.sessionToken)
      );

      return res.data.sort((a, b) => a.level - b.level);
    },
    {
      enabled: isOpen && !isFetching && !!courseId,
    }
  );

  const deleteCourse = useMutation(
    async ({
      courseId,
      dislikedVideos,
    }: {
      courseId: string;
      dislikedVideos: string[];
    }) => {
      if (!user) {
        throw new Error("User is not defined");
      }
      const res = await axios.delete(`${baseURL}/course/${courseId}`, {
        ...getConfig(user.sessionToken),
        data: {
          dislikedVideos: dislikedVideos,
        },
      });
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("courses");
        toast({
          status: "success",
          title: "Course deleted!",
          description: "We appreciate your feedback!",
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ErrorType>) => {
        toast({
          status: "error",
          title: "Error deleting course",
          description: error.response?.data.message,
          isClosable: true,
        });
      },
    }
  );

  const handleDeleteCourse = () => {
    deleteCourse.mutate({ courseId, dislikedVideos: selectedResources });
    onClose();
  };

  // Future Note: It's better if we use something like set() or hashmap. Better complexity.
  const handleToggleSelectedResource = (id: string) => {
    const alreadySelected = selectedResources.find(
      (selectedId) => selectedId === id
    );

    if (alreadySelected) {
      setSelectedResources(
        selectedResources.filter((selectedId) => selectedId !== id)
      );
      return;
    }

    setSelectedResources([...selectedResources, id]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>Are you sure you want to delete this course?</Text>
            {isQueryFetching && <Spinner />}
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={7}>
          <Text mb={2}>Select which tutorials you didn{"'"}t like</Text>
          <Grid gridTemplateColumns="repeat(3, 1fr)" gap={5}>
            {isLoading ? (
              <>
                <Skeleton h="213px" />
                <Skeleton h="213px" />
                <Skeleton h="213px" />
              </>
            ) : (
              resources &&
              resources.map((resource) => (
                <VideoCardPreview
                  key={resource.objectId}
                  title={resource.title}
                  objectId={resource.videoId}
                  src={resource.thumbnail}
                  onClick={(objectId) => handleToggleSelectedResource(objectId)}
                  active={
                    !!selectedResources.find(
                      (selectedId) => selectedId === resource.videoId
                    )
                  }
                />
              ))
            )}
          </Grid>
          <Text fontWeight={"bold"} mt={5}>
            {selectedResources.length} resources selected
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel{" "}
          </Button>
          <Button colorScheme="red" onClick={() => handleDeleteCourse()}>
            Delete Course
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCourse;
