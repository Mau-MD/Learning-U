import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import useThemeColor from "../../hooks/useThemeColor";
import * as Yup from "yup";

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

const schema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters or longer")
    .required("Password is required"),
});

const RegisterIndex = () => {
  const { backgroundColor, borderColor } = useThemeColor();

  const handleOnSubmit = (values: IRegisterForm) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={handleOnSubmit}
      validationSchema={schema}
    >
      {() => (
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
                <Heading as="h1">Join Learning U!</Heading>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Field as={Input} name="username" />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Field as={Input} name="email" />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Field as={Input} name="password" />
                </FormControl>
              </Flex>
              <Flex flexDir="column" gap={5}>
                <Button variant="link">
                  <Link to="/login">Already have an account? Login here</Link>
                </Button>
                <Button type="submit">Register</Button>
              </Flex>
            </Flex>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterIndex;
