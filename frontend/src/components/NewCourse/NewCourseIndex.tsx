import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Skeleton,
  Stack,
  Tag,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Banner from "../Hub/Banner";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { ErrorType } from "../../types/requests";
import { ICourse } from "../../types/course";
import { getConfig, useSession } from "../../utils/auth";
import CourseCode from "./CourseCode";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/constants";
import { useTour } from "../../hooks/useTour";
import GuidedPopover from "../GuidedPopover/GuidedPopover";

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
  const { currStep, prevStep, nextStep, stepNum, startTour } = useTour([
    {
      title: "Let's create a course",
      content:
        "This input form is free! You can input any text, like Vue.js React, even Barista Coffee!",
    },
    {
      title: "Create courses based on course codes",
      content:
        "All courses are created automatically. This means that a course you create today, might not be the same as one you create tomorrow. If you really liked a course, though, you can create an exact copy of it using the course code!",
    },
    {
      title: "Click here to create a course!",
      content:
        "Let's find the perfect tutorials. Click here to begin the course creation.",
    },
  ]);

  useEffect(() => {
    startTour();
  }, []);

  const [openCode, setOpenCode] = useState(false);

  const handleSubmit = (values: LearnForm) => {
    createCourse.mutate(values.name);
  };

  const { data: suggestions, isFetching } = useQuery(
    "suggested",
    async () => {
      if (!user) throw new Error("User is not defined");
      const res = await axios.get<{ courseName: string; frequency: number }[]>(
        `${baseURL}/suggestions/me`,
        getConfig(user.sessionToken)
      );
      return res.data;
    },
    { enabled: !!user }
  );

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
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <Flex flexDir="column" gap={10}>
                <GuidedPopover
                  content={currStep.content}
                  title={currStep.title}
                  isOpen={stepNum === 0}
                  onClose={nextStep}
                >
                  <FormControl
                    mt={10}
                    isInvalid={touched.name && !!errors.name}
                  >
                    <FormLabel>What do you want to learn?</FormLabel>
                    <Field
                      as={Input}
                      name="name"
                      disabled={createCourse.isLoading}
                      test-id="new-course-input"
                    />
                    <FormHelperText>
                      Write the topic you would like to learn (E.g. React,
                      NextJs, Node)
                    </FormHelperText>
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                </GuidedPopover>
                <FormControl>
                  <FormLabel>Suggested Topics</FormLabel>
                  {isFetching && (
                    <>
                      <Skeleton h="20px" w="250px" />
                    </>
                  )}
                  <HStack>
                    {suggestions &&
                      !isFetching &&
                      suggestions.map((suggestion) => (
                        <Tag
                          key={suggestion.courseName}
                          cursor="pointer"
                          onClick={() =>
                            setFieldValue("name", suggestion.courseName)
                          }
                        >
                          {suggestion.courseName}
                        </Tag>
                      ))}
                  </HStack>
                  <FormHelperText>
                    Based on what your friends are learning
                  </FormHelperText>
                </FormControl>
                <Flex gap={2}>
                  <GuidedPopover
                    content={currStep.content}
                    title={currStep.title}
                    isOpen={stepNum === 1}
                    prevStep={prevStep}
                    onClose={nextStep}
                  >
                    <Button
                      w="100%"
                      type="button"
                      onClick={() => setOpenCode(!openCode)}
                    >
                      I have a course code
                    </Button>
                  </GuidedPopover>
                  <GuidedPopover
                    content={currStep.content}
                    title={currStep.title}
                    isOpen={stepNum === 2}
                    prevStep={prevStep}
                    onClose={nextStep}
                  >
                    <Button
                      w="100%"
                      colorScheme="green"
                      type="submit"
                      isDisabled={openCode}
                      isLoading={createCourse.isLoading}
                      test-id="new-course-btn"
                    >
                      Generate Course!
                    </Button>
                  </GuidedPopover>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
        {openCode && <CourseCode />}
      </Container>
    </>
  );
};

export default NewCourseIndex;
