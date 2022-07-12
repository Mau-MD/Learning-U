import { Box } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import PopoverPortal from "./PopoverPortal";

interface Props {
  children: React.ReactElement;
  render: React.ReactElement;
}

const getPoint = (element: HTMLElement, ref: HTMLElement) => {
  const pt = { x: 0, y: 0 };
  const rectangle = element.getBoundingClientRect();
  const refRectangle = ref.getBoundingClientRect();
  pt.x = rectangle.left + (rectangle.width - refRectangle.width) / 2;
  pt.y = rectangle.top - refRectangle.height / 1.2;
  return pt;
};

const Tooltip = ({ children, render }: Props) => {
  const [show, setShow] = useState(false);

  const posRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShow(true);
    if (!tooltipRef.current) return;
    posRef.current = getPoint(e.currentTarget, tooltipRef.current);
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
          opacity={show ? 1 : 0}
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
