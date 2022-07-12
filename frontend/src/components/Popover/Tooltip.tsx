import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import PopoverPortal from "./PopoverPortal";

interface Props {
  children: React.ReactElement;
  render: React.ReactElement;
}

const Tooltip = ({ children, render }: Props) => {
  const [show, setShow] = useState(false);

  const handleMouseOver = () => {
    setShow(true);
  };

  const handleMouseOut = () => {
    setShow(false);
  };

  return (
    <>
      {React.cloneElement(children, {
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
      })}
      <PopoverPortal>
        <Box position="fixed" opacity={show ? 1 : 0}>
          {render}
        </Box>
      </PopoverPortal>
    </>
  );
};

export default Tooltip;
