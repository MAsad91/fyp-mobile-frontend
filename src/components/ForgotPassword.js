import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/auth-context";
import ResetPasswordForm from "./ResetPasswordForm";
import { API_URL } from "../config";

import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import axios from "axios";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(true);
  const signUpSchema = yup.object().shape({
    email: yup.string().email().required("Email is required!"),
  });
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      setEmail(values.email);
      const response = await axios({
        method: "post",
        url: `${API_URL.localhost}/auth/emailsend`,
        data: {
          email: values.email,
        },
      });

      console.log("response---", response);
      if (response.status === 200) {

        alert("OTP Send Successfully!");
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
      const message =
        err.response.data.message || "Something went wrong,Please try again!";
      alert(message);
    }
  };
  return (
    <View>
        {showForm ? (
            <Formik
            validationSchema={signUpSchema}
            initialValues={{
              email: "",
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
              <ScrollView style={styles.forgetscroll}>
                <Text style={styles.subheading}>Enter Email For OTP</Text>
    
                <Label />
                <Label text="Email" />
                <Input
                  placeholder="Enter Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={touched.email && errors.email}
                />
                <Button title="Send OTP" onPress={handleSubmit} />
                <View style={styles.row}>
                  <Text>Not a member?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("SignUp");
                    }}
                  >
                    <Text style={styles.link}> SignUp?</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </Formik>
        ) : (
            <ResetPasswordForm email={email}/>
        )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  forgetscroll: {
    marginVertical: 120,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "center",
  },
  subheading: {
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 80,
    marginBottom: 20,
  },
  link: {
    fontWeight: "bold",
  },
});

export default ForgotPassword;
