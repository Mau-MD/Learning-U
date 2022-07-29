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
} from "@chakra-ui/react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useQuery } from "react-query";
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

const CloneModal = ({
  isOpen,
  onClose,
  courseName,
  courseId,
  courseCreatedAt,
}: Props) => {
  const { user } = useSession();

  const {
    data: resources,
    isFetching,
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
      enabled: isOpen && !!user && !!courseId,
    }
  );

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
          <Button colorScheme="green">Clone Course</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CloneModal;
