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
import axios from "axios";
import React, { useState } from "react";
import { IResource } from "../../types/resource";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import VideoCardToDelete from "./VideoCardToDelete";
import { useQuery } from "react-query";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

const DeleteCourse = ({ isOpen, onClose, courseId }: Props) => {
  const { user, isFetching } = useSession();

  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  const { data: resources, isFetching: isQueryFetching } = useQuery(
    `hub-${courseId}`,
    async () => {
      if (!user) throw new Error("User is not defined");

      const res = await axios.get<IResource[]>(
        `${baseURL}/resources/byCourse/${courseId}`,
        getConfig(user.sessionToken)
      );
      return res.data;
    },
    {
      enabled: isOpen && !isFetching && !!courseId,
    }
  );

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
        <ModalHeader>Are you sure you want to delete this course?</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={7}>
          <Text mb={2}>Select which tutorials you didn{"'"}t like</Text>
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap={5}>
            {resources &&
              resources.map((resource) => (
                <VideoCardToDelete
                  key={resource.objectId}
                  title={resource.title}
                  objectId={resource.objectId}
                  src={resource.type === "video" ? resource.thumbnail : ""}
                  onClick={(objectId) => handleToggleSelectedResource(objectId)}
                  active={
                    !!selectedResources.find(
                      (selectedId) => selectedId === resource.objectId
                    )
                  }
                />
              ))}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCourse;
