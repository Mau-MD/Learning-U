import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface Props {
  src: string;
}
const Banner = ({ src }: Props) => {
  const linearGradientColor = useColorModeValue(
    "linear-gradient(to bottom, rgba(255,0,0,0), rgba(255,255,255,1))",
    "linear-gradient(to bottom, rgba(255,0,0,0), rgba(26,32,44,1))"
  );
  return (
    <>
      <Box w="100%" h="40vh">
        <Image src={src} w="100%" h="100%" fit="cover" />
      </Box>
      {/* Makes the gradient effect */}
      <Box
        h="20vh"
        mt="-20vh"
        zIndex="5"
        position="relative"
        _after={{
          content: "''",
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundImage: linearGradientColor,
        }}
      />
    </>
  );
};

export default Banner;
