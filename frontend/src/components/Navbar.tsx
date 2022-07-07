import React from "react";
import {
  Box,
  Button,
  useColorMode,
  Text,
  IconButton,
  Container,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import useThemeColor from "../hooks/useThemeColor";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const colorToggleIcon = colorMode === "dark" ? <SunIcon /> : <MoonIcon />;
  const { backgroundColor, borderColor } = useThemeColor();

  return (
    <Box
      bg={backgroundColor}
      p={4}
      borderBottomRadius={4}
      borderColor={borderColor}
      borderWidth={1}
    >
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Box>
            <Text fontWeight="bold">Learning U</Text>
          </Box>
          <Box display="flex" gap={2}>
            <Button onClick={() => toggleColorMode()} variant="link">
              Dashboard
            </Button>
            <Button onClick={() => toggleColorMode()} variant="link">
              Profile
            </Button>
            <Button onClick={() => toggleColorMode()} variant="link">
              Logout
            </Button>
          </Box>
        </Box>
        <Box>
          <IconButton
            icon={colorToggleIcon}
            aria-label="Toggle Color Icon"
            onClick={() => toggleColorMode()}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
