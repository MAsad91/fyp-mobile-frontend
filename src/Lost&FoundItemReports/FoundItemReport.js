import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Button } from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";
import axios from "axios";
import {API_URL} from "../config";
import { AuthContext } from "../context/auth-context";
import ImageUploader from "../components/userImageUploader";
const FoundItemReport = ({
  key,
  creator,
  id,
  founditemtype,
  details,
  description,
  color,
  name,
  state,
  itemname,
  location,
  image,
}) => {

  const pickImage = (img) => {
    setUserImage(img);
    handleSubmit();
  };
  const handleSubmit = async () => {
    console.log("data to be submitted",userImage, itemname, creator,id)
    try {
      let formData = new FormData();
      // image.map((image) => {
      //   formData.append("images", image.originFileObj);
      // });
      formData.append("images", userImage);
      formData.append("itemname", itemname);
      formData.append("creator", creator);
      formData.append("reportId", id);
      const response = await axios({
        method: "post",
        url: `${API_URL.localhost}/found-report/founditemimage`,
        data: formData,
        headers: {
          // "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      let result = response.data.result;
      alert("Image Comparison Result", result);
      if (response.status === 201) {
        alert("found Item Image Uploaded Successfully!");
        setUserImage(null);
      }
    } catch (err) {
      alert("Uploading found Item Image is Failed" || error.response.data.message);
    }
  };

  console.log(id);
  const cardImage = image[0];
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  const onDeleteUsers = async (id) => {
    
    const response = await axios.delete(
      `${API_URL.localhost}/found-report/${id}`
    );
    if (response.status === 200) {
      alert("Deleted successfully!",response.status);
    }
  };

  return (
    <View style={styles.list}>
      {auth.userId === creator && (
        <Card key={key} style={styles.cardStyle}>
          <CardImage source={{ uri: cardImage }} title="found Item image" />
          <CardTitle
            title={founditemtype}
            subtitle={`Details: ${details}\n\nDescription: ${description}`}
          />
          <CardAction separator={true} />
          <CardContent text={`\nItem Name: ${itemname}`} />

          <CardContent text={`Color: ${color}`} />

          <CardContent text={`State: ${state}`} />

          <CardContent text={`Location: ${location}`} />

          <CardContent text={`Report Name: ${name}`} />

          <CardAction separator={true} />

          <Text style={styles.text}>Upload found Item Image You found</Text>
          <View style={styles.imageStyle}>
          <ImageUploader func={pickImage} />
            {/* <Button
              title="Pick Image on Roll Camera"
              color="black"
              onPress={() => {}}
            /> */}
          </View>
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => {
                navigation.navigate("Main", {
                  screen: "FoundItemEditForm",
                  params: id,
                });
              }}
              title="Edit"
              color="black"
            />
            <CardButton
              onPress={() => {
                onDeleteUsers(id);
              }}
              title="Delete"
              color="red"
            />
          </CardAction>
        </Card>
      )}
      {!(auth.userId === creator) && (
        <Card key={key} style={styles.cardStyle}>
          <CardImage src={{ uri: image }} title="found Item image" />
          <CardTitle
            title={founditemtype}
            subtitle={`Details: ${details}\n\nDescription: ${description}`}
          />
          <CardAction separator={true} />
          <CardContent text={`\nItem Name: ${itemname}`} />

          <CardContent text={`Color: ${color}`} />

          <CardContent text={`State: ${state}`} />

          <CardContent text={`Location: ${location}`} />

          <CardContent text={`Report Name: ${name}`} />

          <CardAction separator={true} inColumn={false}>
            {/* <CardButton
                onPress={() => {}}
                title="Edit"
                color="black"
              /> */}
            {/* <CardButton
                onPress={() => {}}
                title="Delete"
                color="red"
              /> */}
          </CardAction>
          <Text style={styles.text}>Upload found Item Image You found</Text>
          <View style={styles.imageStyle}>
          <ImageUploader func={pickImage} />
            {/* <Button
              title="Pick Image on Roll Camera"
              color="black"
              onPress={() => {}}
            /> */}
          </View>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 5,
    borderBottomWidth: 10,
    borderBottomColor: "black",
    backgroundColor: "snow",
    padding: 1,
    marginVertical: 12,
    marginLeft: 15,
    marginTop: 10,
  },
  title: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    paddingTop: 10,
    paddingHorizontal: 23,
    // color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  count: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  imageStyle: {
    // padding: 10,
    paddingHorizontal: 60,
  },
});

export default FoundItemReport;
