import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { Box, SimpleGrid, Text, Heading } from "@chakra-ui/react";
import { fetchProducts } from "../redux/product/productActions";
import Product from "../components/Product";
import Loading from "../components/Loading";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Text>Please log in to view products.</Text>;
  }

  if (loading) return <Loading />;

  if (error) return <Text>Error: {error}</Text>;

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={6}>
        Products
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            count={0}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
