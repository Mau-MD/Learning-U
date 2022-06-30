import { Box, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import VideoCard from "./VideoCard";

interface Props {
  title: string;
}

const ResourceGroup = ({ title }: Props) => {
  return (
    <Box>
      <Heading as="h2" fontSize="xl" mb={3}>
        {title}
      </Heading>
      <Grid templateColumns={"repeat(3, 1fr)"} gap="1em">
        <VideoCard
          title="React Beginners Tutorial"
          src="https://assets-global.website-files.com/61a0a53beeb118af7ddb4c55/61c0ba0267c18ebf1fd19b2f_maxresdefault-1-1-1024x576.jpeg"
          href=""
        />
        <VideoCard
          title="React Beginners Tutorial"
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/youtube-thumbnail-design-template-f41731052ef38859a77214e2be972d69_screen.jpg?ts=1630950507"
          href=""
        />
        <VideoCard
          title="React Beginners Tutorial"
          src="https://assets-global.website-files.com/61a0a53beeb118af7ddb4c55/61c0ba0267c18ebf1fd19b2f_maxresdefault-1-1-1024x576.jpeg"
          href=""
        />
      </Grid>
    </Box>
  );
};

export default ResourceGroup;
