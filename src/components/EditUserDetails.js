import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/auth-context";

import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import axios from "axios";

const EditUserDetailForm = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params;

  const editUserDetailSchema = yup.object().shape({
    name: yup.string().min(3, "Name must contain atleast 3 characters"),
    email: yup.string().email(),
    address: yup.string().min(10, "Address must contain atleast 10 characters"),
    contactno: yup.number().min(11, "Contact number must contain 11 digits"),
    // .max(11, "Contact number not be greater then 11 digits"),
  });
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const response = await axios({
        method: "patch",
        url: `http://192.168.100.10:5000/userlist/user/changedetails/${userId}`,
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          address: values.address,
          contactno: values.contactno,
        },
      });

      console.log("response---", response);
    //   auth.login(response.data.userId, response.data.token);
      if (response.status === 201) {
        navigation.navigate("settings");
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
        name: "",
        email: "",
        address: "",
        contactno: "",
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
            keyboardType="number-pad"
            placeholder="Enter Contact No e.g (03151234567)"
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
