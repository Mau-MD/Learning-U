import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";

interface Props {
  username: string;
  content: string;
  courseName: string;
  courseId: string;
  courseDifficulty: number;
  createdAt: string;
}

const FeedCard = ({
  content,
  courseName,
  username,
  createdAt,
  courseDifficulty,
  courseId,
}: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  return (
    <HStack
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
    >
      <Flex flexDir="column" p={4} gap={4} w={courseId ? "80%" : "100%"}>
        <Flex alignItems="center" gap={4}>
          <Avatar />
          <Flex flexDirection="column">
            <Text fontWeight="bold">{username}</Text>
            <Text fontSize={14}>{createdAt}</Text>
          </Flex>
        </Flex>
        <Text>{content}</Text>
      </Flex>
      {courseId && (
        <Flex flexDir="column" p={4} gap={4}>
          <Box>
            <HStack>
              <Text fontWeight="bold">{courseName}</Text>
              <Badge>{courseDifficulty === 1 ? "Beginner" : "Advanced"}</Badge>
            </HStack>
            <Text fontSize={14}>{createdAt}</Text>
          </Box>
          <Button>Clone Course</Button>
        </Flex>
      )}
    </HStack>
  );
};

export default FeedCard;
