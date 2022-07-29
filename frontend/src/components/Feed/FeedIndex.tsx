import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Spinner,
  Stack,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { createSearchParams } from "react-router-dom";
import { IPost } from "../../types/post";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import FeedCard from "./FeedCard";
import NewPostForm from "./NewPostForm";

const POST_PER_FETCH = 5;

interface Props {
  userId?: string;
}

const FeedIndex = ({ userId }: Props) => {
  const { user } = useSession();

  const [openFeedForm, setOpenFeedForm] = useState(false);

  const {
    data: posts,
    fetchNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery(
    `${userId ? "posts-" + userId : "posts"}`,
    async ({ pageParam = 0 }) => {
      if (!user) {
        throw new Error("User is not defined");
      }
      const url = userId ? `post/from/${userId}` : "post/following";

      const res = await axios.get<IPost[]>(
        `${baseURL}/${url}?${createSearchParams({
          limit: `${POST_PER_FETCH}`,
          skip: `${pageParam}`,
        })}`,
        getConfig(user?.sessionToken)
      );
      return { data: res.data, currentPage: pageParam };
    },
    {
      getNextPageParam: (params) => {
        if (params.data.length < POST_PER_FETCH) return undefined;
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

  const handlePageBottom = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isFetching
    ) {
      fetchNextPage();
    }
  };

  const renderCreatePostButton = () => {
    if (!userId || user?.objectId === userId)
      return (
        <Button mt={5} onClick={() => setOpenFeedForm(!openFeedForm)}>
          {openFeedForm ? "Close" : "Create a post"}
        </Button>
      );
    return <></>;
  };

  return (
    <Box w="100%" mt={userId ? 0 : 10}>
      <HStack gap={3}>
        <Heading>Feed</Heading>
        {isFetching && <Spinner />}
      </HStack>
      {renderCreatePostButton()}
      {openFeedForm && <NewPostForm />}
      {isLoading && (
        <Stack mt={10}>
          <Skeleton h={"120px"} />
          <Skeleton h={"120px"} />
          <Skeleton h={"120px"} />
        </Stack>
      )}
      <VStack my={10} gap={19}>
        {posts &&
          posts.pages.map((page) =>
            page.data.map((post) => (
              <FeedCard
                key={post.objectId}
                content={post.content}
                username={post.user.username}
                userId={post.user.objectId}
                createdAt={post.createdAt}
                courseId={post.course?.objectId}
                courseName={post.course?.name}
                courseCreatedAt={post.course?.createdAt}
              />
            ))
          )}
      </VStack>
      {isFetching && (
        <Center mb={5}>
          <Spinner />
        </Center>
      )}
    </Box>
  );
};

export default FeedIndex;
