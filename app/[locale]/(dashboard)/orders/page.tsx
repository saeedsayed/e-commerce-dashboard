import OrdersList from "@/components/pages/orders/OrdersList";
import { Container } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <Container fluid p={4} h={"full"} maxW={"2400px"}>
      <OrdersList />
    </Container>
  );
};

export default page;
