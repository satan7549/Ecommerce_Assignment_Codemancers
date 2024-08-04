import React, { useEffect, useState } from "react";
import { Box, Flex, Link, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/auth/reducer";

const Navbar: React.FC = () => {
  // const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const quantity = items.reduce((acc, item) => acc + item.count, 0);
  //   setTotalQuantity(quantity);
  // }, [items]);

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box p={4} bg="teal.500" color="white">
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to="/" fontSize="lg" fontWeight="bold">
          ECommerce
        </Link>
        <Flex align="center" gap={4}>
          <Link as={RouterLink} to="/cart" fontSize="lg" fontWeight="bold">
            <Text>
              Cart <span>{items.length}</span>
            </Text>
          </Link>
          <Button onClick={handleLoginLogout} colorScheme="teal">
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
