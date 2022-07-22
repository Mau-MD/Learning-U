import { Box, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { IResource } from "../../types/resource";
import DocsCard from "./DocsCard";
import VideoCard from "./VideoCard";

interface Props {
  title: string;
  kind: "video" | "documentation" | "both";
  data: IResource[];
}

const ResourceGroup = ({ title, kind, data }: Props) => {
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
        {kind === "video" &&
          data &&
          data.map((resource) => (
            <VideoCard
              objectId={resource.objectId}
              key={resource.objectId}
              title={resource.title}
              src={resource.type === "video" ? resource.thumbnail : ""}
              status={resource.status}
              href={resource.url}
            />
          ))}
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
