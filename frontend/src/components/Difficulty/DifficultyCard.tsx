import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
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
      h={["40vh", "40vh", "30vh", "20vh"]}
      borderRadius="4px"
      display="flex"
    >
      <Box w="30%" display="flex">
        <Image src={src} fit="cover" w="100%" h="100%" />
      </Box>
      <Box w="70%" p="2rem" display="flex" justifyContent="space-between">
        <Box display="flex" flexDir="column" justifyContent="space-between">
          <Heading as="h2" size="md">
            {title} Course
          </Heading>
          <Text>{phrase}</Text>
          <HashLink
            to="/courses/hub/3#title"
            smooth
            scroll={(el) => scrollWithOffset(el)}
          >
            <Button w="fit-content">
              {started ? "Continue Learning" : "Start Course"}
            </Button>
          </HashLink>
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
