import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";

interface StatusForm {
  status: string;
}

const SetStatusForm = () => {
  const handleFormSubmit = (values: StatusForm) => {
    console.log(values);
  };

  return (
    <Formik initialValues={{ status: "" }} onSubmit={handleFormSubmit}>
      {() => (
        <Form>
          <VStack mt={4}>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Field as={Input} name="status" />
            </FormControl>
            <Button type="submit" w={"100%"}>
              Update Status
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default SetStatusForm;
