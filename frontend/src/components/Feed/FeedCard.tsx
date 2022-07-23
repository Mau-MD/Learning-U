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

const FeedCard = () => {
  const { backgroundColor, borderColor } = useThemeColor();

  return (
    <HStack
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
    >
      <Flex flexDir="column" p={4} gap={4} w="80%">
        <Flex alignItems="center" gap={4}>
          <Avatar />
          <Flex flexDirection="column">
            <Text fontWeight="bold">Mauricio</Text>
            <Text fontSize={14}>24 hours ago</Text>
          </Flex>
        </Flex>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
          officia eaque vero odio sit, cupiditate quo itaque maxime, quis, at
          distinctio nihil consequatur quae. Aut recusandae debitis magnam
          accusamus harum!
        </Text>
      </Flex>
      <Flex flexDir="column" p={4} gap={4}>
        <Box>
          <HStack>
            <Text fontWeight="bold">Object Oriented Programming</Text>
            <Badge>Beginner</Badge>
          </HStack>
          <Text fontSize={14}>Generated 24 hours ago</Text>
        </Box>
        <Button>Clone Course</Button>
      </Flex>
    </HStack>
  );
};

export default FeedCard;
