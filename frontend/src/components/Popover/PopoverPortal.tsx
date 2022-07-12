import React from "react";
import ReactDom from "react-dom";

interface Props {
  children: JSX.Element;
}
const PopoverPortal = ({ children }: Props) => {
  return ReactDom.createPortal(children, document.body);
};

export default PopoverPortal;
