import { Container, Box, Heading } from "@chakra-ui/react";
import React from "react";
import Banner from "../Hub/Banner";
import DifficultyCard from "./DifficultyCard";

const DifficultyIndex = () => {
  return (
    <>
      <Banner src="https://miro.medium.com/max/1838/1*uE1kDeKaMnZaZLLJzHm0QA.png" />
      <Container maxW={"container.xl"} mt="2rem">
        <Heading as="h1" fontWeight="bold" fontSize="4xl">
          React
        </Heading>
        <Box display="flex" flexDir="column" my="1em" gap="1em">
          <DifficultyCard
            title="Beginners"
            progress={20}
            src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            phrase="You can do it!"
            started
          />
          <DifficultyCard
            title="Intermediate"
            progress={10}
            src="https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            phrase="Let's learn something new today"
            started
          />
          <DifficultyCard
            title="Advanced"
            progress={0}
            src="https://images.unsplash.com/photo-1569748130764-3fed0c102c59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            phrase="Let's go"
          />
        </Box>
      </Container>
    </>
  );
};

export default DifficultyIndex;
