import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/auth-context";

import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import axios from "axios";
import PhoneInput from "react-native-phone-number-input";

const SignUpForm = () => {
  // const [value, setValue] = useState("");
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const signUpSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Name must contain atleast 3 characters")
      .required("Name is required"),
    email: yup.string().email().required("Email is required!"),
    password: yup
      .string()
      .min(7, "Password must contain at least 7 characters")
      .required("password is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Password doesn't match"),
      }),
    address: yup
      .string()
      .min(10, "Address must contain atleast 10 characters")
      .required("Address is required"),
    // contactno: yup
    //   .number()
    //   .min(12, "Contact number must contain 12 digits")
    //   // .max(11, "Contact number not be greater then 11 digits")
    //   .required("Contact Number is required"),
  });
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.100.10:5000/auth/signup`,
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          address: values.address,
          contactno: values.contactno,
        },
      });

      console.log("response---", response);
      // auth.login(response.data.userId, response.data.token);
      let msg = response.data.message;
      alert("Email Verification ", msg);
      navigation.navigate('EmailVerify');
      const statusCode = response.status;
      if (statusCode === 201) {
        navigation.navigate("Login");
        values.name = "";
        values.password = "";
        values.email = "";
        values.address = "";
        values.contactno = "";
      }
    } catch (err) {
      const message = err.response.data.message || "Something went wrong,Please try again!";
      console.log(err);
      alert("SignUp Failed ",message);
    }
  };
  return (
    <Formik
      validationSchema={signUpSchema}
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

          <Label text="Address" />
          <Input
            placeholder="Enter Address"
            onChangeText={handleChange("address")}
            onBlur={handleBlur("address")}
            value={values.address}
            error={touched.address && errors.address}
          />

          <Label text="Contact-No" />
          {/* <PhoneInput
            // ref={phoneInput}
            // defaultValue={value}
            defaultCode="IN"
            onChangeFormattedText={handleChange("contactno")}
            value={values.contactno}
            error={touched.contactno && errors.contactno}
            withDarkTheme
            withShadow
            autoFocus
          /> */}
          <Input
            keyboardType="phone-pad"
            placeholder="Enter Contact No e.g (0315-1234567)"
            onChangeText={handleChange("contactno")}
            onBlur={handleBlur("contactno")}
            value={values.contactno}
            // error={touched.contactno && errors.contactno}
          />
          <Button title="Register" onPress={handleSubmit} />
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({});

export default SignUpForm;
