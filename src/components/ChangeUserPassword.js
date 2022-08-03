import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/auth-context";

import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import axios from "axios";
import { API_URL } from "../config";

const ChangeUserPassword = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [currentPasswordErrorMsg, setCurrentPasswordErrorMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");
  const [confirmPasswordMatchError, setConfirmPasswordMatchError] = useState(false);
  const [confirmPasswordMatchErrorMsg, setConfirmPasswordMatchErrorMsg] = useState("");

  const route = useRoute();
  const request = route.params;
  // console.log(userId);
  // console.log("auth",auth.userId);

  let arrayData = [];
  for (const value in request) {
    arrayData.push(request[value]);
    // console.log(`key=${value}: ${request[value]}`);
  }
  console.log("arrayData: ", arrayData.join(""));
  const requestId = arrayData.join("");
  // console.log(request);
  console.log("id", requestId);

  const handleSubmit = async (values) => {
    console.log(values);
    if(currentPassword === "" && currentPassword.length < 7) {
      setCurrentPasswordError(true);
      setCurrentPasswordErrorMsg("Password must contain at least 7 characters");
    }
    if(newPassword === "" && newPassword.length < 7 ) {
      setNewPasswordError(true);
      setNewPasswordErrorMsg("Password must contain at least 7 characters");
    }
    if(confirmPassword === "" && confirmPassword < 7) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMsg("Password must contain at least 7 characters");
      
    }
    if(newPassword !== confirmPassword) {
      setConfirmPasswordMatchError(true);
      setConfirmPasswordMatchErrorMsg("password does not matched!!");
    }

    try {
      const response = await axios({
        method: "patch",
        url: `http://192.168.100.10:5000/userlist/changepassword/${requestId}`,
        data: {
          currentPassword: currentPassword,
          password: newPassword,
        },
      });

      console.log("response---", response);
      //   auth.login(response.data.userId, response.data.token);
      if (response.status === 200) {
        alert("user Password Changes successfully!");
        navigation.navigate("Settings");
        // values.password = "";
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <ScrollView>
      <Label />
      <Label text="Current Password" />
      <Input
        placeholder="Enter Current Password"
        onChangeText={(currentPassword) => {
          setCurrentPassword(currentPassword);
          if(currentPassword.length < 7) {
            setCurrentPasswordError(true);
            setCurrentPasswordErrorMsg("Password must contain at least 7 characters");

          } else {
            setCurrentPasswordError(false);
          }
        }}
        value={currentPassword}
        error={currentPasswordError === true ? <Text>{currentPasswordErrorMsg}</Text> : null}
        secureTextEntry
      />

      <Label text="Password" />
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

          } else if (newPassword !== confirmPassword) {
            setConfirmPasswordMatchError(true);
            setConfirmPasswordMatchErrorMsg("Password Does not matched!!!");
          } else {
            setConfirmPasswordError(false);
          }
        }}
        // onBlur={handleBlur("confirmPassword")}
        value={confirmPassword}
        error={confirmPasswordError === true ? <Text>{confirmPasswordErrorMsg}</Text> : null || confirmPasswordMatchError === true ? <Text>{confirmPasswordMatchErrorMsg}</Text> : null} 
        secureTextEntry
      />

      <Button title="Register" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ChangeUserPassword;
