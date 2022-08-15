import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Button, ScrollView,Alert } from "react-native";
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
  createdAt,
  updatedAt,
}) => {
  const [userImage, setUserImage] = useState(null);
  const [stateAction, setStateAction] = useState(0);

// const { width } = Dimensions.get("window");
// const height = width *0.6;

const images = [
  "https://images.pexels.com/photos/9320207/pexels-photo-9320207.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/11869265/pexels-photo-11869265.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
];

  const pickImage = (img) => {
    setUserImage(img);
    // handleSubmit();
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
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setUserImage(null);
      let result = response.data.result;
     
      if (response.status === 201) {
        alert("found Item Image Uploaded Successfully!");
        alert(result);
      }
    } catch (err) {
      alert("Uploading found Item Image is Failed" || error.response.data.message);
    }
  };

  console.log(id);
  const cardImage = image[0];
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  const ReturnModal = () => {
    Alert.alert(
      "Delete",
      "Do you want to delete?",
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
            onDeleteUsers(id);
            // navigation.navigate("Crime");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const onDeleteUsers = async (id) => {
    
    const response = await axios.delete(
      `${API_URL.localhost}/found-report/${id}`
    );
    if (response.status === 200) {
      alert("Deleted successfully!",response.status);
    }
  };

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    console.log(slide);
    if(slide!==stateAction){
      setStateAction(slide);
    }
    // console.log("test",test);
  };

  return (
    <View style={styles.list}>
      {auth.userId === creator && (
        <Card key={key} style={styles.cardStyle}>
         <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          pagingEnabled={true}
          style={styles.scrollView}
        >
          {image.map((img, index) => (
            <CardImage
              key={index}
              source={{ uri: img }}
              style={styles.cardImage}
            />
          ))}
          
        </ScrollView>
        <View style={styles.pagination}>
            {image.map((i,k) => (
                <Text key={k} style={k===stateAction ? styles.pagingActivetext : styles.pagingtext}>⬤</Text>
              ))
            }
          </View>
          {/* <CardImage source={{ uri: cardImage }} title="found Item image" /> */}
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

          <CardContent text={`Created At: ${createdAt}`} />
          
          <CardContent text={`Updated At: ${updatedAt}`} />

          <CardAction separator={true} />

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
                ReturnModal();
              }}
              title="Delete"
              color="red"
            />
          </CardAction>
        </Card>
      )}
      {!(auth.userId === creator) && (
        <Card key={key} style={styles.cardStyle}>
          <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          pagingEnabled={true}
          style={styles.scrollView}
        >
          {image.map((img, index) => (
            <CardImage
              key={index}
              source={{ uri: img }}
              style={styles.cardImage}
            />
          ))}
          
        </ScrollView>
        <View style={styles.pagination}>
            {image.map((i,k) => (
                <Text key={k} style={k===stateAction ? styles.pagingActivetext : styles.pagingtext}>⬤</Text>
              ))
            }
          </View>
          {/* <CardImage src={{ uri: image }} title="found Item image" /> */}
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

          <CardContent text={`Created At: ${createdAt}`} />
          
          <CardContent text={`Updated At: ${updatedAt}`} />

          <CardAction separator={true} inColumn={false}>
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
          <CardAction separator={true} />
          <View style={styles.submitbutton}>
            <Button
              title="submit"
              color={"black"}
              onPress={() => {
                handleSubmit();
              }}
            ></Button>
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

  text: {
    paddingTop: 10,
    paddingHorizontal: 23,
    fontSize: 16,
    marginBottom: 10,
  },
  cardImage: {
    width: 310,
    height: 230,
    resizeMode: "contain",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  pagingtext: { 
    fontSize:25,
    color: "#888", 
    marginLeft: 10 
  },
  pagingActivetext: { 
    fontSize:25,
    color: "#fff", 
    marginLeft: 10 
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    top:190,
    alignSelf: "center",
  },
  imageStyle: {
    paddingHorizontal: 60,
  },
  submitbutton: {
    margin: 10,
    paddingHorizontal: 100,
  },
});

export default FoundItemReport;
