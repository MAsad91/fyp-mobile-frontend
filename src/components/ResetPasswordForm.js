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
import { API_URL } from "../config";

import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import axios from "axios";

const ResetPasswordForm = (props) => {
  console.log("email",props.email);
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [otpErrorMsg, setOtpErrorMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");
  const [confirmPasswordMatchError, setConfirmPasswordMatchError] = useState(false);
  const [confirmPasswordMatchErrorMsg, setConfirmPasswordMatchErrorMsg] = useState("");

  // const route = useRoute();
  // const request = route.params;
  // let arrayData = [];
  // for (const value in request) {
  //   arrayData.push(request[value]);
  //   // console.log(`key=${value}: ${request[value]}`);
  // }
  // console.log("arrayData: ", arrayData.join(""));
  // const userId = arrayData.join("");
  // // console.log(request);
  // console.log("id", userId);

  // const ResetPasswordSchema = yup.object().shape({
  //   otp:yup
  //       .otp().required("OTP is required"),
  //   newpassword: yup
  //     .string()
  //     .min(7, "Password must contain at least 7 characters")
  //     .required("new password is required"),
  //   confirmPassword: yup
  //     .string()
  //     .required("Please confirm your password")
  //     .when("password", {
  //       is: (newpassword) =>
  //         newpassword && newpassword.length > 0 ? true : false,
  //       then: yup
  //         .string()
  //         .oneOf([yup.ref("password")], "Password doesn't match"),
  //     }),
  // });
  const handleSubmit = async (values) => {
    console.log(values);
    if (otp === "" && otp.length < 4) {
      setOtpError(true);
      setOtpErrorMsg("OTP contain 4 digits");
    }

    if (newPassword === "" && newPassword.length < 7) {
      setNewPasswordError(true);
      setNewPasswordErrorMsg("Password must contain at least 7 characters");
    }
    if (confirmPassword === "" && confirmPassword < 7) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMsg("Password must contain at least 7 characters");
    }
    if (newPassword !== confirmPassword) {
      console.log(newPassword, confirmPassword);
      setConfirmPasswordMatchError(true);
      setConfirmPasswordMatchErrorMsg("password does not matched!!!");
    } else {
      setConfirmPasswordMatchError(false);
      setConfirmPasswordMatchErrorMsg("");
    }

    try {
      const response = await axios({
        method: "post",
        url: `${API_URL.localhost}/auth/changepassword`,
        data: {
          otp: otp,
          email: props.email,
          password: newPassword,
        },
      });

      console.log("response---", response);
      if (response.status === 200) {
        alert("user password Reset Successfully!");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <ScrollView>
      <Label text="" />
      <Label text="OTP" />
      <Input
        placeholder="Enter OTP"
        onChangeText={(otp)=> {
          setOtp(otp);
          if(otp.length<4 || isNaN(otp)) {
            setOtpError(true);
            setOtpErrorMsg("OTP must contain 4 digits!");
          } else {
            setOtpError(false);
          }
        }}
        value={otp}
        error={otpError === true ? <Text>{otpErrorMsg}</Text>: null}
      />

      <Label text="New Password" />
      <Input
        placeholder="Enter Password"
        onChangeText={(newPassword) => {
          setNewPassword(newPassword);
          if(newPassword.length < 7) {
            setNewPasswordError(true);
            setNewPasswordErrorMsg("Password must contain at least 7 characters");

          } else {
            setNewPasswordError(false);
          }
        }}
        // onBlur={handleBlur("password")}
        value={newPassword}
        error={newPasswordError === true ? <Text>{newPasswordErrorMsg}</Text> : null}
        secureTextEntry
      />

      <Label text="Confirm Password" />
      <Input
        placeholder="Confirm Password"
        onChangeText={(confirmPassword) => {
          setConfirmPassword(confirmPassword);
          if(confirmPassword.length < 7 ) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMsg("Password must contain at least 7 characters");

          } else {
            setConfirmPasswordError(false);
          }
        }}
        // onBlur={handleBlur("confirmPassword")}
        value={confirmPassword}
        error={confirmPasswordError === true ? <Text>{confirmPasswordErrorMsg}</Text> : null || confirmPasswordMatchError === true ? <Text>{confirmPasswordMatchErrorMsg}</Text> : null} 
        secureTextEntry
      />
      <Button title="Reset Password" onPress={handleSubmit} />
      <View style={styles.row}>
        <Text>Go to Login Page?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.link}> Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "center",
  },
  link: {
    fontWeight: "bold",
  },
});

export default ResetPasswordForm;
