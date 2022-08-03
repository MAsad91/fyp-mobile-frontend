import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import "yup-phone";
import { AuthContext } from "../context/auth-context";

import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import axios from "axios";
import { API_URL } from "../config";

const EditUserDetailForm = () => {
  const [userData, setUserData] = useState([]);
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const request = route.params;
  let arrayData=[] ;
  for (const value in request) {
    arrayData.push(request[value]);
    console.log(`key=${value}: ${request[value]}`);
    
  }
  console.log("arrayData: ",arrayData.join(''));
  const requestId = arrayData.join('');
  console.log(request);
  console.log("id",requestId);
  // console.log(userId);


  let regex = /[0]{1}[3]{1}[0-9]{2}-[0-9]{7}/gm;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL.localhost}/userlist/${auth.userId}`
        );
        setUserData(data[0]);
        // console.log("Data---: ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchUser();
  }, []);
  console.log(userData.name);

  // if (name === "" && name.length < 3) {
  //   setNameError(true);
  //   setNameErrorMsg("Name must have 3 or more characters");
  // }
  // if ()
  // if (address === "" && address.length < 10) {
  //   setAddressError(true);
  //   setAddressErrorMsg("Address must contain atleast 10 characters");
  // }
  
  const editUserDetailSchema = yup.object().shape({
    name: yup.string().min(3, "Name must contain atleast 3 characters"),
    email: yup.string().email(),
    address: yup.string().min(10, "Address must contain atleast 10 characters"),
    contactno: yup
      .string()
      // .phone(null, true, "Contact No is not valid")
      .matches(regex, "Contact No is not valid")
      .min(12, "Contact number must contain 12 digits")
      .max(12, "Contact number not be greater then 12 digits"),
  });
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const response = await axios({
        method: "patch",
        url: `${API_URL.localhost}/userlist/user/changedetails/${requestId}`,
        data: {
          name: values.name,
          email: values.email,
          address: values.address,
          contactno: values.contactno,
        },
      });

      console.log("response---", response);
      //   auth.login(response.data.userId, response.data.token);
      if (response.status === 200) {
        alert("User Details Changed Successfully");
        navigation.navigate("Settings");
        // values.name = "";
        // values.email = "";
        // values.address = "";
        // values.contactno = "";
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <Formik
      validationSchema={editUserDetailSchema}
      initialValues={{
        name: userData.name,
        email: userData.email,
        address: userData.address,
        contactno: userData.contactno,
      }}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <ScrollView>
          <Label text="" />
          <Label text="Name" />
          <Input
            placeholder="Enter Name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            error={touched.name && errors.name}
          />

          <Label text="Email" />
          <Input
            placeholder="Enter Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            error={touched.email && errors.email}
          />

          <Label text="Address" />
          <Input
            placeholder="Enter Address"
            onChangeText={handleChange("address")}
            onBlur={handleBlur("address")}
            value={values.address}
            error={touched.address && errors.address}
          />

          <Label text="Contact-No" />
          <Input
            keyboardType="phone-pad"
            placeholder="Enter Contact No e.g (0315-1234567)"
            onChangeText={handleChange("contactno")}
            onBlur={handleBlur("contactno")}
            value={values.contactno}
            error={touched.contactno && errors.contactno}
          />
          <Button title="Register" onPress={handleSubmit} />
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({});

export default EditUserDetailForm;