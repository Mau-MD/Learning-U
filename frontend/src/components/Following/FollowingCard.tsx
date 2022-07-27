import { Avatar, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
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
    >
      <Avatar size={"sm"} ml={3} />
      <Flex p={2} w="100%" flexDir={"column"}>
        <Text>{username}</Text>
        <Text fontSize={"13px"}>{status}</Text>
      </Flex>
    </HStack>
  );
};

export default FollowingCard;
