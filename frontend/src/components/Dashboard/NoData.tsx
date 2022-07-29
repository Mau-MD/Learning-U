import { Center, VStack, Heading, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import NoDataSVG from "../../assets/nodata.svg";

const NoData = () => {
  const navigate = useNavigate();

  return (
    <Center w={"100%"} display={"flex"} flexDir="column" mt={10} gap={10}>
      <Image src={NoDataSVG} w={"30%"} />
      <VStack>
        <Heading size={"lg"}>No courses to display</Heading>
        <Text>Create a new course below!</Text>
      </VStack>
      <Button w="fit-content" onClick={() => navigate("new")}>
        Create first course!
      </Button>
    </Center>
  );
};

export default NoData;
