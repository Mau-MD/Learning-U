import * as React from "react";
import { Badge, Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import ResourceGroup from "./Hub/ResourceGroup";

const Home = () => {
  return (
    <Container maxW={"container.xl"} mt="2rem">
      <Heading as="h1" fontWeight={"bold"} fontSize={"4xl"}>
        React
      </Heading>
      <Badge>Beginner</Badge>
      <Box display={"flex"} flexDirection={"column"} gap={10} my={10}>
        <ResourceGroup title="🎥 Recommended Videos" />
        <ResourceGroup title="📚 Documentation to Read" />
        <ResourceGroup title="🎯 Projects to do" />
      </Box>
    </Container>
  );
};

export default Home;
