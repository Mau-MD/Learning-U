import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Banner from "../Hub/Banner";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { StringMatcher } from "cypress/types/net-stubbing";
import { debounce } from "../../utils/debounce";
import YoutubeVideoIframe from "./YoutubeVideoIframe";

export const youtubeRegExp =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;

interface CreateCourseForm {
  beginnerUrl1: string;
  beginnerUrl2: string;
  beginnerUrl3: string;
  advancedUrl1: string;
  advancedUrl2: string;
  advancedUrl3: string;
  name: string;
}

type EmbedVideos = Omit<CreateCourseForm, "name">;

const emptyForm: EmbedVideos = {
  beginnerUrl1: "",
  beginnerUrl2: "",
  beginnerUrl3: "",
  advancedUrl1: "",
  advancedUrl2: "",
  advancedUrl3: "",
};

const CourseFromScratchIndex = () => {
  const [embedVideos, setEmbedVideos] = useState<EmbedVideos>(emptyForm);

  const checkIfValidYoutubeURL = (
    str: string | undefined,
    field: keyof EmbedVideos
  ) => {
    const match = str?.match(youtubeRegExp);
    if (match) {
      setEmbedVideos((embedVideos) => {
        return {
          ...embedVideos,
          [field]: `https://www.youtube.com/embed/${match[2]}?autoplay=0`,
        };
      });
      return true;
    }
    setEmbedVideos((embedVideos) => {
      return { ...embedVideos, [field]: "" };
    });
    return false;
  };

  const schema = Yup.object({
    beginnerUrl1: Yup.string().test({
      test: (str) => checkIfValidYoutubeURL(str, "beginnerUrl1"),
      message: "This is not a valid Youtube URL",
    }),
    beginnerUrl2: Yup.string().test({
      test: (str) => checkIfValidYoutubeURL(str, "beginnerUrl2"),
      message: "This is not a valid Youtube URL",
    }),
    beginnerUrl3: Yup.string().test({
      test: (str) => checkIfValidYoutubeURL(str, "beginnerUrl3"),
      message: "This is not a valid Youtube URL",
    }),
    advancedUrl1: Yup.string().test({
      test: (str) => checkIfValidYoutubeURL(str, "advancedUrl1"),
      message: "This is not a valid Youtube URL",
    }),
    advancedUrl2: Yup.string().test({
      test: (str) => checkIfValidYoutubeURL(str, "advancedUrl2"),
      message: "This is not a valid Youtube URL",
    }),
    advancedUrl3: Yup.string().test({
      test: (str) => checkIfValidYoutubeURL(str, "advancedUrl3"),
      message: "This is not a valid Youtube URL",
    }),
  });
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
          validationSchema={schema}
        >
          {({ touched, errors }) => (
            <Form>
              <FormControl mt={10}>
                <FormLabel>Course Name</FormLabel>
                <Field as={Input} name="name" />
              </FormControl>
              <Flex gap={5} mt={10}>
                <VStack w="full">
                  <Badge size={"large"}>Beginners Course</Badge>
                  <FormControl
                    isInvalid={touched.beginnerUrl1 && !!errors.beginnerUrl1}
                  >
                    <FormLabel>Youtube Tutorial #1</FormLabel>
                    <Field as={Input} name="beginnerUrl1" />
                    <FormErrorMessage>{errors.beginnerUrl1}</FormErrorMessage>
                  </FormControl>
                  {embedVideos.beginnerUrl1 && (
                    <YoutubeVideoIframe url={embedVideos.beginnerUrl1} />
                  )}
                  <FormControl
                    isInvalid={touched.beginnerUrl2 && !!errors.beginnerUrl2}
                  >
                    <FormLabel>Youtube Tutorial #2</FormLabel>
                    <Field as={Input} name="beginnerUrl2" />
                    <FormErrorMessage>{errors.beginnerUrl2}</FormErrorMessage>
                  </FormControl>
                  {embedVideos.beginnerUrl2 && (
                    <YoutubeVideoIframe url={embedVideos.beginnerUrl2} />
                  )}
                  <FormControl
                    isInvalid={touched.beginnerUrl3 && !!errors.beginnerUrl3}
                  >
                    <FormLabel>Youtube Tutorial #3</FormLabel>
                    <Field as={Input} name="beginnerUrl3" />
                    <FormErrorMessage>{errors.beginnerUrl3}</FormErrorMessage>
                  </FormControl>
                  {embedVideos.beginnerUrl3 && (
                    <YoutubeVideoIframe url={embedVideos.beginnerUrl3} />
                  )}
                </VStack>
                <VStack w="full">
                  <Badge size={"large"}>Advanced Course</Badge>
                  <FormControl
                    isInvalid={touched.advancedUrl1 && !!errors.advancedUrl1}
                  >
                    <FormLabel>Youtube Tutorial #1</FormLabel>
                    <Field as={Input} name="advancedUrl1" />
                    <FormErrorMessage>{errors.advancedUrl1}</FormErrorMessage>
                  </FormControl>
                  {embedVideos.advancedUrl1 && (
                    <YoutubeVideoIframe url={embedVideos.advancedUrl1} />
                  )}
                  <FormControl
                    isInvalid={touched.advancedUrl2 && !!errors.advancedUrl2}
                  >
                    <FormLabel>Youtube Tutorial #2</FormLabel>
                    <Field as={Input} name="advancedUrl2" />
                    <FormErrorMessage>{errors.advancedUrl2}</FormErrorMessage>
                  </FormControl>
                  {embedVideos.advancedUrl2 && (
                    <YoutubeVideoIframe url={embedVideos.advancedUrl2} />
                  )}
                  <FormControl
                    isInvalid={touched.advancedUrl3 && !!errors.advancedUrl3}
                  >
                    <FormLabel>Youtube Tutorial #3</FormLabel>
                    <Field as={Input} name="advancedUrl3" />
                    <FormErrorMessage>{errors.advancedUrl3}</FormErrorMessage>
                  </FormControl>
                  {embedVideos.advancedUrl3 && (
                    <YoutubeVideoIframe url={embedVideos.advancedUrl3} />
                  )}
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
