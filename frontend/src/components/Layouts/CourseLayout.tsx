import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Banner from "../Hub/Banner";

const CourseLayout = () => {
  return (
    <>
      <Banner src="https://miro.medium.com/max/1838/1*uE1kDeKaMnZaZLLJzHm0QA.png" />
      <Container maxW={"container.xl"} mt="2rem">
        <Outlet />
      </Container>
    </>
  );
};

export default CourseLayout;
