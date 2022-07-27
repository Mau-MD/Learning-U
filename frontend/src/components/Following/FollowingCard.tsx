import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BiTrash } from "react-icons/bi";
import useThemeColor from "../../hooks/useThemeColor";

interface Props {
  username: string;
  userId: string;
  status: string;
}

const FollowingCard = ({ username, userId, status }: Props) => {
  const { borderColor, invertedBackgroundColor } = useThemeColor();
  return (
    <HStack
      w="100%"
      backgroundColor={invertedBackgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      px={3}
    >
      <Avatar size={"sm"} />
      <Flex p={2} w="100%" flexDir={"column"}>
        <Text>{username}</Text>
        <Text fontSize={"13px"}>{status}</Text>
      </Flex>
      <IconButton
        icon={<BiTrash />}
        aria-label="Unfollow user"
        size="sm"
        colorScheme="red"
      />
    </HStack>
  );
};

export default FollowingCard;
