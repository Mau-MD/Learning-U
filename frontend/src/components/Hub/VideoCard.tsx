import { Box, Image } from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";

interface Props {
  src: string;
  title: string;
  href: string;
}

const VideoCard = ({ src, title, href }: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();
  return (
    <Box
      bg={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      cursor="pointer"
      transition={"all 0.3s"}
    >
      <Image src={src} w="full" />
      <Box p={4}>{title}</Box>
    </Box>
  );
};

export default VideoCard;
