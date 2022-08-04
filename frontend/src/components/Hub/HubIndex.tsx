import {
  Box,
  Heading,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getConfig, useSession } from "../../utils/auth";
import ResourceGroup from "./ResourceGroup";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import { IResource } from "../../types/resource";
import LoadingCard from "../Loading/LoadingCard";
import { calculateCourseCompletition } from "../../utils/courseCompletition";

const HubIndex = () => {
  const { isFetching, user } = useSession();

  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const difficulty = searchParams.get("difficulty");
  const title = searchParams.get("title");

  const {
    data,
    isFetching: isQueryFetching,
    isLoading,
  } = useQuery(
    `hub-${id}-${difficulty}`,
    async () => {
      if (!user) throw new Error("User is not defined");

      const res = await axios.get<IResource[]>(
        `${baseURL}/resources/byCourse/${id}/${difficulty}`,
        getConfig(user.sessionToken)
      );
      return res.data;
    },
    {
      enabled: !isFetching && !!id && !!difficulty,
    }
  );

  const [completition, setCompletition] = useState(0);

  useEffect(() => {
    if (!data) return;
    const courseCompletition = calculateCourseCompletition(data);
    setCompletition(courseCompletition);
  }, [data]);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Heading as="h1" fontWeight="bold" fontSize="4xl" id="title">
            <>
              {title}
              {(isLoading || isQueryFetching) && <Spinner ml={5} />}
            </>
          </Heading>
          <Badge>{difficulty === "1" ? "Beginner" : "Advanced"}</Badge>
        </Box>
        <CircularProgress
          isIndeterminate={!data}
          value={completition}
          size={"60px"}
        >
          <CircularProgressLabel>
            {completition.toFixed(0)}%
          </CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box display="flex" flexDirection="column" gap={10} my={10}>
        {!data ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : (
          <>
            <ResourceGroup
              title="🎥 Recommended Videos"
              data={data}
              courseId={id || ""}
              courseName={title || ""}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default HubIndex;
