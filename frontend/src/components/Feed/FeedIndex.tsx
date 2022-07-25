import { Box, Container, VStack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { IPost } from "../../types/post";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import FeedCard from "./FeedCard";

const FeedIndex = () => {
  const { user } = useSession();

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
      <VStack mt={10} gap={19}>
        {posts &&
          posts.map((post) => (
            <FeedCard key={post.objectId} content={post.content} />
          ))}
      </VStack>
    </Container>
  );
};

export default FeedIndex;
