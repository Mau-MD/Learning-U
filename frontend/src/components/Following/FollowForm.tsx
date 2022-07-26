import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface FollowForm {
  username: string;
}

const schema = Yup.object({
  username: Yup.string().required("Username is required"),
});

const FollowForm = () => {
  const handleSubmit = (values: FollowForm) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ username: "" }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ touched, errors }) => (
        <Form>
          <VStack mt={4}>
            <FormControl isInvalid={touched.username && !!errors.username}>
              <FormLabel>Follow someone</FormLabel>
              <Field as={Input} name="username" />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w={"100%"}>
              Follow!
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default FollowForm;
