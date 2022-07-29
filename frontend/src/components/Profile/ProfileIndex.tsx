import {
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";

const ProfileIndex = () => {
  const { backgroundColor, borderColor, invertedBackgroundColor } =
    useThemeColor();
  return (
    <Container maxW="container.xl">
      <Heading mt={5}>Profile</Heading>
      <HStack mt={4}>
        <VStack
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          borderWidth={1}
          borderRadius={4}
          w={"30%"}
          p={10}
          gap={3}
        >
          <Avatar />
          <VStack>
            <Heading size={"md"}>maumd15</Heading>
            <Text>maumd@fb.com</Text>
          </VStack>
          <Box
            backgroundColor={invertedBackgroundColor}
            borderColor={borderColor}
            borderWidth={1}
            borderRadius={4}
            textAlign="center"
            w={"90%"}
            p={4}
          >
            This is a status
          </Box>
        </VStack>
      </HStack>
    </Container>
  );
};

export default ProfileIndex;
