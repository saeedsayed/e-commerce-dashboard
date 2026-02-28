import Search from "@/components/common/Search";
import ProductList from "@/components/pages/products/ProductList";

const page = async () => {
  return (
    <>
      <Search placeholder="search for product" searchBy="title" />
      <ProductList />
    </>
  );
};

export default page;
