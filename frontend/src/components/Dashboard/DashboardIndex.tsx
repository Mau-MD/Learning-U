import { Button, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import CourseCard from "./CourseCard";

const DashboardIndex = () => {
  return (
    <Container maxW="container.xl">
      <Flex flexDir={"column"} gap={4}>
        <Heading as="h1" fontWeight="bold" fontSize="4xl" mt={10}>
          Learning Dashboard
        </Heading>
        <Button w="fit-content">I want to learn something new...</Button>
        <Grid
          templateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap="1em"
          mt={10}
        >
          <CourseCard
            title="React Course"
            src="https://assets-global.website-files.com/61a0a53beeb118af7ddb4c55/61c0ba0267c18ebf1fd19b2f_maxresdefault-1-1-1024x576.jpeg"
            beginnerProgress={100}
            intermediateProgress={40}
            advancedProgress={10}
          />
          <CourseCard
            title="Node JS Course"
            src="https://assets-global.website-files.com/61a0a53beeb118af7ddb4c55/61c0ba0267c18ebf1fd19b2f_maxresdefault-1-1-1024x576.jpeg"
            beginnerProgress={60}
            intermediateProgress={10}
            advancedProgress={0}
          />
          <CourseCard
            title="Express Course"
            src="https://assets-global.website-files.com/61a0a53beeb118af7ddb4c55/61c0ba0267c18ebf1fd19b2f_maxresdefault-1-1-1024x576.jpeg"
            beginnerProgress={100}
            intermediateProgress={100}
            advancedProgress={90}
          />
        </Grid>
      </Flex>
    </Container>
  );
};

export default DashboardIndex;
