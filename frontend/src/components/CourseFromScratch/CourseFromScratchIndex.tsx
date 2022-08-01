import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Banner from "../Hub/Banner";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

// export const youtubeRegExp =
//   /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;

// const schema = Yup.object({
//   beginnerUrl1: Yup.string().matches(
//     youtubeRegExp,
//     "This is not a valid Youtube URL"
//   ),
//   beginnerUrl2: Yup.string().matches(
//     youtubeRegExp,
//     "This is not a valid Youtube URL"
//   ),
//   beginnerUrl3: Yup.string().matches(
//     youtubeRegExp,
//     "This is not a valid Youtube URL"
//   ),
//   advancedUrl1: Yup.string().matches(
//     youtubeRegExp,
//     "This is not a valid Youtube URL"
//   ),
//   advancedUrl2: Yup.string().matches(
//     youtubeRegExp,
//     "This is not a valid Youtube URL"
//   ),
//   advancedUrl3: Yup.string().matches(
//     youtubeRegExp,
//     "This is not a valid Youtube URL"
//   ),
// });

interface CreateCourseForm {
  beginnerUrl1: string;
  beginnerUrl2: string;
  beginnerUrl3: string;
  advancedUrl1: string;
  advancedUrl2: string;
  advancedUrl3: string;
  name: string;
}

const CourseFromScratchIndex = () => {
  const handleFormSubmit = (values: CreateCourseForm) => {
    console.log(values);
  };
  return (
    <>
      <Banner src="https://images.unsplash.com/photo-1521302200778-33500795e128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" />
      <Container maxW="container.xl" my={10}>
        <Heading as="h1">Create a new course from scratch!</Heading>
        <Text>
          Here you can add your own custom Youtube Tutorials and share your
          course to the public!
        </Text>

        <Formik
          initialValues={{
            beginnerUrl1: "",
            beginnerUrl2: "",
            beginnerUrl3: "",
            advancedUrl1: "",
            advancedUrl2: "",
            advancedUrl3: "",
            name: "",
          }}
          onSubmit={handleFormSubmit}
        >
          {() => (
            <Form>
              <FormControl mt={10}>
                <FormLabel>Course Name</FormLabel>
                <Field as={Input} name="name" />
              </FormControl>
              <Flex gap={5} mt={10}>
                <VStack w="full">
                  <Badge size={"large"}>Beginners Course</Badge>
                  <FormControl>
                    <FormLabel>Youtube Tutorial #1</FormLabel>
                    <Field as={Input} name="beginnerUrl1" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Youtube Tutorial #2</FormLabel>
                    <Field as={Input} name="beginnerUrl2" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Youtube Tutorial #3</FormLabel>
                    <Field as={Input} name="beginnerUrl3" />
                  </FormControl>
                </VStack>
                <VStack w="full">
                  <Badge size={"large"}>Advanced Course</Badge>
                  <FormControl>
                    <FormLabel>Youtube Tutorial #1</FormLabel>
                    <Field as={Input} name="advancedUrl1" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Youtube Tutorial #2</FormLabel>
                    <Field as={Input} name="advancedUrl2" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Youtube Tutorial #3</FormLabel>
                    <Field as={Input} name="advancedUrl3" />
                  </FormControl>
                </VStack>
              </Flex>
              <Button type="submit" colorScheme={"green"} w="100%" mt={10}>
                Create Course
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default CourseFromScratchIndex;
