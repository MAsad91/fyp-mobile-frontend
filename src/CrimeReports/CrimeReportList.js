import React from "react";

import { useNavigation /*useParams*/ } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  Modal,
  Image
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
const CrimeReportList = ({ key, id, crimetype, details, name, location, image }) => {
 
  console.log(crimetype);
  console.log(details);
  console.log(id);
  console.log("imagecard",image);
  const cardImage = image[0];
  console.log("carImage====>", cardImage)
  console.log(cardImage);

  const navigation = useNavigation();



  const onDeleteUsers = async (id) => {
    console.log("id",id);
    
    const response = await axios.delete(
      `http://192.168.100.10:5000/crime-report/${id}`
    );
    if (response.status === 200) {
      console.log("userDeleted======>")
      alert("Deleted successfully",response.status);
    }
  };

  return (

    <View style={styles.list}>
      <Card  key={key} style={styles.cardStyle}>
        <CardImage source={{ uri: cardImage }} title="crime image" />
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

// const w=Dimensions.get('window').width ;
// // const h=(Dimensions.get('window').height)-(StatusBar.currentHeight) ;
// const h = Dimensions.get("screen").height-(StatusBar.currentHeight);
// console.log("height",h);
// console.log('ch', StatusBar.currentHeight);

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
    // color: "white",
    fontSize: 15,
  },
  count: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  // cardStyle:{
  //   flex:1,
  // }
});

export default CrimeReportList;
