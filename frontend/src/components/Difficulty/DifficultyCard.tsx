import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { createSearchParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useThemeColor from "../../hooks/useThemeColor";
import { scrollWithOffset } from "../../utils/scrollWithOffset";

interface Props {
  title: string;
  progress: number | undefined;
  src: string;
  courseId: string;
  phrase: string;
  courseTitle: string;
  difficulty: 1 | 2;
  isLoading: boolean;
}

const DifficultyCard = ({
  title,
  progress,
  courseId,
  src,
  phrase,
  courseTitle,
  difficulty,
  isLoading,
}: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  return (
    <Box
      bg={backgroundColor}
      borderWidth={1}
      borderColor={borderColor}
      w="100%"
      h={{ base: "45vh", sm: "30vh", lg: "20vh" }}
      borderRadius="4px"
      display="flex"
      flexDirection={{ base: "column", sm: "row" }}
    >
      <Box
        w={{ base: "100%", sm: "30%" }}
        h={{ base: "20vh", sm: "100%" }}
        display="flex"
      >
        <Skeleton isLoaded={!isLoading} w="100%">
          <Image src={src} fit="cover" w="100%" h="100%" />
        </Skeleton>
      </Box>
      <Box
        h="100%"
        w={{ base: "100%", sm: "70%" }}
        p={{ base: "1rem", sm: "2rem" }}
        display="flex"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          w="100%"
          paddingRight={"20px"}
        >
          <Box>
            <Heading as="h2" size="md">
              {title} Course
            </Heading>
            <Text mt={"1em"}>{phrase}</Text>
          </Box>
          <Box display="flex" flexDir={{ base: "column", md: "row" }} gap="1em">
            <HashLink
              to={`/courses/${courseId}/hub?title=${courseTitle}&difficulty=${difficulty}#title`}
              smooth
              scroll={(el) => scrollWithOffset(el)}
            >
              <Button w={{ base: "100%", sm: "fit-content" }}>
                {progress && progress > 0
                  ? "Continue Learning"
                  : "Start Course"}
              </Button>
            </HashLink>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <CircularProgress
            value={progress}
            isIndeterminate={progress === undefined}
            size="60px"
          >
            {progress !== undefined && (
              <CircularProgressLabel>
                {progress.toFixed()}%
              </CircularProgressLabel>
            )}
          </CircularProgress>
        </Box>
      </Box>
    </Box>
  );
};

export default DifficultyCard;
