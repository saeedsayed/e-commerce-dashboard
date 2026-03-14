import CreateProduct from "@/components/pages/products/CreateProduct";
import { Container } from "@chakra-ui/react";

const page = () => {
  return (
    <Container py={4} fluid h={"full"} maxW={"2400px"}>
      <CreateProduct />
    </Container>
  );
};

export default page;
