import { Box, Container, Flex, Header, Heading } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import useThemeColor from "../../hooks/useThemeColor";

const FollowingLayout = () => {
  const { backgroundColor, borderColor } = useThemeColor();
  return (
    <Container maxW={"container.xl"}>
      <Flex>
        <Outlet />
        <Box
          w="30%"
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          borderWidth={1}
          padding={5}
          margin={10}
          marginRight={0}
        >
          <Heading size={"md"} as={"h2"}>
            Following
          </Heading>
        </Box>
      </Flex>
    </Container>
  );
};

export default FollowingLayout;
