import React from "react";
import {
  Button,
  Image,
  Text,
  Heading,
  useToast,
  Card,
  CardBody,
  Stack,
  CardFooter,
  Flex,
} from "@chakra-ui/react";

interface ProductProps {
  id: string;
  title: string;
  description: string;
  image: string;
  count?: number;
}

const Product: React.FC<ProductProps> = ({
  id,
  title,
  description,
  image,
  count = 0,
}) => {
  const toast = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Product Added.",
      description: "The product has been added to your cart.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Card
      data-cy={`product-${id}`}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={image} alt={title} boxSize="150px" objectFit="cover" />
      <CardBody>
        <Stack spacing="4">
          <Heading as="h3" size="md" data-cy="product-title">
            {title}
          </Heading>
          <Text data-cy="product-description">{description}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex direction="column" w="full">
          <Button
            data-cy="product-add-item-to-cart-button"
            colorScheme="teal"
            onClick={handleAddToCart}
            mb="4"
          >
            ADD to Cart
          </Button>
          <Flex justifyContent="space-between" alignItems="center">
            <Button
              data-cy="product-decrement-cart-item-count-button"
              colorScheme="teal"
            >
              -
            </Button>
            <Text as="span" data-cy="product-count">
              {count}
            </Text>
            <Button
              data-cy="product-increment-cart-item-count-button"
              colorScheme="teal"
            >
              +
            </Button>
            {/* <Button data-cy="product-remove-cart-item-button" colorScheme="red">
              Remove Item
            </Button> */}
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default Product;
