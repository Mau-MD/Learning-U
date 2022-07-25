import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
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
import { useNavigate } from "react-router-dom";

interface Props {
  username: string;
  content: string;
  courseName?: string;
  courseId?: string;
  courseDifficulty?: number;
  createdAt: string;
  courseCreatedAt?: string;
}

interface CloneForm {
  name: string;
  code: string;
}

const FeedCard = ({
  content,
  courseName,
  username,
  createdAt,
  courseId,
  courseCreatedAt,
}: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useSession();

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
    <HStack
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      w="100%"
    >
      <Flex flexDir="column" p={4} gap={4} minW={courseId ? "80%" : "100%"}>
        <Flex alignItems="center" gap={4}>
          <Avatar />
          <Flex flexDirection="column">
            <Text fontWeight="bold">{username}</Text>
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
          <Button
            onClick={() => handleCloneCourse()}
            isLoading={cloneCourse.isLoading}
          >
            Clone Course
          </Button>
        </Flex>
      )}
    </HStack>
  );
};

export default FeedCard;
