import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import React from "react";

const FollowForm = () => {
  return (
    <VStack mt={4}>
      <FormControl>
        <FormLabel>Follow someone</FormLabel>
        <Input />
      </FormControl>
      <Button w={"100%"}>Follow!</Button>
    </VStack>
  );
};

export default FollowForm;
