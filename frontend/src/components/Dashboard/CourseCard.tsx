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
} from "@chakra-ui/react";
import React from "react";
import { createSearchParams, Link } from "react-router-dom";
import useThemeColor from "../../hooks/useThemeColor";
import Popover from "../Popover/Popover";
import Tooltip from "../Popover/Tooltip";

interface Props {
  link: string;
  title: string;
  src: string;
}

const CourseCard = ({ title, link, src }: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();
  return (
    <Box
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      w="100%"
    >
      <Box>
        <Tooltip render={<Popover id={link} courseName={title} />}>
          <Box w="100%px" h="200px">
            <Image
              src={src}
              cursor="pointer"
              w="100%"
              h="100%"
              objectFit={"cover"}
            />
          </Box>
        </Tooltip>
        <Flex
          padding={4}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h2" fontSize={"md"}>
            {title}
          </Heading>
          <Box>
            <Link
              to={{
                pathname: `/courses/${link}/difficulty`,
                search: createSearchParams({ name: title }).toString(),
              }}
            >
              <Button mr={2} colorScheme="blue">
                Go
              </Button>
            </Link>
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
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default CourseCard;
