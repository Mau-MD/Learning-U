import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import useThemeColor from "../../hooks/useThemeColor";
import { ErrorType } from "../../types/requests";
import { IUser } from "../../types/user";
import { persistUser, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import * as Yup from "yup";

interface ILoginForm {
  username: string;
  password: string;
}

const schema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginIndex = () => {
  const { backgroundColor, borderColor } = useThemeColor();

  const toast = useToast();
  const navigate = useNavigate();
  const handleOnSubmit = (values: ILoginForm) => {
    handleLogin.mutate(values);
  };

  const handleLogin = useMutation(
    async (values: ILoginForm) => {
      const res = await axios.post<IUser>(`${baseURL}/auth/login`, values);
      return res.data;
    },
    {
      onSuccess: (user) => {
        persistUser(user);
        navigate("/dashboard", { replace: true });
        window.location.reload();
      },
      onError: (error: AxiosError<ErrorType>) => {
        toast({
          title: "An error ocurred",
          description: error.response?.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleOnSubmit}
      validationSchema={schema}
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
