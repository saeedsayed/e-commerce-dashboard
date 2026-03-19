import CouponsList from "@/components/pages/coupons/CouponsList";
import CreateCoupon from "@/components/pages/coupons/CreateCoupon";
import { Container } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <>
      <Container py={4} fluid h={"full"}>
        <CreateCoupon />
        <CouponsList />
      </Container>
    </>
  );
};

export default page;
