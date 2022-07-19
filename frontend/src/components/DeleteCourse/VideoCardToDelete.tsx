import { Box, Text, Icon, Image } from "@chakra-ui/react";
import React from "react";
import { BiVideo } from "react-icons/bi";
import useThemeColor from "../../hooks/useThemeColor";

interface Props {
  src: string;
  title: string;
}
const VideoCardToDelete = ({ src, title }: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  return (
    <Box
      bg={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      transition={"all 0.3s"}
    >
      <Box w="100%" h="220px">
        <Image src={src} w="full" h="full" objectFit="cover" cursor="pointer" />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={3}
        p={4}
      >
        <Box display="flex" alignItems="center" gap={3}>
          <Icon as={BiVideo} />
          <Text noOfLines={1}>{title}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoCardToDelete;
