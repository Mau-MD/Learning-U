import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import Banner from "../Hub/Banner";
import * as Yup from "yup";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { baseURL } from "../../utils/constants";
import { ErrorType } from "../../types/requests";
import { useNavigate } from "react-router-dom";
import { ICourse } from "../../../../types/course";
import { getConfig, useSession } from "../../utils/auth";

interface LearnForm {
  name: string;
}

const schema = Yup.object({
  name: Yup.string().required("Topic of the course is required"),
});

const NewCourseIndex = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useSession();

  const handleSubmit = (values: LearnForm) => {
    createCourse.mutate(values.name);
  };

  const createCourse = useMutation(
    async (name: string) => {
      if (!user) throw new Error("User is not logged in");

      const res = await axios.post<ICourse>(
        `${baseURL}/course/new`,
        { name },
        getConfig(user.sessionToken)
      );
      return res.data;
    },
    {
      onSuccess: (course) => {
        toast({
          title: "Course created!",
          description: "Your custom course was created successfully!",
          status: "success",
        });
        navigate(`/courses/${course.objectId}/difficulty?name=${course.name}`);
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
    <>
      <Banner src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" />
      <Container maxW="container.xl">
        <Heading as="h1" fontWeight="bold" fontSize="4xl" mt={10}>
          {createCourse.isLoading
            ? "We are creating a custom course just for you! Please wait."
            : "Let's learn something new"}
        </Heading>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {({ errors, touched }) => (
            <Form>
              <Flex flexDir="column" gap={10}>
                <FormControl mt={10} isInvalid={touched.name && !!errors.name}>
                  <FormLabel>What do you want to learn?</FormLabel>
                  <Field
                    as={Input}
                    name="name"
                    disabled={createCourse.isLoading}
                  />
                  <FormHelperText>
                    Write the topic you would like to learn (E.g. React, NextJs,
                    Node)
                  </FormHelperText>
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <Button
                  w="100%"
                  colorScheme="green"
                  type="submit"
                  isLoading={createCourse.isLoading}
                >
                  Generate Course!
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default NewCourseIndex;
