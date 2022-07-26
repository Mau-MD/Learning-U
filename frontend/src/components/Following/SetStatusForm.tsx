import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

interface StatusForm {
  status: string;
}

const schema = Yup.object({
  status: Yup.string().required("Status is required"),
});

const SetStatusForm = () => {
  const handleFormSubmit = (values: StatusForm) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ status: "" }}
      onSubmit={handleFormSubmit}
      validationSchema={schema}
    >
      {({ errors, touched }) => (
        <Form>
          <VStack mt={4}>
            <FormControl isInvalid={touched.status && !!errors.status}>
              <FormLabel>Status</FormLabel>
              <Field as={Input} name="status" />
              <FormErrorMessage>{errors.status}</FormErrorMessage>
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
