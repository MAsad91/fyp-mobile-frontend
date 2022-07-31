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

import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import axios from "axios";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [showForm, setShowForm] = useState(true);
  const signUpSchema = yup.object().shape({
    email: yup.string().email().required("Email is required!"),
  });
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.100.10:5000/auth/emailsend`,
        data: {
          email: values.email,
        },
      });

      console.log("response---", response);
      //   auth.login(response.data.userId, response.data.token);
      if (response.status === 201) {
        // navigation.navigate("settings");
        alert("OTP Send Successfully!");
        setShowForm(false);
        // values.password = "";
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
        {showForm && (
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
                {/* <View style={{ display: "flex", gap: "0.3rem" }}>
                
              </View> */}
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
        )}
        {!showForm && (
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
