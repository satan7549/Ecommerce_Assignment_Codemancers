import React from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { Product } from "../redux/product/reducer";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
}) => {
  return (
    <Box key={product.id} borderWidth="1px" borderRadius="lg" p={4}>
      <Image
        src={product.image}
        alt={product.title}
        boxSize="100px"
        objectFit="cover"
      />
      <Text fontWeight="bold">{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>${product.price}</Text>
      <Button onClick={() => onEdit(product)}>Edit</Button>
    </Box>
  );
};

export default ProductCard;
