import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import useThemeColor from "../../hooks/useThemeColor";
import { baseURL } from "../../utils/constants";

interface ILoginForm {
  username: string;
  password: string;
}

const LoginIndex = () => {
  const { backgroundColor, borderColor } = useThemeColor();

  const handleOnSubmit = (values: ILoginForm) => {
    handleLogin.mutate(values);
  };

  const handleLogin = useMutation(
    async (values: ILoginForm) => {
      const res = await axios.post(`${baseURL}/auth/login`, values);
      return res.data;
    },
    {
      onSuccess: (res) => {
        console.log("Success ", res);
      },
      onError: () => {
        console.log("Error");
      },
    }
  );

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleOnSubmit}
    >
      {({ errors, touched }) => (
        <Form>
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
                <FormControl isInvalid={touched.username && !!errors.username}>
                  <FormLabel>Username or email</FormLabel>
                  <Field as={Input} name="username" />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.password && !!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Field as={Input} name="password" type="password" />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex flexDir="column" gap={5}>
                <Button variant="link" type="button">
                  Forgot Password?
                </Button>
                <Button variant="link" type="button">
                  <Link to="/register">
                    Don{"'"}t have an account yet? Register here!
                  </Link>
                </Button>
                <Button type="submit" isLoading={handleLogin.isLoading}>
                  Login
                </Button>
              </Flex>
            </Flex>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default LoginIndex;
