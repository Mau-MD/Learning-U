import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";

const RegisterIndex = () => {
  const { backgroundColor, borderColor } = useThemeColor();
  return (
    <Center h="90vh">
      <Flex
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderWidth={1}
        h="60%"
        w="30%"
        p={10}
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex flexDir="column" gap={4}>
          <Heading as="h1">Join Learning U!</Heading>
          <FormControl>
            <FormLabel>Username or email</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input />
          </FormControl>
        </Flex>
        <Flex flexDir="column" gap={5}>
          <Button variant="link">Already have an account? Login here</Button>
          <Button>Register</Button>
        </Flex>
      </Flex>
    </Center>
  );
};

export default RegisterIndex;
