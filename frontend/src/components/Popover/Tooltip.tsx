import { Box } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import PopoverPortal from "./PopoverPortal";

interface Props {
  children: React.ReactElement;
  render: React.ReactElement;
  space?: number;
}

const getPoint = (element: HTMLElement, ref: HTMLElement, space = 10) => {
  const pt = { x: 0, y: 0 };
  const rectangle = element.getBoundingClientRect();
  const refRectangle = ref.getBoundingClientRect();
  pt.x = rectangle.left + (rectangle.width - refRectangle.width) / 2;
  pt.y = rectangle.top - refRectangle.height + space;
  return pt;
};

const Tooltip = ({ children, render, space = 10 }: Props) => {
  const [show, setShow] = useState(false);

  const posRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShow(true);
    if (!tooltipRef.current) return;
    posRef.current = getPoint(e.currentTarget, tooltipRef.current, space);
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
        <Box
          position="fixed"
          top={posRef.current.y}
          left={posRef.current.x}
          visibility={show ? "visible" : "hidden"}
          zIndex={999}
          ref={tooltipRef}
        >
          {render}
        </Box>
      </PopoverPortal>
    </>
  );
};

export default Tooltip;
