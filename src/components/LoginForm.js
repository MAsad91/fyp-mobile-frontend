import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { AuthContext } from "../context/auth-context";
import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import { API_URL } from "../config";

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const loginSchema = yup.object().shape({
    email: yup.string().email().required("Email is required!"),
    password: yup
      .string()
      .min(7, "Password must contain at least 7 characters")
      .required("Password is required!"),
  });
  const handleSubmit = async (values) => {
    console.log("login values", values);

    try {
      const response = await axios({
        method: "post",
        url: `${API_URL.localhost}/auth/login`,
        data: {
          email: values.email,
          password: values.password,
        },
      });

      console.log("response---", response);
      auth.login(response.data.userId, response.data.token);
      if (response.status === 200) {
        alert("Login Successfully!");
        navigation.navigate("DrawerNavigationRoutes");
        values.email = "";
        values.password = "";
        0;
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message || "Something went wrong,Please try again!";
      alert(message);
    }
  };
  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{ email: "", password: "" }}
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
        <View>
          <Label text="Email" />
          <Input
            placeholder="Enter Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            error={touched.email && errors.email}
          />
          <Label text="Password" />
          <Input
            placeholder="Enter Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            error={touched.password && errors.password}
            secureTextEntry
          />
          <Button title="Login" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
