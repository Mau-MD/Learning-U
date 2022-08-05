import React from "react";
import { Badge, Box, Icon, Image, Text } from "@chakra-ui/react";
import { BiVideo } from "react-icons/bi";
import useThemeColor from "../../hooks/useThemeColor";
import Tooltip from "../Popover/Tooltip";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import { useParams, useSearchParams } from "react-router-dom";
import { getConfig, useSession } from "../../utils/auth";
import { ResourceStatus } from "../../types/enums";

interface Props {
  objectId: string;
  src: string;
  title: string;
  href: string;
  status: ResourceStatus;
  courseId: string;
  courseName: string;
}

const getBadgeColor = (status: ResourceStatus) => {
  if (status === ResourceStatus.Completed) return "green";
  if (status === ResourceStatus.InProgress) return "blue";
  if (status === ResourceStatus.NotStarted) return "gray";
  return "gray";
};

const VideoCard = ({
  src,
  title,
  href,
  status,
  objectId,
  courseId,
  courseName,
}: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  const badgeColor = getBadgeColor(status);
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const difficulty = searchParams.get("difficulty");

  const { user } = useSession();

  const updateVideoStatus = useMutation(
    async (status: ResourceStatus) => {
      if (!user) throw new Error("No user");
      const res = await axios.put(
        `${baseURL}/resources/updateStatus/${objectId}`,
        { status, resourceName: title, courseName, courseId },
        getConfig(user?.sessionToken)
      );
      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`hub-${id}-${difficulty}`);
      },
      onError: () => {
        alert("error");
      },
    }
  );

  const handleUpdateVideoStatus = (status: ResourceStatus) => {
    updateVideoStatus.mutate(status);
  };

  const getStatusText = (status: ResourceStatus) => {
    switch (status) {
      case ResourceStatus.NotStarted:
        return "Not Started";
      case ResourceStatus.InProgress:
        return "In Progress";
      case ResourceStatus.Completed:
        return "Completed";
    }
  };

  return (
    <Box
      bg={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      transition={"all 0.3s"}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          status === ResourceStatus.NotStarted &&
          handleUpdateVideoStatus(ResourceStatus.InProgress)
        }
      >
        <Tooltip
          render={
            <Box
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              borderWidth={1}
              p={2}
              borderRadius={4}
              boxShadow={"0px 10px 15px -3px rgba(0,0,0,0.3)"}
            >
              {title}
            </Box>
          }
        >
          <Box w="100%" h="220px">
            <Image
              src={src}
              w="full"
              h="full"
              objectFit="cover"
              cursor="pointer"
            />
          </Box>
        </Tooltip>
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
          <Text noOfLines={1}>{title}</Text>
        </Box>
        <Tooltip
          space={-10}
          render={
            status !== ResourceStatus.Completed ? (
              <Box
                backgroundColor={backgroundColor}
                borderColor={borderColor}
                borderWidth={1}
                p={2}
                borderRadius={4}
                boxShadow={"0px 10px 15px -3px rgba(0,0,0,0.3)"}
              >
                Mark as completed?
              </Box>
            ) : (
              <></>
            )
          }
        >
          <Badge
            colorScheme={badgeColor}
            cursor="pointer"
            onClick={() =>
              status !== ResourceStatus.Completed &&
              handleUpdateVideoStatus(ResourceStatus.Completed)
            }
          >
            {getStatusText(status)}
          </Badge>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default VideoCard;
