import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";
import Popover from "../Popover/Popover";
import Tooltip from "../Popover/Tooltip";

const CourseCard = () => {
  const { backgroundColor, borderColor } = useThemeColor();
  return (
    <Box
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      w="100%"
      cursor={"pointer"}
    >
      <Box>
        <Tooltip
          render={
            <Popover
              courseName="React Course"
              beginnerProgress={50}
              intermediateProgress={20}
              advancedProgress={0}
            />
          }
        >
          <Image src="https://assets-global.website-files.com/61a0a53beeb118af7ddb4c55/61c0ba0267c18ebf1fd19b2f_maxresdefault-1-1-1024x576.jpeg"></Image>
        </Tooltip>
        <Flex
          padding={4}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h2" fontSize={"md"}>
            React Course
          </Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
            ></MenuButton>
            <MenuList>
              <MenuItem>Share course</MenuItem>
              <MenuItem>Delete course</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Box>
  );
};

export default CourseCard;
