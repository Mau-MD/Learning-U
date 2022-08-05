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
import { Field, Form, Formik, FormikProps } from "formik";
import React, { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
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
  const formikRef = useRef<FormikProps<StatusForm> | null>(null);
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries("following");
        formikRef.current?.resetForm();
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
      innerRef={(ref) => (formikRef.current = ref)}
    >
      {({ errors, touched }) => (
        <Form>
          <VStack mt={4}>
            <FormControl isInvalid={touched.status && !!errors.status}>
              <FormLabel>Status</FormLabel>
              <Field as={Input} name="status" />
              <FormErrorMessage>{errors.status}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w={"100%"} isLoading={setStatus.isLoading}>
              Update Status
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default SetStatusForm;
