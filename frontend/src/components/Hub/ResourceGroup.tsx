import { Badge, Box, Grid, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTour } from "../../hooks/useTour";
import { IResource } from "../../types/resource";
import GuidedPopover from "../GuidedPopover/GuidedPopover";
import DocsCard from "./DocsCard";
import VideoCard from "./VideoCard";

interface Props {
  title: string;
  data: IResource[];
  courseId: string;
  courseName: string;
}

const ResourceGroup = ({ title, data, courseId, courseName }: Props) => {
  const { currStep, prevStep, nextStep, stepNum } = useTour(
    [
      {
        title: "Video Tutorials!",
        content:
          "These are the videos that were generated. Try to watch them all!",
      },
      {
        title: "In progress status",
        content: "Clicking a video will automatically mark it as In Progress.",
      },
      {
        title: "Finished status",
        content: (
          <Text>
            Click on this <Badge colorScheme="blue">In progress</Badge> badge to
            mark the video as <Badge colorScheme={"green"}>Completed</Badge>.
          </Text>
        ),
      },
    ],
    "hub"
  );

  return (
    <Box>
      <GuidedPopover
        content={currStep.content}
        title={currStep.title}
        isOpen={stepNum === 0}
        prevStep={prevStep}
        onClose={nextStep}
      >
        <Heading as="h2" fontSize="xl" mb={3}>
          {title}
        </Heading>
      </GuidedPopover>
      <GuidedPopover
        content={currStep.content}
        title={currStep.title}
        isOpen={stepNum === 1 || stepNum === 2}
        prevStep={prevStep}
        onClose={nextStep}
      >
        {/* See https://chakra-ui.com/docs/styled-system/responsive-styles */}
        <Grid
          templateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap="1em"
        >
          {data &&
            data.map((resource) => (
              <VideoCard
                key={resource.objectId}
                objectId={resource.objectId}
                title={resource.title}
                src={resource.thumbnail}
                status={resource.status}
                href={resource.url}
                courseId={courseId}
                courseName={courseName}
              />
            ))}
        </Grid>
      </GuidedPopover>
    </Box>
  );
};

export default ResourceGroup;
