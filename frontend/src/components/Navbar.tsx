import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Link,
  Text,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/auth/reducer";
import { UserRole } from "../types/user";
import { fetchCart } from "../redux/cart/cartActions";
import { clearCart } from "../redux/cart/reducer";

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  );
  const { items } = useSelector((state: RootState) => state.cart);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      dispatch(logout());
      dispatch(clearCart());
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const getActiveLinkStyle = (path: string) => {
    return location.pathname === path
      ? { fontWeight: "bold", color: "teal.200" }
      : {};
  };

  return (
    <Box p={4} bg="teal.500" color="white">
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        wrap="wrap"
      >
        <Link
          as={RouterLink}
          to="/"
          fontSize="lg"
          fontWeight="bold"
          style={getActiveLinkStyle("/")}
        >
          ECommerce
        </Link>
        <Flex align="center" gap={4} display={{ base: "none", md: "flex" }}>
          {isAuthenticated && role === UserRole.SUPER_ADMIN && (
            <Link
              as={RouterLink}
              to="/admin/products"
              fontSize="lg"
              fontWeight="bold"
              style={getActiveLinkStyle("/admin/products")}
            >
              <Text>Product Management</Text>
            </Link>
          )}
          <Link
            as={RouterLink}
            to="/cart"
            fontSize="lg"
            fontWeight="bold"
            style={getActiveLinkStyle("/cart")}
          >
            <Text>
              Cart <span>({items.length})</span>
            </Text>
          </Link>
          <Button onClick={handleLoginLogout} colorScheme="teal">
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Flex>
        <Button
          display={{ base: "block", md: "none" }}
          onClick={onOpen}
          colorScheme="teal"
        >
          Menu
        </Button>
      </Flex>

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={4}>
              <Link
                as={RouterLink}
                to="/"
                fontSize="lg"
                fontWeight="bold"
                style={getActiveLinkStyle("/")}
              >
                ECommerce
              </Link>
              {isAuthenticated && role === UserRole.SUPER_ADMIN && (
                <Link
                  as={RouterLink}
                  to="/admin/products"
                  fontSize="lg"
                  fontWeight="bold"
                  style={getActiveLinkStyle("/admin/products")}
                >
                  Product Management
                </Link>
              )}
              <Link
                as={RouterLink}
                to="/cart"
                fontSize="lg"
                fontWeight="bold"
                style={getActiveLinkStyle("/cart")}
              >
                Cart <span>({items.length})</span>
              </Link>
              <Button onClick={handleLoginLogout} colorScheme="teal">
                {isAuthenticated ? "Logout" : "Login"}
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
