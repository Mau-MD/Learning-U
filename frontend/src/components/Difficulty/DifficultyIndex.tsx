import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ICourse } from "../../types/course";
import { useSession, getConfig } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import DifficultyCard from "./DifficultyCard";
import { useQuery } from "react-query";
import axios from "axios";

const DifficultyIndex = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const name = searchParams.get("name");

  const { user, isFetching } = useSession();

  const { data, isLoading } = useQuery(
    `${id}`,
    async () => {
      if (!user) throw new Error("User is not defiend");

      const res = await axios.get<ICourse>(
        `${baseURL}/course/${id}`,
        getConfig(user.sessionToken)
      );
      return res.data;
    },
    { enabled: !!user && !!id }
  );

  const { data: progress } = useQuery(
    `progress-${id}`,
    async () => {
      if (!user) throw new Error("User is not defined");

      const res = await axios.get<{ 1: number; 2: number }>(
        `${baseURL}/course/progress/${id}`,
        getConfig(user.sessionToken)
      );
      return res.data;
    },
    { enabled: !!user }
  );

  return (
    <>
      <Heading as="h1" fontWeight="bold" fontSize="4xl">
        {name}
      </Heading>
      <Box display="flex" flexDir="column" my="1em" gap="1em" mb="20vh">
        <pre>{JSON.stringify(progress)}</pre>
        <DifficultyCard
          title="Beginners"
          progress={20}
          src={data?.images[2].small || ""}
          phrase="You can do it!"
          courseId={id || ""}
          courseTitle={name || ""}
          started
          difficulty={1}
        />
        <DifficultyCard
          title="Advanced"
          progress={0}
          src={data?.images[3].small || ""}
          courseId={id || ""}
          courseTitle={name || ""}
          phrase="Let's go"
          difficulty={2}
        />
      </Box>
    </>
  );
};

export default DifficultyIndex;
