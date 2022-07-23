import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "90%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginVertical: 10,
    borderRadius: 10,
    marginLeft: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default Button;
