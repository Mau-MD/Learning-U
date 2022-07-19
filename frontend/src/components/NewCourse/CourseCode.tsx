import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { ICourse } from "../../types/course";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";

interface CodeForm {
  code: string;
  name: string;
}
const CourseCode = () => {
  const handleOnSubmit = (values: CodeForm) => {};

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
            <Button colorScheme="blue" w="100%" mt={5} type="submit">
              Clone Course
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CourseCode;
