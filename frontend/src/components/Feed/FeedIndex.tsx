import { Button, Container, Heading, VStack } from "@chakra-ui/react";
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
const FeedIndex = () => {
  const { user } = useSession();

  const [openFeedForm, setOpenFeedForm] = useState(false);

  const {
    data: posts,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    "posts",
    async ({ pageParam = 0 }) => {
      if (!user) {
        throw new Error("User is not defined");
      }

      const res = await axios.get<IPost[]>(
        `${baseURL}/post/me?${createSearchParams({
          limit: `${POST_PER_FETCH}`,
          skip: `${pageParam}`,
        })}`,
        getConfig(user?.sessionToken)
      );
      return { data: res.data, currentPage: pageParam };
    },
    {
      getNextPageParam: (params) => {
        return params.currentPage + POST_PER_FETCH;
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

  return (
    <Container maxW="container.xl">
      <Heading mt={10}>Feed</Heading>
      <Button mt={5} onClick={() => setOpenFeedForm(!openFeedForm)}>
        {openFeedForm ? "Close" : "Create a post"}
      </Button>
      {openFeedForm && <NewPostForm />}
      <VStack mt={10} gap={19}>
        {posts &&
          posts.pages.map((page) =>
            page.data.map((post) => (
              <FeedCard
                key={post.objectId}
                content={post.content}
                username={post.user.username}
                createdAt={post.createdAt}
                courseId={post.course?.objectId}
                courseName={post.course?.name}
                courseCreatedAt={post.course?.createdAt}
              />
            ))
          )}
      </VStack>
    </Container>
  );
};

export default FeedIndex;
