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
import { Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ICourse } from "../../types/course";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import { Select } from "chakra-react-select";
import { ErrorType } from "../../types/requests";
import { createSearchParams } from "react-router-dom";
import { useTour } from "../../hooks/useTour";
import GuidedPopover from "../GuidedPopover/GuidedPopover";

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
  const formikRef = useRef<FormikProps<PostValues> | null>(null);

  const { currStep, prevStep, nextStep, stepNum, startTour } = useTour([
    {
      title: "Feed",
      content: "Here you can post about anything. Be creative!",
    },
    {
      title: "Course linking",
      content:
        "You can even link your courses here, so your followers can clone it if they want to!",
    },
    {
      title: "Automatic posting",
      content:
        "Whenever you mark a Tutorial as completed, a post will be published here with the course linked.",
    },
  ]);

  useEffect(() => {
    startTour();
  }, []);

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
        `${baseURL}/course/me?${createSearchParams({
          skip: "0",
          limit: "100",
          query: "",
        })}`,
        getConfig(user?.sessionToken)
      );

      console.log(res.data);
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
      initialValues={{ content: "", course: emptySelect }}
      onSubmit={handleFormSubmit}
      innerRef={(ref) => (formikRef.current = ref)}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <VStack mt={5}>
            <GuidedPopover
              content={currStep.content}
              title={currStep.title}
              isOpen={stepNum === 0}
              onClose={nextStep}
            >
              <FormControl>
                <FormLabel>Write anything below!</FormLabel>
                <Field
                  as={Textarea}
                  name="content"
                  test-id="new-post-textarea"
                />
              </FormControl>
            </GuidedPopover>
            <GuidedPopover
              content={currStep.content}
              title={currStep.title}
              isOpen={stepNum === 1}
              prevStep={prevStep}
              onClose={nextStep}
            >
              <FormControl>
                <FormLabel>Select a Course</FormLabel>
                <Select
                  options={courses}
                  value={values.course}
                  onChange={(value) => setFieldValue("course", value)}
                />
              </FormControl>
            </GuidedPopover>
            <GuidedPopover
              content={currStep.content}
              title={currStep.title}
              isOpen={stepNum === 2}
              prevStep={prevStep}
              onClose={nextStep}
            >
              <FormControl>
                <Button
                  type="submit"
                  w="100%"
                  mt={3}
                  colorScheme="blue"
                  isLoading={uploadPost.isLoading}
                  test-id="new-post-submit-btn"
                >
                  Submit
                </Button>
              </FormControl>
            </GuidedPopover>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;
