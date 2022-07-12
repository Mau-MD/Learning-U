import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Popover from "../Popover/Popover";
import Tooltip from "../Popover/Tooltip";
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
          <Tooltip
            render={
              <Popover
                courseName="React Course"
                beginnerProgress={50}
                intermediateProgress={20}
                advancedProgress={0}
              />
            }
          >
            <div>
              <CourseCard />
            </div>
          </Tooltip>
          <CourseCard />
          <CourseCard />
        </Grid>
      </Flex>
    </Container>
  );
};

export default DashboardIndex;
