import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../context/auth-context";
import { useNavigation } from "@react-navigation/native";

const LogoutScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const ReturnModal = () => {
    Alert.alert(
      "Log out",
      "Do you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            auth.logout();
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    ReturnModal();
  }, []);
  return <View></View>;
};

const styles = StyleSheet.create({});

export default LogoutScreen;
