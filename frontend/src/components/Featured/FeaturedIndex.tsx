import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import CourseCard from "../Dashboard/CourseCard";
import DashboardIndex, { FALLBACK_IMG } from "../Dashboard/DashboardIndex";
import Banner from "../Hub/Banner";
import LoadingCard from "../Loading/LoadingCard";

const FeaturedIndex = () => {
  return (
    <>
      <Banner src="https://images.unsplash.com/photo-1514820720301-4c4790309f46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80" />
      <Container maxW={"container.xl"}>
        <Flex flexDir={"column"} gap={4}>
          <Heading as="h1" fontWeight="bold" fontSize="4xl" mt={10}>
            Featured Courses
          </Heading>
          <Text>Courses submitted by the community </Text>
          <HStack>
            <Button>Submit an existing course</Button>
            <Button>Create a new course</Button>
          </HStack>
          <Grid
            templateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
            gap="1em"
            mt={10}
            mb={"200px"}
          >
            <CourseCard
              link={""}
              title={"hola"}
              src={FALLBACK_IMG}
              createdAt={new Date().toString()}
              cloneButton
            />
          </Grid>
        </Flex>
      </Container>
    </>
  );
};

export default FeaturedIndex;
