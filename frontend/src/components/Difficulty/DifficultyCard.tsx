import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { HashLink } from "react-router-hash-link";
import useThemeColor from "../../hooks/useThemeColor";
import { scrollWithOffset } from "../../utils/scrollWithOffset";

interface Props {
  title: string;
  progress: number;
  src: string;
  started?: boolean;
  phrase: string;
}

const DifficultyCard = ({
  title,
  progress,
  src,
  started = false,
  phrase,
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
        <Image src={src} fit="cover" w="100%" h="100%" />
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
              to="/courses/hub/3#title"
              smooth
              scroll={(el) => scrollWithOffset(el)}
            >
              <Button w={{ base: "100%", sm: "fit-content" }}>
                {started ? "Continue Learning" : "Start Course"}
              </Button>
            </HashLink>
            <Button w={{ base: "100%", sm: "fit-content" }}>
              Refresh Resources
            </Button>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <CircularProgress value={progress} size="60px">
            <CircularProgressLabel>{progress}%</CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Box>
    </Box>
  );
};

export default DifficultyCard;
