import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import Banner from "../Hub/Banner";

const NewCourseIndex = () => {
  return (
    <>
      <Banner src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" />
      <Container maxW="container.xl">
        <Heading as="h1" fontWeight="bold" fontSize="4xl" mt={10}>
          Let{"'"}s learn something new!
        </Heading>
        <Flex flexDir="column" gap={10}>
          <FormControl mt={10}>
            <FormLabel>What do you want to learn?</FormLabel>
            <Input />
          </FormControl>
          <Button w="100%" colorScheme="green">
            Generate Course!
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default NewCourseIndex;
