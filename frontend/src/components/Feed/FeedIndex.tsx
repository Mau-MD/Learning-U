import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { IPost } from "../../types/post";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import FeedCard from "./FeedCard";
import NewPostForm from "./NewPostForm";

const FeedIndex = () => {
  const { user } = useSession();

  const [openFeedForm, setOpenFeedForm] = useState(false);

  const { data: posts } = useQuery(
    "posts",
    async () => {
      if (!user) {
        throw new Error("User is not defined");
      }

      const res = await axios.get<IPost[]>(
        `${baseURL}/post/me`,
        getConfig(user?.sessionToken)
      );
      return res.data;
    },
    { enabled: !!user }
  );

  return (
    <Container maxW="container.xl">
      <Heading mt={10}>Feed</Heading>
      <Button mt={5} onClick={() => setOpenFeedForm(!openFeedForm)}>
        {openFeedForm ? "Close" : "Create a post"}
      </Button>
      {openFeedForm && <NewPostForm />}
      <VStack mt={10} gap={19}>
        {posts &&
          posts.map((post) => (
            <FeedCard
              key={post.objectId}
              content={post.content}
              username={post.user.username}
              createdAt={post.createdAt}
              courseId={post.course?.objectId}
              courseName={post.course?.name}
              courseCreatedAt={post.course?.createdAt}
            />
          ))}
      </VStack>
    </Container>
  );
};

export default FeedIndex;
