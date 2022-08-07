import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Button from "./Button";

const ImageUploader = (props) => {
  const [doc, setDoc] = useState();

  //   props.pickImage(doc);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true
    }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        let fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "image/" + fileType
        };
        console.log(fileToUpload, "...............file");
        setDoc(fileToUpload);
      }
    });
    // console.log(result);
    // console.log("Doc: " + doc.uri);
  };

  if (doc) {
    props.func(doc);
  }

  return (
    <View>
      <Button title="   Upload Image   " onPress={pickDocument} />
      {doc && <Text style={styles.success}>Image is selected</Text>}
      {/* {!doc && <Text style={styles.error}>Image must be choose</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
//   error: {
//     color: "red",
//     fontSize: 15,
//     marginTop: 3,
//     textAlign: "center"
//   },
  success: {
    color: "green",
    fontSize: 15,
    marginTop: 3,
    textAlign: "center"
  }
});

export default ImageUploader;
