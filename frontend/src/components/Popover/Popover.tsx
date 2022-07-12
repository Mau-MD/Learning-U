import {
  Badge,
  border,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";

interface Props {
  courseName: string;
  beginnerProgress: number;
  intermediateProgress: number;
  advancedProgress: number;
}

const Popover = ({
  courseName,
  beginnerProgress,
  intermediateProgress,
  advancedProgress,
}: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();
  return (
    <Flex
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      w={"20vw"}
      p={4}
      flexDir="column"
      gap={4}
    >
      <Heading as="h3" fontSize="xl">
        {courseName}
      </Heading>
      <Flex alignItems="center" justifyContent="space-between">
        <Badge colorScheme="green">Beginner</Badge>
        <CircularProgress value={beginnerProgress} color="green">
          <CircularProgressLabel>{beginnerProgress}%</CircularProgressLabel>
        </CircularProgress>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Badge colorScheme="orange">Intermediate</Badge>
        <CircularProgress value={intermediateProgress} color="orange">
          <CircularProgressLabel>{intermediateProgress}%</CircularProgressLabel>
        </CircularProgress>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Badge colorScheme="red">Advanced</Badge>
        <CircularProgress value={advancedProgress} color="red">
          <CircularProgressLabel>{advancedProgress}%</CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </Flex>
  );
};

export default Popover;
