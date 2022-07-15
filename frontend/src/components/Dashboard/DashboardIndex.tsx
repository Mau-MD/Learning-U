import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getConfig, useSession } from "../../utils/auth";
import CourseCard from "./CourseCard";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import { ICourse } from "../../types/course";
import LoadingCard from "../Loading/LoadingCard";

const DashboardIndex = () => {
  const navigate = useNavigate();
  const { isFetching, user } = useSession();

  const { data: courses } = useQuery(
    "courses",
    async () => {
      if (!user) throw new Error();

      const res = await axios.get<ICourse[]>(
        `${baseURL}/course/me`,
        getConfig(user?.sessionToken)
      );

      return res.data;
    },
    {
      enabled: !isFetching,
    }
  );

  return (
    <Container maxW="container.xl">
      <Flex flexDir={"column"} gap={4}>
        <Heading as="h1" fontWeight="bold" fontSize="4xl" mt={10}>
          Learning Dashboard
        </Heading>
        <Button w="fit-content" onClick={() => navigate("new")}>
          I want to learn something new...
        </Button>
        <Grid
          templateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap="1em"
          mt={10}
        >
          {!courses ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            courses.map((course) => (
              <CourseCard
                key={course.objectId}
                link={course.objectId}
                title={course.name}
                src="https://assets-global.website-files.com/61a0a53beeb118af7ddb4c55/61c0ba0267c18ebf1fd19b2f_maxresdefault-1-1-1024x576.jpeg"
                beginnerProgress={100}
                intermediateProgress={40}
                advancedProgress={10}
              />
            ))
          )}
        </Grid>
      </Flex>
    </Container>
  );
};

export default DashboardIndex;
