import {
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Member = () => {
  return (
    <Flex
      h={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={10} mx={"auto"} w={"30%"} py={12} px={6}>
        <Heading as="h2" size="xl" color="#2B6CB0" textAlign="center">
          Member Details
        </Heading>
        <Stack
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          spacing={3}
        >
          <Text fontSize="lg">Member Name:</Text>
          <Text fontSize="lg">Member Address:</Text>
          <Text fontSize="lg">Member PIN Code:</Text>
          <Text fontSize="lg">Mobile No:</Text>
          <Text fontSize="lg">Email ID:</Text>
          <Text fontSize="lg">Member PANNo:</Text>
          <Text fontSize="lg">Birth Date:</Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Member;
