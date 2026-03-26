import EditProduct from "@/components/pages/products/EditProduct";
import { IProduct } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { Container } from "@chakra-ui/react";
import React from "react";

type Props = {
  params: { id: string };
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const {
    data: { data: product },
  } = await axiosInstance.get<{ data: IProduct }>(`/products/${id}`);
  return (
    <Container py={4} fluid h={"full"} maxW={"2400px"}>
      <EditProduct product={product} />
    </Container>
  );
};

export default page;
