import React, { useState, useComponentSize, useRoute } from "react";

import { useNavigation /*useParams*/,  } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";
import CrimeReportsScreen from '../screens/CrimeReportsScreen';
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
  // key,
  id,
  crimetype,
  details,
  name,
  location,
  image,
  createdAt,
  updatedAt,
}) => {
  // const route = useRoute();
  // console.log(route.fetchCrimeReports);
  const [state, setState] = useState(0);
  console.log(crimetype);
  console.log(details);
  console.log(id);
  console.log("imagecard", image);
  const cardImage = image[0];
  console.log("carImage====>", cardImage);
  console.log(cardImage);

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
    console.log("id", id);

    const response = await axios.delete(
      `${API_URL.localhost}/crime-report/${id}`
    );
    if (response.status === 200) {
      console.log("userDeleted======>");
      alert("Deleted successfully", response.status);
      // CrimeReportsScreen.fetchCrimeReports.bind();
      // navigation.navigate("Main",{
      //   screen: "Crime Reports"
      // });
    }
  };
   
  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    console.log(slide);
    if(slide!==state){
      setState(slide);
    }
  };

  return (
    <View style={styles.list}>
      <Card style={styles.cardStyle}>
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
                <Text key={k} style={k===state ? styles.pagingActivetext : styles.pagingtext}>⬤</Text>
              ))
            }
          </View>
        {/* <CardImage source={{ uri: cardImage }} title="crime image" /> */}
        <CardTitle title={crimetype} subtitle={`Details: ${details}`} />

        <CardContent />

        <CardContent text={`Reporter Name: ${name}`} />

        <CardContent text={`Location: ${location}`} />

        <CardContent text={`Created At: ${createdAt}`} />
          
        <CardContent text={`Updated At: ${updatedAt}`} />

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
              ReturnModal();
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
});

export default CrimeReportList;
