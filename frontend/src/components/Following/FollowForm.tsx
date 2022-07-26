import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { ErrorType } from "../../types/requests";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";

interface FollowForm {
  username: string;
}

const schema = Yup.object({
  username: Yup.string().required("Username is required"),
});

const FollowForm = () => {
  const toast = useToast();
  const { user } = useSession();

  const handleSubmit = (values: FollowForm) => {
    followUser.mutate(values.username);
  };

  const followUser = useMutation(
    async (username: string) => {
      if (!user) throw new Error("User is not defined");

      const res = await axios.post(
        `${baseURL}/follow/followUser/${username}`,
        null,
        getConfig(user?.sessionToken)
      );
      return username;
    },
    {
      onSuccess: (username) => {
        toast({
          title: "Succes",
          description: `You are now following ${username}`,
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
