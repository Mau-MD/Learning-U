import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Box,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";

interface CodeForm {
  code: string;
}
const CourseCode = () => {
  const handleOnSubmit = (values: CodeForm) => {
    console.log(values);
  };

  return (
    <Box mb={20}>
      <Formik initialValues={{ code: "" }} onSubmit={handleOnSubmit}>
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
            <Button colorScheme="blue" w="100%" mt={5}>
              Clone Course
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CourseCode;
