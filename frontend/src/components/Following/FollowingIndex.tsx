import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";
import FollwingCard from "./FollwingCard";
import SetStatusForm from "./SetStatusForm";

const FollowingIndex = () => {
  const { backgroundColor, borderColor } = useThemeColor();
  return (
    <Box
      w="30%"
      h="85vh"
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
      <SetStatusForm />
      <VStack mt={5}>
        <FollwingCard username="clanie1" status="cool status" />
        <FollwingCard username="clinigambit" status="not cool" />
        <FollwingCard username="clinimove" status="yes" />
      </VStack>
    </Box>
  );
};

export default FollowingIndex;
