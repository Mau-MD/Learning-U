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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import Banner from "../Hub/Banner";
import * as Yup from "yup";

interface LearnForm {
  name: string;
}

const schema = Yup.object({
  name: Yup.string().required("Topic of the course is required"),
});

const NewCourseIndex = () => {
  const handleSubmit = (values: LearnForm) => {
    console.log(values);
  };

  return (
    <>
      <Banner src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" />
      <Container maxW="container.xl">
        <Heading as="h1" fontWeight="bold" fontSize="4xl" mt={10}>
          Let{"'"}s learn something new!
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
                  <Field as={Input} name="name" />
                  <FormHelperText>
                    Write the topic you would like to learn (E.g. React, NextJs,
                    Node)
                  </FormHelperText>
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <Button w="100%" colorScheme="green" type="submit">
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
