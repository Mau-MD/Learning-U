import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ICourse } from "../../types/course";
import { ErrorType } from "../../types/requests";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";

interface CodeForm {
  code: string;
  name: string;
}
const CourseCode = () => {
  const { user } = useSession();
  const toast = useToast();
  const navigate = useNavigate();

  const handleOnSubmit = (values: CodeForm) => {
    cloneCourse.mutate(values);
  };

  const cloneCourse = useMutation(
    async ({ name, code }: CodeForm) => {
      if (!user) {
        throw new Error("User not defined");
        return;
      }
      const res = await axios.post<ICourse>(
        `${baseURL}/course/clone/${code}`,
        {
          name,
        },
        getConfig(user?.sessionToken)
      );
      return res.data;
    },
    {
      onSuccess: (course) => {
        toast({
          status: "success",
          title: "Course cloned!",
          description: "The course has successfully been cloned",
          isClosable: true,
        });
        navigate(`/courses/${course?.objectId}/difficulty`);
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
    <Box mb={20}>
      <Formik initialValues={{ code: "", name: "" }} onSubmit={handleOnSubmit}>
        {({ touched, errors }) => (
          <Form>
            <FormControl mt={10} isInvalid={touched.code && !!errors.code}>
              <FormLabel>Enter the course code below</FormLabel>
              <Field as={Input} name="code" />
              <FormHelperText>
                It should be something like Prdp7PRvLa
              </FormHelperText>
              <FormErrorMessage>{errors.code}</FormErrorMessage>
            </FormControl>
            <FormControl mt={5} isInvalid={touched.name && !!errors.name}>
              <FormLabel>How do you want to call your course?</FormLabel>
              <Field as={Input} name="name" />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <Button
              colorScheme="blue"
              w="100%"
              mt={5}
              type="submit"
              isLoading={cloneCourse.isLoading}
            >
              Clone Course
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CourseCode;
