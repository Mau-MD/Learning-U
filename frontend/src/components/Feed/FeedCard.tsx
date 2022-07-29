import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";
import { formatDistanceToNow } from "date-fns";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { ICourse } from "../../types/course";
import { ErrorType } from "../../types/requests";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { scrollWithOffset } from "../../utils/scrollWithOffset";
import CloneModal from "./CloneModal";

interface Props {
  username: string;
  content: string;
  courseName?: string;
  courseId?: string;
  courseDifficulty?: number;
  createdAt: string;
  courseCreatedAt?: string;
  userId: string;
}

const FeedCard = ({
  content,
  courseName,
  username,
  createdAt,
  courseId,
  courseCreatedAt,
  userId,
}: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      w="100%"
    >
      <Flex flexDir="column" p={4} gap={4} minW={courseId ? "80%" : "100%"}>
        <Flex alignItems="center" gap={4}>
          <Avatar name={username} />
          <Flex flexDirection="column">
            <HashLink
              to={`/profile/${userId}#top`}
              smooth
              scroll={(el) => scrollWithOffset(el, -20)}
            >
              <Text fontWeight="bold">{username}</Text>
            </HashLink>
            <Text fontSize={14}>
              {formatDistanceToNow(new Date(createdAt))} ago
            </Text>
          </Flex>
        </Flex>
        <Text>{content}</Text>
      </Flex>
      {courseId && (
        <Flex flexDir="column" p={4} gap={4}>
          <Box>
            <HStack>
              <Text fontWeight="bold">{courseName}</Text>
            </HStack>
            {courseCreatedAt && (
              <Text fontSize={14}>
                Created {formatDistanceToNow(new Date(courseCreatedAt))} ago
              </Text>
            )}
          </Box>
          <Button onClick={() => onOpen()}>Clone Course</Button>
          <CloneModal
            onClose={onClose}
            courseId={courseId}
            courseName={courseName || ""}
            courseCreatedAt={courseCreatedAt || ""}
            isOpen={isOpen}
          />
        </Flex>
      )}
    </HStack>
  );
};

export default FeedCard;
