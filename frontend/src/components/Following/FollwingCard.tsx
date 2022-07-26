import { Avatar, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";

const FollwingCard = () => {
  const { borderColor } = useThemeColor();
  return (
    <HStack
      w="100%"
      backgroundColor={"white"}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={2}
    >
      <Avatar size={"sm"} ml={3} />
      <Flex p={2} w="100%" flexDir={"column"}>
        <Text>User</Text>
        <Text fontSize={"13px"}>Learning Object Oriented Programming!</Text>
      </Flex>
    </HStack>
  );
};

export default FollwingCard;
