import { Box, Container, Flex, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import FollowingIndex from "./FollowingIndex";

const FollowingLayout = () => {
  return (
    <Container maxW={"container.xl"}>
      <Flex>
        <Outlet />
        <FollowingIndex />
      </Flex>
    </Container>
  );
};

export default FollowingLayout;
