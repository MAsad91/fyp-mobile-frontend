import React from "react";
import { View, StyleSheet } from "react-native";
// import EmailVerify from "../EmailVerify/EmailVerify";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DrawerNavigator from "./DrawerNavigator";
import ForgotPassword from "../components/ForgotPassword";
import ResetPasswordForm from "../components/ResetPasswordForm";
import EmailVerify from "../EmailVerify/EmailVerify";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Auth = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* <Stack.Screen 
        options={{ headerShown: true }}
        name="Verify"
        component={EmailVerify}
      /> */}
      <Stack.Screen
        options={{ headerShown: true }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
      options={{ headerShown: true }}
      name="ForgotPassword"
      component={ForgotPassword}
      />
      <Stack.Screen 
      options={{ headerShown: true }}
      name="ResetPasswordForm"
      component={ResetPasswordForm}
      />
      <Stack.Screen
      options={{headerShown: true}}
      name="EmailVerify"
      component={EmailVerify}
      />
      <Stack.Screen
        name="DrawerNavigationRoutes"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Auth;
