import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import useThemeColor from "../../hooks/useThemeColor";
import { ErrorType } from "../../types/requests";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";

interface Props {
  username: string;
  userId: string;
  status: string;
}

const FollowingCard = ({ username, userId, status }: Props) => {
  const { borderColor, invertedBackgroundColor } = useThemeColor();

  const queryClient = useQueryClient();
  const toast = useToast();
  const { user } = useSession();

  const unfollowUser = useMutation(
    async (userId: string) => {
      if (!user) {
        throw new Error("User is not defined");
      }
      const res = await axios.delete(`${baseURL}/follow/${userId}`, {
        ...getConfig(user.sessionToken),
      });
      return res.data;
    },
    {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Success",
          description: `You stopped following ${username}`,
          isClosable: true,
        });
        queryClient.invalidateQueries("following");
      },
      onError: (error: AxiosError<ErrorType>) => {
        toast({
          status: "error",
          title: "Error deleting course",
          description: error.response?.data.message,
          isClosable: true,
        });
      },
    }
  );

  return (
    <HStack
      w="100%"
      backgroundColor={invertedBackgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      px={3}
    >
      <Avatar size={"sm"} />
      <Flex p={2} w="100%" flexDir={"column"}>
        <Text>{username}</Text>
        <Text fontSize={"13px"}>{status}</Text>
      </Flex>
      <IconButton
        icon={<BiTrash />}
        aria-label="Unfollow user"
        size="sm"
        colorScheme="red"
        isLoading={unfollowUser.isLoading}
        onClick={() => unfollowUser.mutate(userId)}
      />
    </HStack>
  );
};

export default FollowingCard;
