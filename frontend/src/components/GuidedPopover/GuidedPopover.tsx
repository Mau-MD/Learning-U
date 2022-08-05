import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  isOpen: boolean;
  prevStep?: () => void;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  children: React.ReactNode;
}

const GuidedPopover = ({
  isOpen,
  prevStep,
  onClose,
  title,
  content,
  children,
}: Props) => {
  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="auto"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">{title}</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{content}</PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            {prevStep && (
              <Button colorScheme="blue" onClick={prevStep}>
                Previous Step
              </Button>
            )}
            <Button colorScheme="green" onClick={onClose}>
              Next Step
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default GuidedPopover;
