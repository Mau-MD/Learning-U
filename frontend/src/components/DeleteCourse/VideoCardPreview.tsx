import { Box, Text, Icon, Image } from "@chakra-ui/react";
import React from "react";
import { BiVideo } from "react-icons/bi";
import useThemeColor from "../../hooks/useThemeColor";

interface Props {
  src: string;
  title: string;
  active?: boolean;
  objectId: string;
  onClick?: (objectId: string) => void;
}
const VideoCardPreview = ({
  src,
  title,
  objectId,
  onClick,
  active = false,
}: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  return (
    <Box
      bg={backgroundColor}
      borderColor={active ? "blue.500" : borderColor}
      borderWidth={active ? 5 : 1}
      borderRadius={4}
      transition={"all 0.3s"}
      onClick={() => onClick && onClick(objectId)}
    >
      <Box w="100%" h="150px">
        <Image
          src={src}
          h="full"
          w="full"
          objectFit="cover"
          cursor={onClick ? "pointer" : "default"}
        />
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

export default VideoCardPreview;
