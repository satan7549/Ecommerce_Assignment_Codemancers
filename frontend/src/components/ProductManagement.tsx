import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  adminAddProductAction,
  adminUpdateProductAction,
  fetchProducts,
} from "../redux/product/productActions";
import {
  Box,
  Button,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";
import { Product } from "../redux/product/reducer";

const ProductManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: "",
    image: "",
    title: "",
    description: "",
    price: 0,
  });

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProducts());
    }
  }, [dispatch, isAuthenticated]);

  const handleAddProduct = async () => {
    await dispatch(adminAddProductAction(currentProduct));
    resetForm();
    await dispatch(fetchProducts()); 
    onClose();
  };

  const handleUpdateProduct = () => {
    if (currentProduct.id) {
      dispatch(adminUpdateProductAction(currentProduct));
      resetForm();
      dispatch(fetchProducts()); 
      onClose();
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      id: "",
      image: "",
      title: "",
      description: "",
      price: 0,
    });
  };

  return (
    <Box p={4}>
      <Button
        onClick={() => {
          resetForm();
          onOpen();
        }}
        colorScheme="teal"
        mb={4}
      >
        Add New Product
      </Button>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={(product) => {
              setCurrentProduct(product);
              onOpen();
            }}
          />
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentProduct.id ? "Edit Product" : "Add New Product"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductForm
              product={currentProduct}
              onChange={(product) => setCurrentProduct(product)}
              onAdd={handleAddProduct}
              onUpdate={handleUpdateProduct}
              onCancel={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductManagement;
