import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Label = ({ text }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: "90%",
    marginLeft: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Label;
