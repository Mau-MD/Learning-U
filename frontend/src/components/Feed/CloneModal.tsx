import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HStack,
  Spinner,
  ModalCloseButton,
  ModalBody,
  Grid,
  Skeleton,
  ModalFooter,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ICourse } from "../../types/course";
import { ErrorType } from "../../types/requests";
import { IResource } from "../../types/resource";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import VideoCardPreview from "../DeleteCourse/VideoCardPreview";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  courseCreatedAt: string;
  courseId: string;
}
interface CloneForm {
  name: string;
  code: string;
}

const CloneModal = ({
  isOpen,
  onClose,
  courseName,
  courseId,
  courseCreatedAt,
}: Props) => {
  const { user } = useSession();
  const toast = useToast();
  const navigate = useNavigate();

  const { data: resources, isLoading } = useQuery(
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
      enabled: isOpen && !!user && !!courseId,
    }
  );

  const cloneCourse = useMutation(
    async ({ name, code }: CloneForm) => {
      if (!user) {
        throw new Error("User not defined");
        return;
      }
      const res = await axios.post<ICourse>(
        `${baseURL}/course/clone/${code}`,
        {
          name,
        },
        getConfig(user?.sessionToken)
      );
      return res.data;
    },
    {
      onSuccess: (course) => {
        toast({
          status: "success",
          title: "Course cloned!",
          description: "The course has successfully been cloned",
          isClosable: true,
        });
        navigate(`/courses/${course?.objectId}/difficulty`);
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

  const handleCloneCourse = () => {
    if (!courseId || !courseName) return;
    cloneCourse.mutate({ code: courseId, name: courseName });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>Course Preview: {courseName} </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={7}>
          <Text mb={4}>
            Created {formatDistanceToNow(new Date(courseCreatedAt))} ago
          </Text>
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
                  src={resource.type === "video" ? resource.thumbnail : ""}
                />
              ))
            )}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel{" "}
          </Button>
          <Button
            colorScheme="green"
            onClick={() => handleCloneCourse()}
            isLoading={cloneCourse.isLoading}
          >
            Clone Course
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CloneModal;
