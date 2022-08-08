import React, { useState, useComponentSize } from "react";

import { useNavigation /*useParams*/ } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  Modal,
  Image,
  Animated, 
  scrollX
} from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";
import axios from "axios";
import { API_URL } from "../config";

// const { width } = Dimensions.get("window");
// const height = width *0.6;

const images = [
  "https://images.pexels.com/photos/9320207/pexels-photo-9320207.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/11869265/pexels-photo-11869265.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
];
const CrimeReportList = ({
  key,
  id,
  crimetype,
  details,
  name,
  location,
  image,
}) => {
  let test;
  const [state, setState] = useState(0);
  console.log(crimetype);
  console.log(details);
  console.log(id);
  console.log("imagecard", image);
  const cardImage = image[0];
  console.log("carImage====>", cardImage);
  console.log(cardImage);

  const navigation = useNavigation();

  const onDeleteUsers = async (id) => {
    console.log("id", id);

    const response = await axios.delete(
      `${API_URL.localhost}/crime-report/${id}`
    );
    if (response.status === 200) {
      console.log("userDeleted======>");
      alert("Deleted successfully", response.status);
    }
  };
  
  // const changeText = (event) => {
  //   console.log(event.nativeEvent.contentOffSet.x);
    
  //   const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width); 
  //   // // const slide = Math.ceil(nativeEvent.contentOff.x / nativeEvent.layoutMeasurement.width);
  //   console.log(slide);
  //   if(slide !== state){
  //     setState(slide);
  //   }
  // } 
  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    console.log(slide);
    if(slide!==state){
      setState(slide);
    }
    // console.log("test",test);
  };

  return (
    <View style={styles.list}>
      <Card style={styles.cardStyle}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: 
          //   scrollX } } }], {listener: (event) => handleScroll(event)})}
            // scrollEventThrottle={16}
          // onScroll={changeText}
          pagingEnabled={true}
          style={styles.scrollView}
        >
          {images.map((img, index) => (
            <CardImage
              test = {index}
              key={index}
              source={{ uri: img }}
              style={styles.cardImage}
            />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
            {images.map((i,k) => (
                <Text key={k} style={k===state ? styles.pagingActivetext : styles.pagingtext}>⬤</Text>
              ))
            }
          </View>
        {/* <CardImage source={{ uri: cardImage }} title="crime image" /> */}
        <CardTitle title={crimetype} subtitle={`Details: ${details}`} />
        <CardContent />
        <CardContent text={`Reporter Name: ${name}`} />
        <CardContent text={`Location: ${location}`} />

        <CardAction separator={true} inColumn={false}>
          <CardButton
            onPress={() => {
              navigation.navigate("Main", {
                screen: "CrimeReportEditForm",
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
  cardImage: {
    width: 310,
    height: 250,
    resizeMode: "cover",
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
    bottom: 250,
    alignSelf: "center",
  },
});

export default CrimeReportList;
