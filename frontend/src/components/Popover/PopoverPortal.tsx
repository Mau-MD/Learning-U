import React from "react";
import ReactDom from "react-dom";

interface Props {
  children: React.ReactNode;
}
const PopoverPortal = ({ children }: Props) => {
  return ReactDom.createPortal(children, document.body);
};

export default PopoverPortal;
