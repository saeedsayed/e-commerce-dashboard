// import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Container, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Flex className="h-screen overflow-hidden overflow-x-auto">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden">
          <Navbar />
          {/* Page content here */}
          <Container py={4} fluid>
            <div className="p-4 h-[calc(100vh-6rem)] overflow-x-auto">
              {children}
            </div>
          </Container>
        </div>
      </Flex>
      {/* <Footer /> */}
    </>
  );
};

export default layout;
