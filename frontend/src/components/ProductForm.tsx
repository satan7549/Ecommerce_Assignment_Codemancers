import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Image,
} from "@chakra-ui/react";
import { Product } from "../redux/product/reducer";

interface ProductFormProps {
  product: Product;
  onChange: (product: Product) => void;
  onAdd: () => void;
  onUpdate: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onChange,
  onAdd,
  onUpdate,
  onCancel,
}) => {
  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          value={product.title}
          onChange={(e) => onChange({ ...product, title: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          value={product.description}
          onChange={(e) =>
            onChange({ ...product, description: e.target.value })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          value={product.price}
          onChange={(e) =>
            onChange({ ...product, price: parseFloat(e.target.value) })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input
          value={product.image}
          onChange={(e) => onChange({ ...product, image: e.target.value })}
        />
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            boxSize="150px"
            objectFit="cover"
            mt={2}
          />
        )}
      </FormControl>
      <Button colorScheme="teal" onClick={onAdd} isDisabled={!!product.id}>
        Add Product
      </Button>
      <Button colorScheme="teal" onClick={onUpdate} isDisabled={!product.id}>
        Update Product
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </VStack>
  );
};

export default ProductForm;
