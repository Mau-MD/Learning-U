import {
  Box,
  FormControl,
  Textarea,
  Button,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useQuery } from "react-query";
import { ICourse } from "../../types/course";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import { Select } from "chakra-react-select";

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
    console.log(values);
  };

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
