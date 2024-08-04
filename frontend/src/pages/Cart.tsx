import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Image,
  Text,
  Heading,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  SimpleGrid,
  Flex,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../redux/cart/cartActions";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckout = () => {
    if (items.length !== 0) {
      navigate("/checkout");
    } else {
      alert("Your cart is empty");
    }
  };

  const totalAmount = items.reduce(
    (acc, item) => acc + item.product.price * item.count,
    0
  );
  const totalQuantity = items.reduce((acc, item) => acc + item.count, 0);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Box p="5" maxW="container.lg" mx="auto">
      <Heading as="h2" size="xl" mb="5" textAlign="center">
        Your Cart
      </Heading>
      {items.length === 0 ? (
        <Text textAlign="center">No items in your cart.</Text>
      ) : (
        <VStack spacing="5" align="stretch">
          <Box p="5" borderWidth="1px" borderRadius="lg" boxShadow="md">
            <VStack spacing="4">
              <HStack justify="space-between" width="full">
                <Text fontSize="lg" fontWeight="bold">
                  Total Quantity:
                </Text>
                <Text fontSize="lg">{totalQuantity}</Text>
              </HStack>
              <HStack justify="space-between" width="full">
                <Text fontSize="lg" fontWeight="bold">
                  Total Amount:
                </Text>
                <Text fontSize="lg">${totalAmount.toFixed(2)}</Text>
              </HStack>
              <Button
                colorScheme="teal"
                size="lg"
                width="full"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </VStack>
          </Box>
          <Divider />
          <SimpleGrid columns={[1, 2, 3]} spacing="5">
            {items.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="5"
                boxShadow="md"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  boxSize="150px"
                  objectFit="cover"
                  mx="auto"
                />
                <Heading as="h3" size="md" mt="4" textAlign="center">
                  {item.product.title}
                </Heading>
                <Text mt="2" textAlign="center">
                  {item.product.description}
                </Text>
                <Text mt="2" fontWeight="bold" textAlign="center">
                  ${item.product.price.toFixed(2)}
                </Text>
                <Text mt="2" textAlign="center">
                  Quantity: {item.count}
                </Text>
                <Button colorScheme="red" mt="4" width="full">
                  Remove Item
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </Box>
  );
};

export default Cart;
