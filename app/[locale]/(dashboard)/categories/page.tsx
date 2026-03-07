import CategoriesList from "@/components/pages/categories/CategoriesList";
import CreateCategory from "@/components/pages/categories/CreateCategory";
import { Container } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <>
      <Container py={4} fluid h={"full"}>
        <CreateCategory />
        <CategoriesList />
      </Container>
    </>
  );
};

export default page;
