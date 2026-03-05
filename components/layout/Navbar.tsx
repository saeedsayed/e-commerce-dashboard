import ThemeAndLangButton from "../common/Theme&LangButton";
import { Box, Flex } from "@chakra-ui/react";
import RoutesBreadcrumb from "../ui/RoutesBreadcrumb";

const Navbar = () => {
  return (
    <Flex
      as={"nav"}
      bg={"bg.subtle"}
      borderBottom={"1px solid"}
      borderColor={"border.emphasized"}
      padding={"2"}
      justify={"space-between"}
      align={"center"}
    >
      <Flex align={"center"} gap={3}>
        <RoutesBreadcrumb />
      </Flex>
      <Box className="ms-auto">
        <ThemeAndLangButton />
      </Box>
    </Flex>
  );
};

export default Navbar;
