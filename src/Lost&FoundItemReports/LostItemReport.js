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

const LostItemReport = ({
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
  console.log(creator);
  const auth = useContext(AuthContext);
  console.log(auth.userId);
  const navigation = useNavigation();

  const onDeleteUsers = async (id) => {
    const response = await axios.delete(
      `http://192.168.100.10:5000/lost-report/report/${id}`
    );
    if (response.status === 200) {
      alert(response.status);
    }
  };

  return (
    <View style={styles.list}>
      {(auth.userId === creator) && (
        <Card style={styles.cardStyle}>
          <CardImage src={{ uri: image }} title="Lost Item image" />
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
            <Button
              title="Pick Image on Roll Camera"
              color="black"
              onPress={() => {}}
            />
          </View>
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={(id) => {
                navigation.navigate("Main", {
                  screen: "LostItemEditForm",
                  params: id,
                });
              }}
              title="Edit"
              color="black"
            />
            <CardButton
              onPress={(id) => {
                onDeleteUsers(id);
              }}
              title="Delete"
              color="red"
            />
          </CardAction>
        </Card>
      )}
      {!(auth.userId === creator) && (
        <Card style={styles.cardStyle}>
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
            <Button
              title="Pick Image on Roll Camera"
              color="black"
              onPress={() => {}}
            />
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
    padding: 10,
    paddingHorizontal: 40,
  },
});

export default LostItemReport;
