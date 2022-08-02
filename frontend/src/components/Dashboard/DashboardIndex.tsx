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
  Input,
  Skeleton,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getConfig, useSession } from "../../utils/auth";
import CourseCard from "./CourseCard";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import { ICourse } from "../../types/course";
import LoadingCard from "../Loading/LoadingCard";
import NoData from "./NoData";
import { debounce } from "../../utils/debounce";

export const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";

const COURSES_PER_FETCH = 6;
const DashboardIndex = () => {
  const navigate = useNavigate();
  const { user } = useSession();

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: courses,
    fetchNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery(
    ["courses", searchQuery],
    async ({ pageParam = 0 }) => {
      if (!user) {
        throw new Error("User is not defined");
      }
      const res = await axios.get<ICourse[]>(
        `${baseURL}/course/me?${createSearchParams({
          limit: `${COURSES_PER_FETCH}`,
          skip: `${pageParam}`,
          query: searchQuery,
        })}`,
        getConfig(user?.sessionToken)
      );

      return { data: res.data, currentPage: pageParam };
    },
    {
      getNextPageParam: (params) => {
        if (params.data.length < COURSES_PER_FETCH) return undefined;
        return params.currentPage + params.data.length;
      },
      enabled: !!user,
    }
  );

  useEffect(() => {
    window.addEventListener("scroll", handlePageBottom);

    return () => {
      window.removeEventListener("scroll", handlePageBottom);
    };
  }, []);

  const handlePageBottom = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isFetching
    ) {
      fetchNextPage();
    }
  }, 500);

  const handleSearchChange = debounce(
    (query: string) => setSearchQuery(query.toLocaleLowerCase()),
    300
  );

  return (
    <Container maxW="container.xl">
      <Flex flexDir={"column"} gap={4}>
        <Heading as="h1" fontWeight="bold" fontSize="4xl" mt={10}>
          Learning Dashboard
        </Heading>
        <Input
          placeholder="Search here!"
          onChange={(e) => handleSearchChange(e.currentTarget.value)}
        />
        <Button
          w="fit-content"
          onClick={() => navigate("new")}
          test-id="create-course-btn"
        >
          I want to learn something new...
        </Button>
        {courses && courses.pages[0].data.length === 0 && <NoData />}
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
            courses.pages.map((page) =>
              page.data.map((course) => (
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
            )
          )}
          {isFetching && (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          )}
        </Grid>
      </Flex>
    </Container>
  );
};

export default DashboardIndex;
