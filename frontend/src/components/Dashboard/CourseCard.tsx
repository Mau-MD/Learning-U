import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Text,
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
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { userInfo } from "os";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { createSearchParams, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useThemeColor from "../../hooks/useThemeColor";
import { ErrorType } from "../../types/requests";
import { IUser } from "../../types/user";
import { getConfig, useSession } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import DeleteCourse from "../DeleteCourse/DeleteCourse";
import MakeFeaturedModal from "../Featured/MakeFeaturedModal";
import CloneModal from "../Feed/CloneModal";
import Popover from "../Popover/Popover";
import Tooltip from "../Popover/Tooltip";
import Share from "../Share/Share";
import { motion } from "framer-motion";

interface Props {
  link: string;
  title: string;
  src: string;
  createdBy?: IUser;
  liked?: boolean;
  createdAt?: string;
  cloneButton?: boolean;
  likes?: number;
  isLoading?: boolean;
}

const CourseCard = ({
  title,
  link,
  src,
  createdBy,
  liked = false,
  createdAt = "",
  cloneButton = false,
  likes = 0,
  isLoading,
}: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();
  const { user } = useSession();

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
  const {
    isOpen: isOpenMakeFeaturedModal,
    onOpen: onOpenMakeFeaturedModal,
    onClose: onCloseMakeFeaturedModal,
  } = useDisclosure();

  const queryClient = useQueryClient();
  const toast = useToast();

  const likeCourse = useMutation(
    async (courseId: string) => {
      if (!user) throw new Error("User is not defined");

      const res = await axios.post(
        `${baseURL}/course/featured/like/${courseId}`,
        null,
        getConfig(user?.sessionToken)
      );

      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("featured");
        toast({
          status: "success",
          title: "Like added",
          description: "You now like that course!",
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ErrorType>) => {
        toast({
          status: "error",
          title: "Error deleting course",
          description: error.response?.data.message,
          isClosable: true,
        });
      },
    }
  );
  const dislikedCourse = useMutation(
    async (courseId: string) => {
      if (!user) throw new Error("User is not defined");

      const res = await axios.post(
        `${baseURL}/course/featured/dislike/${courseId}`,
        null,
        getConfig(user?.sessionToken)
      );

      return res.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("featured");
        toast({
          status: "success",
          title: "Like removed",
          description: "You no longer like that course!",
          isClosable: true,
        });
      },
      onError: (error: AxiosError<ErrorType>) => {
        toast({
          status: "error",
          title: "Error removing like",
          description: error.response?.data.message,
          isClosable: true,
        });
      },
    }
  );
  const handleLikeToggle = () => {
    if (!liked) {
      likeCourse.mutate(link);
      return;
    }
    dislikedCourse.mutate(link);
  };

  const renderAnimatedHeart = () => {
    if (likeCourse.isLoading || dislikedCourse.isLoading || isLoading) {
      return (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ repeat: Infinity }}
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </motion.div>
      );
    }
    return liked ? <AiFillHeart /> : <AiOutlineHeart />;
  };

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
          <VStack align={"start"}>
            <Heading as="h2" fontSize={"md"}>
              {title}
            </Heading>
            {cloneButton && (
              <HashLink to={`/profile/${createdBy?.objectId}#top`}>
                <Button variant="link" fontSize="sm">
                  Created By: {createdBy?.username}
                </Button>
              </HashLink>
            )}
          </VStack>
          <Box>
            {cloneButton ? (
              <HStack gap={3}>
                <HStack>
                  <Text>{likes}</Text>
                  <Box cursor={"pointer"} onClick={() => handleLikeToggle()}>
                    {renderAnimatedHeart()}
                  </Box>
                </HStack>
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
                    <MenuItem onClick={() => onOpenMakeFeaturedModal()}>
                      Make course featured
                    </MenuItem>
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
          {cloneButton && (
            <CloneModal
              onClose={onCloseCloneModal}
              courseId={link}
              courseName={title}
              courseCreatedAt={createdAt || ""}
              isOpen={isOpenCloneModal}
            />
          )}
          <MakeFeaturedModal
            isOpen={isOpenMakeFeaturedModal}
            onClose={onCloseMakeFeaturedModal}
            courseId={link}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default CourseCard;
