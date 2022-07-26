import { useColorModeValue } from "@chakra-ui/system";

const useThemeColor = () => {
  const backgroundColor = useColorModeValue("brand.100", "gray.700");
  const invertedBackgroundColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("brand.200", "");

  return { backgroundColor, borderColor, invertedBackgroundColor };
};

export default useThemeColor;
