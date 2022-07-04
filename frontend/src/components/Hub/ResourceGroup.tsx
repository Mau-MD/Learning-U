import { Box, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import DocsCard from "./DocsCard";
import VideoCard from "./VideoCard";

interface Props {
  title: string;
  kind: "video" | "documentation" | "both";
}

const ResourceGroup = ({ title, kind }: Props) => {
  return (
    <Box>
      <Heading as="h2" fontSize="xl" mb={3}>
        {title}
      </Heading>
      {/* See https://chakra-ui.com/docs/styled-system/responsive-styles */}
      <Grid
        templateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap="1em"
      >
        {kind === "video" && (
          <>
            <VideoCard
              title="React Beginners Tutorial"
              src="https://assets-global.website-files.com/61a0a53beeb118af7ddb4c55/61c0ba0267c18ebf1fd19b2f_maxresdefault-1-1-1024x576.jpeg"
              status="completed"
              href=""
            />
            <VideoCard
              title="React Beginners Tutorial"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/youtube-thumbnail-design-template-f41731052ef38859a77214e2be972d69_screen.jpg?ts=1630950507"
              status="in progress"
              href=""
            />
            <VideoCard
              title="React Beginners Tutorial"
              src="https://assets-global.website-files.com/61a0a53beeb118af7ddb4c55/61c0ba0267c18ebf1fd19b2f_maxresdefault-1-1-1024x576.jpeg"
              href=""
              status="not started"
            />
          </>
        )}
        {kind === "documentation" && (
          <>
            <DocsCard title="React beginner tutorial" href="yes" />
            <DocsCard title="React beginner tutorial" href="yes" />
            <DocsCard title="React beginner tutorial" href="yes" />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ResourceGroup;
