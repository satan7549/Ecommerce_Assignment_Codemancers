import React from "react";
import { Box, Flex, Link, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/auth/reducer";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              Cart <span>(0)</span>
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
