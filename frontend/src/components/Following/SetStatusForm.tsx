import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { ErrorType } from "../../types/requests";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";

interface StatusForm {
  status: string;
}

const schema = Yup.object({
  status: Yup.string().required("Status is required"),
});

const SetStatusForm = () => {
  const toast = useToast();
  const { user } = useSession();

  const handleFormSubmit = (values: StatusForm) => {
    setStatus.mutate(values.status);
  };

  const setStatus = useMutation(
    async (status: string) => {
      if (!user) throw new Error("User is not defined");

      const res = await axios.post(
        `${baseURL}/follow/status`,
        { status },
        getConfig(user?.sessionToken)
      );
      return res.data;
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: `Your status has been updated`,
          status: "success",
        });
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
