import { TCreateProductForm } from "@/schemas/createProduct";
import {
  Button,
  Card,
  Carousel,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  product?: TCreateProductForm;
};

const ProductCard = ({ product }: Props) => {
  return (
    <VStack>
      <Card.Root maxW="md" minW={"sm"} overflow="hidden">
        {product?.thumbnail ? (
          <Image
            src={product?.thumbnail}
            alt="Green double couch with wooden legs"
            maxH={"sm"}
            //   minH={"xs"}
          />
        ) : (
          <Text h={"xs"} alignContent={"center"} textAlign={"center"}>
            Select the product thumbnail
          </Text>
        )}
        <Card.Body gap="2">
          <Card.Title>{product?.title || "Product Title"}</Card.Title>
          <Card.Description
            dangerouslySetInnerHTML={{
              __html: product?.description || "<p>Product Description</p>",
            }}
          ></Card.Description>
          <HStack>
            <Text
              textStyle="2xl"
              fontWeight="medium"
              letterSpacing="tight"
              mt="2"
            >
              ${Number(product?.price || 0) - Number(product?.discount || 0)}
            </Text>
            {Number(product?.discount) > 0 && (
              <Text
                fontWeight="medium"
                letterSpacing="tight"
                textDecoration={"line-through"}
                color={"gray.focusRing"}
                mt="2"
              >
                ${Number(product?.price)}
              </Text>
            )}
          </HStack>
        </Card.Body>
        <Card.Footer gap="2">
          <Button variant="solid">Buy now</Button>
          <Button variant="ghost">Add to cart</Button>
        </Card.Footer>
      </Card.Root>
      {product?.images && (
        <Carousel.Root
          spacing="48px"
          slidesPerPage={1.5}
          slideCount={product?.images?.length || 0}
          maxW="xl"
          mx="auto"
          allowMouseDrag
        >
          <Carousel.ItemGroup>
            {product?.images?.map((image, index) => (
              <Carousel.Item key={index} index={index}>
                {/* <Box w="100%" h="300px" rounded="lg" fontSize="2.5rem">
                {index + 1}
              </Box> */}
                <Image src={image} alt="" />
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>

          <Carousel.Control justifyContent="center" gap="4">
            <Carousel.PrevTrigger asChild>
              <IconButton size="xs" variant="ghost">
                <ArrowLeft />
              </IconButton>
            </Carousel.PrevTrigger>

            <Carousel.Indicators />

            <Carousel.NextTrigger asChild>
              <IconButton size="xs" variant="ghost">
                <ArrowRight />
              </IconButton>
            </Carousel.NextTrigger>
          </Carousel.Control>
        </Carousel.Root>
      )}
    </VStack>
  );
};

export default ProductCard;
