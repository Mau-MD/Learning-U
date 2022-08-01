import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { createSearchParams, Link } from "react-router-dom";
import useThemeColor from "../../hooks/useThemeColor";
import DeleteCourse from "../DeleteCourse/DeleteCourse";
import CloneModal from "../Feed/CloneModal";
import Popover from "../Popover/Popover";
import Tooltip from "../Popover/Tooltip";
import Share from "../Share/Share";

interface Props {
  link: string;
  title: string;
  src: string;
  liked?: boolean;
  createdAt?: string;
  cloneButton?: boolean;
}

const CourseCard = ({
  title,
  link,
  src,
  liked = false,
  createdAt = "",
  cloneButton = false,
}: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteCourse,
    onOpen: onOpenDeleteCourse,
    onClose: onCloseDeleteCourse,
  } = useDisclosure();
  const {
    isOpen: isOpenCloneModal,
    onOpen: onOpenCloneModal,
    onClose: onCloseCloneModal,
  } = useDisclosure();

  return (
    <Box
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      w="100%"
    >
      <Box>
        {!cloneButton ? (
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
        ) : (
          <Box w="100%px" h="200px">
            <Image
              src={src}
              cursor="pointer"
              w="100%"
              h="100%"
              objectFit={"cover"}
            />
          </Box>
        )}
        <Flex
          padding={4}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h2" fontSize={"md"}>
            {title}
          </Heading>
          <Box>
            {cloneButton ? (
              <HStack gap={3}>
                <Box cursor={"pointer"}>
                  {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                </Box>
                <Button onClick={() => onOpenCloneModal()}>Clone Course</Button>
              </HStack>
            ) : (
              <>
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
                    <MenuItem onClick={() => onOpen()}>Share course</MenuItem>
                    <MenuItem onClick={() => onOpenDeleteCourse()}>
                      Delete course
                    </MenuItem>
                  </MenuList>
                  <Share isOpen={isOpen} onClose={onClose} code={link} />
                  <DeleteCourse
                    isOpen={isOpenDeleteCourse}
                    onClose={onCloseDeleteCourse}
                    courseId={link}
                  />
                </Menu>
              </>
            )}
          </Box>
          <CloneModal
            onClose={onCloseCloneModal}
            courseId={link}
            courseName={title}
            courseCreatedAt={createdAt || ""}
            isOpen={isOpenCloneModal}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default CourseCard;
