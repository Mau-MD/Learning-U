import { useColorModeValue } from "@chakra-ui/system";

const useThemeColor = () => {
  const backgroundColor = useColorModeValue("brand.100", "gray.700");
  const borderColor = useColorModeValue("brand.200", "");

  return { backgroundColor, borderColor };
};

export default useThemeColor;
