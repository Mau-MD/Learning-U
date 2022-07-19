import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import useThemeColor from "../../hooks/useThemeColor";

const LoginIndex = () => {
  const { backgroundColor, borderColor } = useThemeColor();
  return (
    <Center h="90vh">
      <Flex
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderWidth={1}
        h={{ base: "70%", md: "60%" }}
        w={{ base: "90%", md: "30%" }}
        p={10}
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex flexDir="column" gap={4}>
          <Heading as="h1">Welcome back!</Heading>
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
          <Button variant="link">Forgot Password?</Button>
          <Button variant="link">
            <Link to="/register">
              Don{"'"}t have an account yet? Register here!
            </Link>
          </Button>
          <Button>Register</Button>
        </Flex>
      </Flex>
    </Center>
  );
};

export default LoginIndex;
