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

const ChangeUserPassword = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const userId = route.params;

  const changeUserPasswordSchema = yup.object().shape({
    currentpassword: yup
      .string()
      .min(7, "Password must contain at least 7 characters")
      .required("current password is required"),
    newpassword: yup
      .string()
      .min(7, "Password must contain at least 7 characters")
      .required("new password is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .when("password", {
        is: (newpassword) =>
          newpassword && newpassword.length > 0 ? true : false,
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Password doesn't match"),
      }),
  });
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const response = await axios({
        method: "patch",
        url: `http://192.168.100.10:5000/userlist/changepassword/${userId}`,
        data: {
          password: values.newpassword,
        },
      });

      console.log("response---", response);
    //   auth.login(response.data.userId, response.data.token);
      if (response.status === 201) {
        navigation.navigate("settings");
        // values.password = "";
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <Formik
      validationSchema={changeUserPasswordSchema}
      initialValues={{
        currentpassword: "",
        newpassword: "",
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
          <Label text="Current Password" />
          <Input
            placeholder="Enter Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.currentpassword}
            error={touched.currentpassword && errors.currentpassword}
            secureTextEntry
          />

          <Label text="New Password" />
          <Input
            placeholder="Enter Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.newpassword}
            error={touched.newpassword && errors.newpassword}
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

          <Button title="Register" onPress={handleSubmit} />
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({});

export default ChangeUserPassword;
