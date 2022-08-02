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
import { deleteCachedUser, useSession } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const colorToggleIcon = colorMode === "dark" ? <SunIcon /> : <MoonIcon />;

  const { backgroundColor, borderColor } = useThemeColor();
  const { user } = useSession();

  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCachedUser();
    window.location.reload();
  };

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
          {user && (
            <Box display="flex" gap={2}>
              <Button onClick={() => navigate("/dashboard")} variant="link">
                Dashboard
              </Button>
              <Button
                onClick={() => navigate("/feed")}
                variant="link"
                test-id="feed-navbar"
              >
                Feed
              </Button>
              <Button onClick={() => navigate("/featured")} variant="link">
                Featured
              </Button>
              <Button
                onClick={() => navigate(`profile/${user?.objectId}`)}
                variant="link"
              >
                Profile
              </Button>
            </Box>
          )}
        </Box>
        <Box>
          <IconButton
            icon={colorToggleIcon}
            aria-label="Toggle Color Icon"
            onClick={() => toggleColorMode()}
          />
          {user && (
            <Button onClick={() => handleLogout()} ml={4}>
              Log out
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
