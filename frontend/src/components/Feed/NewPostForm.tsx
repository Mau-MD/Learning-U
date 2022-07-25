import {
  Box,
  FormControl,
  Textarea,
  Select,
  Button,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const NewPostForm = () => {
  return (
    <VStack mt={5}>
      <FormControl>
        <FormLabel>Write anything below!</FormLabel>
        <Textarea />
      </FormControl>
      <FormControl>
        <FormLabel>Select a Course</FormLabel>
        <Select>Select a course</Select>
      </FormControl>
      <Button>Submit</Button>
    </VStack>
  );
};

export default NewPostForm;
