// import Search from "@/components/common/Search";
import CreateProduct from "@/components/pages/products/CreateProduct";
import ProductList from "@/components/pages/products/ProductList";
import { Container } from "@chakra-ui/react";

const page = async () => {
  return (
    <>
      <Container py={4} fluid h={"full"} maxW={"2400px"}>
        <CreateProduct />
        <ProductList />
      </Container>
    </>
  );
};

export default page;
