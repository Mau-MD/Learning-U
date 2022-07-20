import React from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

const LoadingCard = () => {
  return (
    <Stack>
      <Skeleton height={"225px"} />
      <Skeleton height={"75px"} mt={10} />
    </Stack>
  );
};

export default LoadingCard;
