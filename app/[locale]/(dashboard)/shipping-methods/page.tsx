import CreateShippingMethod from "@/components/pages/shipping-methods/CreateShippingMethod";
import ShippingMethodsList from "@/components/pages/shipping-methods/SippingMethodsList";
import { Container } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <>
      <Container py={4} fluid h={"full"}>
        <CreateShippingMethod />
        <ShippingMethodsList />
      </Container>
    </>
  );
};

export default page;
