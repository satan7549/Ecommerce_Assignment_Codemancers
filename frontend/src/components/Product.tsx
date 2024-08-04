import React, { useState } from "react";
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
  Center,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addToCart } from "../redux/cart/cartActions";

interface ProductProps {
  id: string;
  title: string;
  description: string;
  image: string;
  count?: number;
}

const Product: React.FC<ProductProps> = ({ id, title, description, image }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    setLoading(true);
    dispatch(addToCart({ id, count: 1 }));
    toast({
      title: "Product Added.",
      description: "The product has been added to your cart.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setLoading(false);
  };

  return (
    <Card
      data-cy={`product-${id}`}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      maxW="sm"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      transition="all 0.2s"
    >
      <Center p="4">
        <Image
          src={image}
          alt={title}
          boxSize="150px"
          objectFit="cover"
          borderRadius="md"
        />
      </Center>
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
            isLoading={loading}
            loadingText="Adding..."
          >
            ADD to Cart
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default Product;
