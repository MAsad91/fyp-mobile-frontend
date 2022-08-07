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
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import { API_URL } from "../config";

import ImageUploader from "../components/userImageUploader";

const LostItemReport = ({
  key,
  creator,
  id,
  lostitemtype,
  details,
  description,
  color,
  name,
  state,
  itemname,
  location,
  image,
}) => {
  //

  const [userImage, setUserImage] = useState(null);

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
        url: `${API_URL.localhost}/lost-report/lostitemimage`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      let result = response.data.result;
      alert("Image Comparison Result", result);
      if (response.status === 201) {
        alert("Lost Item Image Uploaded Successfully!");
        setUserImage(null);
      }
    } catch (err) {
      alert("Uploading Lost Item Image is Failed" || error.response.data.message);
    }
  };


  const cardImage = image[0];
  const auth = useContext(AuthContext);
  // console.log(auth.userId);
  // console.log(id);
  const navigation = useNavigation();

  const onDeleteUsers = async (id) => {
    const response = await axios.delete(
      `${API_URL.localhost}/lost-report/${id}`
    );
    if (response.status === 200) {
      alert("Deleted successfully!" || response.status);
    }
  };

  return (
    <View style={styles.list}>
      {auth.userId === creator && (
        <Card key={key} style={styles.cardStyle}>
          <CardImage source={{ uri: cardImage }} title="Lost Item image" />
          <CardTitle
            title={lostitemtype}
            subtitle={`Details: ${details}\n\nDescription: ${description}`}
          />
          <CardAction separator={true} />
          <CardContent text={`\nItem Name: ${itemname}`} />

          <CardContent text={`Color: ${color}`} />

          <CardContent text={`State: ${state}`} />

          <CardContent text={`Location: ${location}`} />

          <CardContent text={`Report Name: ${name}`} />

          <CardAction separator={true} />

          <Text style={styles.text}>Upload Lost Item Image You found</Text>
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
                  screen: "LostItemEditForm",
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
          <CardImage src={{ uri: image }} title="crime image" />
          <CardTitle
            title={lostitemtype}
            subtitle={`Details: ${details}\n\nDescription: ${description}`}
          />
          <CardAction separator={true} />
          <CardContent text={`\nItem Name: ${itemname}`} />

          <CardContent text={`Color: ${color}`} />

          <CardContent text={`State: ${state}`} />

          <CardContent text={`Location: ${location}`} />

          <CardContent text={`Report Name: ${name}`} />

          <CardAction separator={true} />
          {/* <CardAction separator={true} inColumn={false}>
            <CardButton onPress={() => {}} title="Edit" color="black" />
            <CardButton onPress={() => {}} title="Delete" color="red" />
          </CardAction> */}
          <Text style={styles.text}>Upload Lost Item Image You found</Text>
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
    paddingHorizontal: 29,
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
    // height:100,
    // margin:20,
    // padding: 20,
    paddingHorizontal: 60,
  },
});

export default LostItemReport;
