import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  VStack,
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
import NoData from "./NoData";

export const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";

const DashboardIndex = () => {
  const navigate = useNavigate();
  const { isFetching, user } = useSession();

  const { data: courses, isLoading } = useQuery(
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
        {courses && courses.length === 0 && <NoData />}
        <Grid
          templateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap="1em"
          mt={10}
          mb={"200px"}
        >
          {isLoading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            courses &&
            courses.map((course) => (
              <CourseCard
                key={course.objectId}
                link={course.objectId}
                title={course.name}
                src={
                  course.images
                    ? course.images[2]
                      ? course.images[2].regular
                      : FALLBACK_IMG
                    : FALLBACK_IMG
                }
              />
            ))
          )}
        </Grid>
      </Flex>
    </Container>
  );
};

export default DashboardIndex;
