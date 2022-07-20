import { Container, Heading, Skeleton } from "@chakra-ui/react";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { getConfig, useSession } from "../../utils/auth";
import Banner from "../Hub/Banner";
import { useQuery } from "react-query";
import { baseURL } from "../../utils/constants";
import axios from "axios";
import { ICourse } from "../../types/course";

const CourseLayout = () => {
  const { id } = useParams();
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

  return (
    <>
      {isLoading ? (
        <Skeleton h={"40vh"} />
      ) : (
        <Banner
          src={data?.images[0].regular || ""}
          fallback={data?.images[0].thumb}
        />
      )}
      <Container maxW={"container.xl"} mt="2rem">
        <Outlet />
      </Container>
    </>
  );
};

export default CourseLayout;
