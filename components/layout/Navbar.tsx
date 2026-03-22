import ThemeAndLangButton from "../common/Theme&LangButton";
import { Grid, GridItem } from "@chakra-ui/react";
import RoutesBreadcrumb from "../ui/RoutesBreadcrumb";
import ShowInFullScreen from "../ui/ShowInFullScreen";

const Navbar = () => {
  return (
    <Grid
      as={"nav"}
      bg={"bg.subtle"}
      borderBottom={"1px solid"}
      borderColor={"border.emphasized"}
      padding={"2"}
      templateColumns="repeat(3, 1fr)"
      // justify={"space-between"}
      alignItems={"center"}
    >
      <GridItem>
        <RoutesBreadcrumb />
      </GridItem>
      <GridItem textAlign={"center"}>
        <ShowInFullScreen />
      </GridItem>
      <GridItem display={"flex"} justifyContent={"end"}>
        <ThemeAndLangButton />
      </GridItem>
    </Grid>
  );
};

export default Navbar;
