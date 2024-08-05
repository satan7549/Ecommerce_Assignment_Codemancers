import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { signup } from "../redux/auth/authActions";
import { UserRole } from "../types/user";

interface SignupDetails {
  email: string;
  password: string;
  role: UserRole;
}

const initState: SignupDetails = {
  email: "",
  password: "",
  role: UserRole.USER,
};

const Signup: React.FC = () => {
  const [signupDetails, setSignupDetails] = useState<SignupDetails>(initState);
  const { email, password, role } = signupDetails;

  const authData = useSelector((state: RootState) => state.auth);
  const { loading, isAuthenticated, user, error } = authData;

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value as UserRole });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  const handleSignup = async (): Promise<any> => {
    if (email === "" || password === "") {
      return toast({
        title: "Validation Error",
        description: "Fill both credentials",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    dispatch(signup(signupDetails));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: `Welcome, ${user?.email}!`,
        description: "Signup successful.",
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
        title: "Signup Failed.",
        description: `${error}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleLogin = (): void => {
    navigate("/login");
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
          SIGNUP FORM
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
        <FormControl p={2}>
          <Select
            name="role"
            value={role}
            onChange={handleChange}
            placeholder="Select Role"
            borderRadius="lg"
            focusBorderColor="teal.100"
          >
            <option value={UserRole.USER}>User</option>
            <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
          </Select>
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
            onClick={handleSignup}
          >
            SIGN UP
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
            onClick={handleLogin}
          >
            LOGIN
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default Signup;
