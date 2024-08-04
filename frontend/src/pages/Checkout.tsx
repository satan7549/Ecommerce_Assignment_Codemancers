import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
// import { checkoutOrder, clearCheckoutState } from '../redux/checkout/checkoutSlice';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import { confirmOrder } from "../redux/checkout/checkoutActions";
import { clearCart } from "../redux/cart/reducer";

const Checkout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  const { items } = useSelector((state: RootState) => state.cart);
  const { loading, checkoutData, error } = useSelector(
    (state: RootState) => state.checkout
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const totalAmount = items.reduce(
    (acc, item) => acc + item.product.price * item.count,
    0
  );

  const totalQuantity = items.reduce((acc, item) => acc + item.count, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataString: string = `name:${formData.name}-address:${formData.address}-phone:${formData.phone}`;
    dispatch(confirmOrder(formDataString));

    toast({
      title: `order confirmed`,
      description: "checkout successful.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    dispatch(clearCart());
  };

  useEffect(() => {
    if (checkoutData || error) {
      toast({
        title: checkoutData ? "Order Confirmed" : "Order Failed",
        description: checkoutData
          ? "Checkout successful. Your order has been confirmed."
          : `There was an issue confirming your order: ${
              error || "An unknown error occurred"
            }`,
        status: checkoutData ? "success" : "error",
        duration: 2000,
        isClosable: true,
      });
      checkoutData && navigate("/");
    }
  }, [checkoutData, error]);

  return (
    <Box p="5">
      <Text fontSize="2xl" mb="4">
        Checkout
      </Text>
      <Box mt="4">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb="4">
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired mb="4">
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mb="4">
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </FormControl>
          <Text mb="4">Total Quantity: {totalQuantity}</Text>
          <Text mb="4">Total Amount: ${totalAmount.toFixed(2)}</Text>
          <Button colorScheme="teal" type="submit" isLoading={loading}>
            Confirm Order
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Checkout;
