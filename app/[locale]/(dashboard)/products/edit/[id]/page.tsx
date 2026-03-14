import EditProduct from "@/components/pages/products/EditProduct";
import { Container } from "@chakra-ui/react";
import React from "react";

type Props = {
  params: { id: string };
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <Container py={4} fluid h={"full"} maxW={"2400px"}>
      <EditProduct productId={id} />
    </Container>
  );
};

export default page;
