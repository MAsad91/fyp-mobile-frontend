import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/auth-context";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
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
const SafeLifeReports = ({
  key,
  id,
  reporttype,
  details,
  name,
  location,
  image,
}) => {
const [state, setState] = useState(0);
const navigation = useNavigation();
  // const { width } = Dimensions.get("window");
// const height = width *0.6;

const images = [
  "https://images.pexels.com/photos/9320207/pexels-photo-9320207.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/13009540/pexels-photo-13009540.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/11869265/pexels-photo-11869265.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
];

  // const cardImage = image[0];

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

  const auth = useContext(AuthContext);
  const onDeleteUsers = async (id) => {
    // const creator = auth.userId;
    // const response = await axios({
    //   method: "delete",
    //   url: `http://192.168.100.10:5000/safelife-report/${id}`,
    //   data: { creator },
    //   headers: { Authorization: "Bearer " + auth.token },
    // });
    const response = await axios.delete(
      `${API_URL.localhost}/safelife-report/${id}`
    );
    if (response.status === 200) {
      alert("Deleted successfully!",response.status);
    }
  };

  
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
      <Card key={key} style={styles.cardStyle}>
      <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          pagingEnabled={true}
          style={styles.scrollView}
        >
          {images.map((img, index) => (
            <CardImage
              key={index}
              source={{ uri: img }}
              style={styles.cardImage}
            />
          ))}
          
        </ScrollView>
        <View style={styles.pagination}>
            {
              images.map((i,k) => (
                <Text key={k} style={k===state ? styles.pagingActivetext : styles.pagingtext}>⬤</Text>
              ))
            }
          </View>
        {/* <CardImage source={{ uri: cardImage }} title="safelife image" /> */}
        <CardTitle title={reporttype} subtitle={`Details: ${details}`} />
        <CardContent />
        <CardContent text={`Reporter Name: ${name}`} />
        <CardContent text={`Location: ${location}`} />

        <CardAction separator={true} inColumn={false}>
          <CardButton
            style={styles.editbutton}
            onPress={() => {
              navigation.navigate("Main", {
                screen: "SafelifeEditForm",
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
    // marginVertical: 12,
    marginLeft: 15,
    marginTop: 20,
  },
  cardImage: {
    width: 310,
    height: 230,
    resizeMode: "cover",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  pagingtext: { 
    fontSize: 25,
    color: "#888", 
    marginLeft: 10 
  },
  pagingActivetext: { 
    fontSize: 25,
    color: "#fff", 
    marginLeft: 10 
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 260,
    alignSelf: "center",
  },
});

export default SafeLifeReports;
