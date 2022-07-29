import {
  Box,
  Button,
  Heading,
  HStack,
  Skeleton,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import useThemeColor from "../../hooks/useThemeColor";
import { IFollowing } from "../../types/following";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import FollowForm from "./FollowForm";
import FollowingCard from "./FollowingCard";
import SetStatusForm from "./SetStatusForm";

interface Props {
  width: string;
  margin: number;
  userId?: string;
}

const FollowingIndex = ({ width = "30%", margin = 10, userId }: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();
  const { user } = useSession();

  const [tabSelected, setTabSelected] = useState<"none" | "status" | "follow">(
    "none"
  );

  const {
    data: status,
    isFetching,
    isLoading,
  } = useQuery(
    `${userId ? "following-" + userId : "following"}`,
    async () => {
      if (!user) throw new Error("User not defined");

      const url = userId
        ? `follow/status/by/${userId}`
        : "follow/following/status";
      const res = await axios.get<IFollowing[]>(
        `${baseURL}/${url}`,
        getConfig(user.sessionToken)
      );
      return res.data;
    },
    { enabled: !!user }
  );

  const handleTabChange = (tab: "none" | "status" | "follow") => {
    if (tabSelected === tab) {
      setTabSelected("none");
      return;
    }
    setTabSelected(tab);
  };

  return (
    <Box
      w={width}
      h="85vh"
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      padding={5}
      margin={margin}
      marginRight={0}
    >
      <HStack gap={2}>
        <Heading size={"md"} as={"h2"}>
          Following
        </Heading>
        {isFetching && <Spinner />}
      </HStack>

      {!userId && (
        <HStack w={"100%"} mt={5}>
          <Button
            w={"100%"}
            onClick={() => handleTabChange("status")}
            isActive={tabSelected === "status"}
          >
            Status
          </Button>
          <Button
            w={"100%"}
            onClick={() => handleTabChange("follow")}
            isActive={tabSelected === "follow"}
          >
            Follow
          </Button>
        </HStack>
      )}
      {tabSelected === "status" && <SetStatusForm />}
      {tabSelected === "follow" && <FollowForm />}
      {isLoading && (
        <Stack mt={5}>
          <Skeleton h="60px" />
          <Skeleton h="60px" />
          <Skeleton h="60px" />
        </Stack>
      )}

      <VStack mt={5}>
        {status &&
          status.map((followingStatus) => (
            <FollowingCard
              key={followingStatus.objectId}
              username={followingStatus.user.username}
              status={followingStatus.status}
              userId={followingStatus.user.objectId}
              showDeleteButton={!userId}
            />
          ))}
      </VStack>
    </Box>
  );
};

export default FollowingIndex;
