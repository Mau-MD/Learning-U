import {
  Container,
  Box,
  Heading,
  Badge,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import React from "react";
import Banner from "./Banner";
import ResourceGroup from "./ResourceGroup";

const HubIndex = () => {
  return (
    <>
      <Banner src="https://miro.medium.com/max/1838/1*uE1kDeKaMnZaZLLJzHm0QA.png" />
      <Container maxW={"container.xl"} mt="2rem">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Heading as="h1" fontWeight="bold" fontSize="4xl" id="title">
              React
            </Heading>
            <Badge>Beginner</Badge>
          </Box>
          <CircularProgress value={30} size={"60px"}>
            <CircularProgressLabel>30%</CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Box display="flex" flexDirection="column" gap={10} my={10}>
          <ResourceGroup title="🎥 Recommended Videos" kind="video" />
          <ResourceGroup
            title="📚 Documentation to Read"
            kind="documentation"
          />
          <ResourceGroup title="🎯 Projects to do" kind="video" />
        </Box>
      </Container>
    </>
  );
};

export default HubIndex;
