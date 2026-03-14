import ProductList from "@/components/pages/products/ProductList";
import { Link } from "@/i18n/navigation";
import { Button, Container } from "@chakra-ui/react";
import { Plus } from "lucide-react";

const page = async () => {
  return (
    <>
      <Container py={4} fluid h={"full"} maxW={"2400px"}>
        <Link href={"products/create"}>
          <Button>
            Create Product <Plus />
          </Button>
        </Link>
        <ProductList />
      </Container>
    </>
  );
};

export default page;
