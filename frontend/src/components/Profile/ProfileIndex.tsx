import {
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useThemeColor from "../../hooks/useThemeColor";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import FeedIndex from "../Feed/FeedIndex";
import FollowingIndex from "../Following/FollowingIndex";

const ProfileIndex = () => {
  const { backgroundColor, borderColor, invertedBackgroundColor } =
    useThemeColor();

  const { id } = useParams();
  const { user } = useSession();

  const { data: profile } = useQuery(
    `${id}`,
    async () => {
      if (!user) throw new Error("User not defined");
      const res = await axios.get(
        `${baseURL}/user/by/${id}`,
        getConfig(user?.sessionToken)
      );
      return res.data;
    },
    { enabled: !!user }
  );

  const { data: status } = useQuery(
    `status-${id}`,
    async () => {
      if (!user) throw new Error("User not defined");
      const res = await axios.get(
        `${baseURL}/follow/status/${id}`,
        getConfig(user?.sessionToken)
      );
      return res.data;
    },
    { enabled: !!user }
  );

  return (
    <Container maxW="container.xl" id="profile">
      <Flex mt={4} gap={10}>
        <Box w={"30%"}>
          <VStack
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            borderWidth={1}
            borderRadius={4}
            h={"30vh"}
            py={10}
            px={4}
            gap={3}
            mb={5}
          >
            <Avatar name={profile.username} />
            {profile && (
              <VStack>
                <Heading size={"md"}>{profile.username}</Heading>
                <Text>{profile.email}</Text>
              </VStack>
            )}
            {status && (
              <Box
                backgroundColor={invertedBackgroundColor}
                borderColor={borderColor}
                borderWidth={1}
                borderRadius={4}
                textAlign="center"
                w={"90%"}
                px={4}
                py={2}
              >
                {status.status}
              </Box>
            )}
          </VStack>
          <FollowingIndex width="100%" margin={0} userId={id} />
        </Box>
        <FeedIndex userId={id} />
      </Flex>
    </Container>
  );
};

export default ProfileIndex;
