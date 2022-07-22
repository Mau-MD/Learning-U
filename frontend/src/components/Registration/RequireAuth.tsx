import { Box, Center, Spinner } from "@chakra-ui/react";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../../utils/auth";

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
  const { user, isFetching } = useSession();
  const location = useLocation();

  const handleRender = () => {
    if (isFetching)
      return (
        <Center>
          <Center h="90vh">
            <Spinner />
          </Center>
        </Center>
      );
    if (!user)
      return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
  };

  return <>{handleRender()}</>;
};

export default RequireAuth;
