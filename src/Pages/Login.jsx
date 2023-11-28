
import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!loginData.loginId || !/^[a-zA-Z0-9]{1,20}$/.test(loginData.loginId)) {
      newErrors.loginId =
        "Login ID is required and should be alphanumeric with maximum 20 characters";
    }

    if (
      !loginData.password ||
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{1,15}$/.test(
        loginData.password
      )
    ) {
      newErrors.password =
        "Password is required, should be alphanumeric, and can contain special characters with a maximum length of 15 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(
        "http://uatbenmoon.malayinfotech.com/api/memberlogin/", //API endpoint
        loginData
      );
      console.log("Login successful:", response.data);

      setLoginData({
        loginId: "",
        password: "",
      });

      navigate("/member");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Flex
      h={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={10} mx={"auto"} w={"30%"} py={12} px={6}>
        <Heading as="h2" size="xl" color="#2B6CB0" textAlign="center">
          Login Form
        </Heading>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="loginId" isInvalid={!!errors.loginId}>
                <FormLabel>Login ID</FormLabel>
                <Input
                  type="text"
                  name="loginId"
                  value={loginData.loginId}
                  onChange={handleChange}
                />
                {errors.loginId && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.loginId}
                  </Alert>
                )}
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.password}
                  </Alert>
                )}
              </FormControl>
              <Stack mt={5}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Log In
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
