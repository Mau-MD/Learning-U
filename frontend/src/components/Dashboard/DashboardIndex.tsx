import { Button, Container, Flex, Heading, VStack } from "@chakra-ui/react";
import React from "react";

const DashboardIndex = () => {
  return (
    <Container maxW="container.xl">
      <Flex flexDir={"column"} gap={4}>
        <Heading as="h1" fontWeight="bold" fontSize="4xl" mt={10}>
          Learning Dashboard
        </Heading>
        <Button w="fit-content">I want to learn something new...</Button>
      </Flex>
    </Container>
  );
};

export default DashboardIndex;
