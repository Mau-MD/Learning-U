import {
  Badge,
  border,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import { useQuery } from "react-query";

interface Props {
  courseName: string;
  id: string;
}

const Popover = ({ courseName, id }: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  const { user } = useSession();

  const { data: progress } = useQuery(
    `progress-${id}`,
    async () => {
      if (!user) throw new Error("User is not defined");

      const res = await axios.get<{ 1: number; 2: number }>(
        `${baseURL}/course/progress/${id}`,
        getConfig(user.sessionToken)
      );
      return res.data;
    },
    { enabled: !!user }
  );

  return (
    <Flex
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      w={"20vw"}
      p={4}
      flexDir="column"
      gap={4}
      boxShadow={"0px 10px 15px -3px rgba(0,0,0,0.3)"}
    >
      <Heading as="h3" fontSize="xl">
        {courseName}
      </Heading>
      <Flex alignItems="center" justifyContent="space-between">
        <Badge colorScheme="green">Beginner</Badge>
        <CircularProgress
          isIndeterminate={!progress}
          value={progress !== undefined ? progress["1"] : 0}
          color="green"
          size={10}
        />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Badge colorScheme="red">Advanced</Badge>
        <CircularProgress
          isIndeterminate={!progress}
          value={progress !== undefined ? progress["1"] : 0}
          color="red"
          size={10}
        />
      </Flex>
    </Flex>
  );
};

export default Popover;
