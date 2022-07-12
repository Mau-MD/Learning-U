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
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import useThemeColor from "../../hooks/useThemeColor";

interface ILoginForm {
  username: string;
  password: string;
}

const LoginIndex = () => {
  const { backgroundColor, borderColor } = useThemeColor();

  const handleOnSubmit = (values: ILoginForm) => {
    console.log(values);
  };

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
                <Button type="submit">Login</Button>
              </Flex>
            </Flex>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default LoginIndex;
