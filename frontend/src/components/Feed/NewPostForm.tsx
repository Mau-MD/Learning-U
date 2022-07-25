import {
  Box,
  FormControl,
  Textarea,
  Select,
  Button,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";

interface PostValues {
  content: string;
  course: string;
}

const handleFormSubmit = (values: PostValues) => {
  console.log(values);
};

const NewPostForm = () => {
  return (
    <Formik
      initialValues={{ content: "", course: "" }}
      onSubmit={handleFormSubmit}
    >
      {() => (
        <Form>
          <VStack mt={5}>
            <FormControl>
              <FormLabel>Write anything below!</FormLabel>
              <Field as={Textarea} name="content" />
            </FormControl>
            <FormControl>
              <FormLabel>Select a Course</FormLabel>
              <Select>Select a course</Select>
            </FormControl>
            <Button type="submit">Submit</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;
