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

const DeleteUserAccount = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params;
  let arrayData=[] ;
  for (const value in userId) {
    arrayData.push(userId[value]);
    console.log(`key=${value}: ${userId[value]}`);
    
  }
  console.log("arrayData: ",arrayData.join(''));
  const requestId = arrayData.join('');
  // console.log(user);
  console.log("id",requestId);
  // console.log(userId);

  const deleteUserSchema = yup.object().shape({
    password: yup
      .string()
      .min(7, "Password must contain at least 7 characters")
      .required("current password is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .when("password", {
        is: (password) =>
          password && password.length > 0 ? true : false,
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Password doesn't match"),
      }),
  });
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const response = await axios({
        method: "delete",
        url: `http://192.168.100.10:5000/userlist/deleteaccount/${requestId}`,
        data: {
          password: values.password,
        },
      });

      console.log("response---", response);
    //   auth.login(response.data.userId, response.data.token);
      if (response.status === 201) {
        alert("User Deleted Successfully!")
        auth.logout();
        navigation.navigate("Login");
        // values.password = "";
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <Formik
      validationSchema={deleteUserSchema}
      initialValues={{
        password: "",
        confirmPassword: "",
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
          <Label text="Password" />
          <Input
            placeholder="Enter Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            error={touched.password && errors.password}
            secureTextEntry
          />

          <Label text="Confirm Password" />
          <Input
            placeholder="Confirm Password"
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            error={touched.confirmPassword && errors.confirmPassword}
            secureTextEntry
          />

          <Button title="Delete" onPress={handleSubmit} />
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({});

export default DeleteUserAccount;
