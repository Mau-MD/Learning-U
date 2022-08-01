import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Banner from "../Hub/Banner";
import * as Yup from "yup";

const CourseFromScratchIndex = () => {
  return (
    <>
      <Banner src="https://images.unsplash.com/photo-1521302200778-33500795e128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" />
      <Container maxW="container.xl" my={10}>
        <Heading as="h1">Create a new course from scratch!</Heading>
        <Text>
          Here you can add your own custom Youtube Tutorials and share your
          course to the public!
        </Text>

        <Flex gap={5} mt={10}>
          <VStack w="full">
            <Badge size={"large"}>Beginners Course</Badge>
            <FormControl>
              <FormLabel>Youtube Tutorial #1</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Youtube Tutorial #2</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Youtube Tutorial #3</FormLabel>
              <Input />
            </FormControl>
          </VStack>
          <VStack w="full">
            <Badge size={"large"}>Advanced Course</Badge>
            <FormControl>
              <FormLabel>Youtube Tutorial #1</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Youtube Tutorial #2</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Youtube Tutorial #3</FormLabel>
              <Input />
            </FormControl>
          </VStack>
        </Flex>
        <Button colorScheme={"green"} w="100%" mt={10}>
          Create Course
        </Button>
      </Container>
    </>
  );
};

export default CourseFromScratchIndex;
