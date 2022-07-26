import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const SetStatusForm = () => {
  return (
    <VStack mt={4}>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <Input />
      </FormControl>
      <Button w={"100%"}>Update Status</Button>
    </VStack>
  );
};

export default SetStatusForm;
