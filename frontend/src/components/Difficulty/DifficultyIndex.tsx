import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ICourse } from "../../types/course";
import { useSession, getConfig } from "../../utils/auth";
import { baseURL } from "../../utils/constants";
import DifficultyCard from "./DifficultyCard";
import { useQuery } from "react-query";
import axios from "axios";
import { FALLBACK_IMG } from "../Dashboard/DashboardIndex";
import { useTour } from "../../hooks/useTour";
import GuidedPopover from "../GuidedPopover/GuidedPopover";
import { CourseDifficulty } from "../../types/enums";

const DifficultyIndex = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const name = searchParams.get("name");

  const { user } = useSession();
  const { currStep, prevStep, nextStep, stepNum } = useTour(
    [
      {
        title: "Difficulties",
        content:
          "When you create a course, it makes two different courses. Try checking both! ",
      },
      {
        title: "Progress",
        content: "You can also track your progress here! Try reach that 100%",
      },
    ],
    "difficulty"
  );

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
      <GuidedPopover
        content={currStep.content}
        title={currStep.title}
        isOpen={stepNum === 0 || stepNum === 1}
        prevStep={prevStep}
        onClose={nextStep}
      >
        <Box display="flex" flexDir="column" my="1em" gap="1em" mb="20vh">
          <DifficultyCard
            isLoading={isLoading}
            title="Beginners"
            progress={progress ? progress["1"] : undefined}
            src={data?.images[2] ? data?.images[2].small : FALLBACK_IMG}
            phrase="You can do it!"
            courseId={id || ""}
            courseTitle={name || ""}
            difficulty={CourseDifficulty.Beginner}
          />

          <DifficultyCard
            isLoading={isLoading}
            title="Advanced"
            progress={progress ? progress["2"] : undefined}
            src={data?.images[3] ? data?.images[3].small : FALLBACK_IMG}
            courseId={id || ""}
            courseTitle={name || ""}
            phrase="Let's go"
            difficulty={CourseDifficulty.Advanced}
          />
        </Box>
      </GuidedPopover>
    </>
  );
};

export default DifficultyIndex;
