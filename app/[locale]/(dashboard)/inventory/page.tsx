// import Search from "@/components/common/Search";
import CreateProduct from "@/components/pages/inventory/CreateProduct";
import ProductList from "@/components/pages/inventory/ProductList";

const page = async () => {
  return (
    <>
      {/* <Search placeholder="search for product" searchBy="title" /> */}
      <CreateProduct />
      <ProductList />
    </>
  );
};

export default page;
