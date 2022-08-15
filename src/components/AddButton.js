import React from "react";
import { View, StyleSheet, Button } from "react-native";

const AddButton = ({ onPress }) => {
  return (
    <View style={styles.button}>
      <Button  title="Add Report" color="black" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
  },
});

export default AddButton;
