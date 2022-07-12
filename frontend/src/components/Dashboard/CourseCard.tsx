import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../hooks/useThemeColor";
import Popover from "../Popover/Popover";
import Tooltip from "../Popover/Tooltip";

interface Props {
  title: string;
  src: string;
  beginnerProgress: number;
  intermediateProgress: number;
  advancedProgress: number;
}

const CourseCard = ({
  title,
  src,
  beginnerProgress,
  intermediateProgress,
  advancedProgress,
}: Props) => {
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
              courseName={title}
              beginnerProgress={beginnerProgress}
              intermediateProgress={intermediateProgress}
              advancedProgress={advancedProgress}
            />
          }
        >
          <Image src={src}></Image>
        </Tooltip>
        <Flex
          padding={4}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h2" fontSize={"md"}>
            {title}
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
