import {
  Box,
  FormControl,
  Textarea,
  Button,
  FormLabel,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ICourse } from "../../types/course";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import { Select } from "chakra-react-select";
import { ErrorType } from "../../types/requests";

interface PostValues {
  content: string;
  course: { value: string; label: string };
}

const emptySelect = {
  value: "",
  label: "No course",
};

const NewPostForm = () => {
  const { user } = useSession();
  const toast = useToast();
  const queryClient = useQueryClient();

  const convertCoursesToValueLabel = (courses: ICourse[]) => {
    return courses.map((course) => {
      return {
        value: course.objectId,
        label: course.name,
      };
    });
  };

  const { data: courses } = useQuery(
    "courses",
    async () => {
      if (!user) throw new Error();

      const res = await axios.get<ICourse[]>(
        `${baseURL}/course/me`,
        getConfig(user?.sessionToken)
      );

      return convertCoursesToValueLabel(res.data);
    },
    {
      enabled: !!user,
    }
  );

  const handleFormSubmit = (values: PostValues) => {
    uploadPost.mutate(values);
  };

  const uploadPost = useMutation(
    async (values: PostValues) => {
      if (!user) throw new Error("User not defined");
      const res = await axios.post(
        `${baseURL}/post`,
        {
          content: values.content,
          courseId: values.course.value,
        },
        getConfig(user.sessionToken)
      );
      return res.data;
    },
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Post created!",
          description: "The post has successfully been created",
          isClosable: true,
        });
        queryClient.invalidateQueries("posts");
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
      initialValues={{ content: "", course: emptySelect }}
      onSubmit={handleFormSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <VStack mt={5}>
            <FormControl>
              <FormLabel>Write anything below!</FormLabel>
              <Field as={Textarea} name="content" />
            </FormControl>
            <FormControl>
              <FormLabel>Select a Course</FormLabel>
              <Select
                options={courses}
                value={values.course}
                onChange={(value) => setFieldValue("course", value)}
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;
