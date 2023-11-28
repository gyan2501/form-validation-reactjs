import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Select,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    RegType: "Individual",
    Title: "",
    MemberName: "",
    FatherTitle: "",
    FatherName: "",
    BirthDate: "",
    MemberAddress: "",
    MemberPinCode: "",
    MobileNo: "",
    EmailID: "",
    MemberPANNo: "",
    aadharNumber: "",
    NomineeName: "",
    NomineeRelation: "",
    Password: "",
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!data.RegType) {
      newErrors.RegType = "Registration type is required";
    }

    if (!data.Title) {
      newErrors.Title = "Title is required";
    }

    if (!data.MemberName || data.MemberName.length > 60) {
      newErrors.MemberName =
        "Name is required and should be maximum 60 characters";
    }

    if (!data.FatherName || data.FatherName.length > 60) {
      newErrors.FatherName =
        "Father's Name is required and should be maximum 60 characters";
    }

    if (!data.MemberAddress || data.MemberAddress.length > 250) {
      newErrors.MemberAddress =
        "Address should be required & have maximum 250 characters";
    }

    if (
      !data.MemberPinCode ||
      data.MemberPinCode.length > 10 ||
      isNaN(data.MemberPinCode)
    ) {
      newErrors.MemberPinCode = "Invalid PIN Code";
    }

    if (!data.MobileNo || data.MobileNo.length > 10 || isNaN(data.MobileNo)) {
      newErrors.MobileNo = "Invalid Mobile Number";
    }

    if (
      !data.EmailID ||
      data.EmailID.length > 100 ||
      !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(data.EmailID)
    ) {
      newErrors.EmailID = "Invalid Email ID";
    }

    if (
      !data.MemberPANNo ||
      data.MemberPANNo.length !== 10 ||
      !/^[A-Z]{3}P[A-Z]{1}[0-9]{4}[A-Z]{1}$/.test(data.MemberPANNo)
    ) {
      newErrors.MemberPANNo = "Invalid PAN Number format";
    }

    if (
      !data.aadharNumber ||
      data.aadharNumber.length !== 12 ||
      isNaN(data.aadharNumber)
    ) {
      newErrors.aadharNumber = "Invalid Aadhar Number";
    }

    if (!data.NomineeName || data.NomineeName.length > 50) {
      newErrors.NomineeName =
        "Nominee Name should be required & have maximum 50 characters";
    }

    if (!data.NomineeRelation || data.NomineeRelation.length > 50) {
      newErrors.NomineeRelation =
        "Nominee Relation should be required & have maximum 50 characters";
    }

    if (
      !data.Password ||
      data.Password.length > 15 ||
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(
        data.Password
      )
    ) {
      newErrors.Password =
        "Password should be between 8 to 15 characters, alphanumeric with special characters";
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
    console.log(data);

    try {
      const response = await axios.post(
        "http://uatbenmoon.malayinfotech.com/api/memberapi/",
        data
      );
      console.log("Response:", response.data);

      setData({
        RegType: "Individual",
        Title: "",
        MemberName: "",
        FatherTitle: "",
        FatherName: "",
        BirthDate: "",
        MemberAddress: "",
        MemberPinCode: "",
        MobileNo: "",
        EmailID: "",
        MemberPANNo: "",
        aadharNumber: "",
        NomineeName: "",
        NomineeRelation: "",
        MemberAadharNo: "",
      });
      setErrors({});
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={10}
        mx={"auto"}
        w={{ md: "50%", sm: "100%", lg: "40%" }}
        py={12}
        px={6}
      >
        {" "}
        <Heading as="h2" size="xl" color="#2B6CB0" textAlign="center">
          Registration Form
        </Heading>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="registrationType" isInvalid={!!errors.RegType}>
                <FormLabel>Registration type</FormLabel>
                <Select
                  placeholder="Select Registration type"
                  name="RegType"
                  value={data.RegType}
                  onChange={handleChange}
                >
                  <option value="Individual">Individual</option>
                  <option value="Organization">Organization</option>
                </Select>
                {errors.RegType && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.RegType}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="title" isInvalid={!!errors.Title}>
                <FormLabel>Title</FormLabel>
                <Select
                  placeholder="Select Title"
                  name="Title"
                  value={data.Title}
                  onChange={handleChange}
                >
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                </Select>
                {errors.Title && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.Title}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="Name" isInvalid={!!errors.MemberName}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="MemberName"
                  value={data.MemberName}
                  onChange={handleChange}
                />
                {errors.MemberName && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.MemberName}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="relation">
                <FormLabel>Father / Husband Title</FormLabel>
                <Select
                  placeholder="Select Relation"
                  name="FatherTitle"
                  value={data.FatherName}
                  onChange={handleChange}
                >
                  <option value="S/O">S/O</option>
                  <option value="D/O"> D/O</option>
                  <option value="W/O"> W/O</option>
                </Select>
              </FormControl>

              <FormControl id="FatherName" isInvalid={!!errors.FatherName}>
                <FormLabel>Father's Name</FormLabel>
                <Input
                  type="text"
                  name="FatherName"
                  value={data.FatherName}
                  onChange={handleChange}
                />
                {errors.FatherName && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.FatherName}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="birthdate">
                <FormLabel>Birth Date</FormLabel>
                <Input
                  type="date"
                  name="BirthDate"
                  value={data.BirthDate}
                  onChange={handleChange}
                />
                {/* {errors.MemberPANNo && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.MemberPANNo}
                  </Alert>
                )} */}
              </FormControl>

              <FormControl id="address" isInvalid={!!errors.MemberAddress}>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  name="MemberAddress"
                  value={data.MemberAddress}
                  onChange={handleChange}
                />
                {errors.MemberAddress && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.MemberAddress}
                  </Alert>
                )}
              </FormControl>
              <FormControl id="PINCode" isInvalid={!!errors.MemberPinCode}>
                <FormLabel>PIN Code</FormLabel>
                <Input
                  type="number"
                  name="MemberPinCode"
                  value={data.MemberPinCode}
                  onChange={handleChange}
                />
                {errors.MemberPinCode && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.MemberPinCode}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="MobileNo" isInvalid={!!errors.MobileNo}>
                <FormLabel>Mobile No</FormLabel>
                <Input
                  type="number"
                  name="MobileNo"
                  value={data.MobileNo}
                  onChange={handleChange}
                />
                {errors.MobileNo && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.MobileNo}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="email" isInvalid={!!errors.EmailID}>
                <FormLabel>Email ID</FormLabel>
                <Input
                  type="email"
                  name="EmailID"
                  value={data.EmailID}
                  onChange={handleChange}
                />

                {errors.EmailID && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.EmailID}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="PANNumber" isInvalid={!!errors.MemberPANNo}>
                <FormLabel>PAN Number</FormLabel>
                <Input
                  type="text"
                  name="MemberPANNo"
                  value={data.MemberPANNo}
                  onChange={handleChange}
                />

                {errors.MemberPANNo && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.MemberPANNo}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="AadharNumber" isInvalid={!!errors.aadharNumber}>
                <FormLabel>Aadhar Number</FormLabel>
                <Input
                  type="number"
                  name="aadharNumber"
                  value={data.aadharNumber}
                  onChange={handleChange}
                />

                {errors.aadharNumber && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.aadharNumber}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="NomineeName" isInvalid={!!errors.NomineeName}>
                <FormLabel>Nominee Name</FormLabel>
                <Input
                  type="text"
                  name="NomineeName"
                  value={data.NomineeName}
                  onChange={handleChange}
                />
                {errors.NomineeName && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.NomineeName}
                  </Alert>
                )}
              </FormControl>

              <FormControl
                id="NomineeRelation"
                isInvalid={!!errors.NomineeRelation}
              >
                <FormLabel>Nominee Relation</FormLabel>
                <Input
                  type="text"
                  name="NomineeRelation"
                  value={data.NomineeRelation}
                  onChange={handleChange}
                />
                {errors.NomineeRelation && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.NomineeRelation}
                  </Alert>
                )}
              </FormControl>

              <FormControl id="password" isInvalid={!!errors.Password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="Password"
                  value={data.Password}
                  onChange={handleChange}
                />
                {errors.Password && (
                  <Alert status="error" borderRadius="md" mt="1">
                    <AlertIcon />
                    {errors.Password}
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
};

export default Registration;
