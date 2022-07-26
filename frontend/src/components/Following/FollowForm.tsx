import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";

interface FollowForm {
  username: string;
}

const FollowForm = () => {
  const handleSubmit = (values: FollowForm) => {
    console.log(values);
  };

  return (
    <Formik initialValues={{ username: "" }} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <VStack mt={4}>
            <FormControl>
              <FormLabel>Follow someone</FormLabel>
              <Field as={Input} name="username" />
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
