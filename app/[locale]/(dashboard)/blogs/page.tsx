import BlogsList from "@/components/pages/blogs/BlogsList";
import CreateBlogs from "@/components/pages/blogs/CreateBlogs";
import { Container } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <Container p={4} fluid h="full" maxW={"2400px"}>
      <CreateBlogs />
      <BlogsList />
    </Container>
  );
};

export default page;
