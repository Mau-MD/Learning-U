import React from "react";
import { Badge, Box, Icon, Image, Text } from "@chakra-ui/react";
import { BiVideo } from "react-icons/bi";
import useThemeColor from "../../hooks/useThemeColor";
import { Link, useNavigate } from "react-router-dom";

type ResourceStatus = "completed" | "in progress" | "not started";
interface Props {
  src: string;
  title: string;
  href: string;
  status: ResourceStatus;
}

const getBadgeColor = (status: ResourceStatus) => {
  if (status === "completed") return "green";
  if (status === "in progress") return "blue";
  if (status === "not started") return "gray";
  return "gray";
};

const VideoCard = ({ src, title, href, status }: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  const badgeColor = getBadgeColor(status);

  return (
    <Box
      bg={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      transition={"all 0.3s"}
    >
      <a href={href} target="_blank" rel="noreferrer">
        <Box w="100%" h="220px">
          <Image
            src={src}
            w="full"
            h="full"
            objectFit="cover"
            cursor="pointer"
          />
        </Box>
      </a>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={3}
        p={4}
      >
        <Box display="flex" alignItems="center" gap={3}>
          <Icon as={BiVideo} />
          <Text>{title}</Text>
        </Box>
        <Badge colorScheme={badgeColor}>{status}</Badge>
      </Box>
    </Box>
  );
};

export default VideoCard;
