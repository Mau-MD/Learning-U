import React from "react";
import { Badge, Box, Icon, Image, Text } from "@chakra-ui/react";
import { BiVideo } from "react-icons/bi";
import useThemeColor from "../../hooks/useThemeColor";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const badgeColor = getBadgeColor(status);

  return (
    <Box
      bg={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      cursor="pointer"
      transition={"all 0.3s"}
      onClick={() => navigate(href)}
    >
      <Image src={src} w="full" />
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
