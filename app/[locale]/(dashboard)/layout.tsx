// import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Grid, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Grid
        className="h-screen overflow-hidden overflow-x-auto"
        templateColumns={"auto 1fr"}
        templateRows={"auto 1fr"}
      >
        <GridItem rowSpan={12}>
          <Sidebar />
        </GridItem>
        <GridItem>
          <Navbar />
        </GridItem>
        {/* Page content here */}
        <GridItem rowSpan={11} overflowX={"hidden"}>
          <main className="h-full">{children}</main>
        </GridItem>
      </Grid>
      {/* <Footer /> */}
    </>
  );
};

export default layout;
