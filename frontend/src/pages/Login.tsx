import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { login } from "../redux/auth/authActions";
import { loginFail } from "../redux/auth/reducer";

interface LoginDetails {
  email: string;
  password: string;
}

const initState: LoginDetails = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>(initState);
  const { email, password } = loginDetails;

  const authData = useSelector((state: RootState) => state.auth);
  const { loading, isAuthenticated, user, error } = authData;

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async (): Promise<any> => {
    if (email === "" || password === "") {
      return toast({
        title: "Validation Error",
        description: "Fill both credentials",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    dispatch(login(loginDetails));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: `Hello, ${user?.email}!`,
        description: "Login successful.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    }
  }, [isAuthenticated, toast, navigate]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Login Failed.",
        description: `${error}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    dispatch(loginFail(null));
  }, [error, toast]);

  const handleSignUp = (): void => {
    navigate("/signup");
  };

  return (
    <Container
      width="100%"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        width="full"
        maxWidth="400px"
        borderRadius="lg"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        p={4}
      >
        <Heading
          fontWeight="bolder"
          textAlign="center"
          fontSize="20px"
          mb="20px"
        >
          LOGIN FORM
        </Heading>
        <FormControl p={2}>
          <Input
            name="email"
            value={email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Enter Email"
            borderRadius="lg"
            focusBorderColor="teal.100"
            required
          />
        </FormControl>
        <FormControl p={2}>
          <Input
            name="password"
            value={password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="password"
            placeholder="Enter password"
            borderRadius="lg"
            focusBorderColor="teal.100"
            required
          />
        </FormControl>

        <FormControl>
          <Button
            isLoading={loading}
            loadingText="Submitting"
            width="full"
            p={4}
            borderRadius="lg"
            colorScheme="teal"
            _hover={{
              bg: "teal.300",
              color: "white",
            }}
            variant="outline"
            mt={4}
            onClick={handleLogin}
          >
            LOGIN
          </Button>
        </FormControl>
        <FormControl>
          <Button
            width="full"
            p={4}
            borderRadius="lg"
            colorScheme="teal"
            _hover={{
              bg: "teal.300",
              color: "white",
            }}
            variant="outline"
            mt={4}
            onClick={handleSignUp}
          >
            SIGN UP
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
};
export default Login;
