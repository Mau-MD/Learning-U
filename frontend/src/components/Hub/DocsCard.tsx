import React from "react";
import { Badge, Box, Icon, Text } from "@chakra-ui/react";
import useThemeColor from "../../hooks/useThemeColor";
import { GrDocumentText } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

interface Props {
  href: string;
  title: string;
}

const DocsCard = ({ href, title }: Props) => {
  const { backgroundColor, borderColor } = useThemeColor();
  const navigate = useNavigate();
  return (
    <Box
      bg={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      borderRadius={4}
      cursor="pointer"
      transition={"all 0.3s"}
      padding={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      onClick={() => navigate(href)}
    >
      <Box display="flex" alignItems="center" gap={3}>
        <Icon as={GrDocumentText} />
        <Text>{title}</Text>
      </Box>
      <Badge colorScheme="green">Completed</Badge>
    </Box>
  );
};

export default DocsCard;
