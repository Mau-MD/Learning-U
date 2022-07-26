import {
  Box,
  Button,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useThemeColor from "../../hooks/useThemeColor";
import FollowForm from "./FollowForm";
import FollwingCard from "./FollwingCard";
import SetStatusForm from "./SetStatusForm";

const FollowingIndex = () => {
  const { backgroundColor, borderColor } = useThemeColor();

  const [tabSelected, setTabSelected] = useState<"none" | "status" | "follow">(
    "none"
  );

  const handleTabChange = (tab: "none" | "status" | "follow") => {
    if (tabSelected === tab) {
      setTabSelected("none");
      return;
    }
    setTabSelected(tab);
  };

  return (
    <Box
      w="30%"
      h="85vh"
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      padding={5}
      margin={10}
      marginRight={0}
    >
      <Heading size={"md"} as={"h2"}>
        Following
      </Heading>
      <HStack w={"100%"} mt={5}>
        <Button
          w={"100%"}
          onClick={() => handleTabChange("status")}
          isActive={tabSelected === "status"}
        >
          Status
        </Button>
        <Button
          w={"100%"}
          onClick={() => handleTabChange("follow")}
          isActive={tabSelected === "follow"}
        >
          Follow
        </Button>
      </HStack>
      {tabSelected === "status" && <SetStatusForm />}
      {tabSelected === "follow" && <FollowForm />}
      <VStack mt={5}>
        <FollwingCard username="clanie1" status="cool status" />
        <FollwingCard username="clinigambit" status="not cool" />
        <FollwingCard username="clinimove" status="yes" />
      </VStack>
    </Box>
  );
};

export default FollowingIndex;
