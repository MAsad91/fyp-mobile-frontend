import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Alert } from "react-native";
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
const ServicesList = ({key, id, name, servicetype, details, createdAt, updatedAt }) => {
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
      `${API_URL.localhost}/request-communityservices/report/${id}`
    );
    if (response.status === 200) {
      alert("Deleted successfully!",response.status);
    }
  };

  return (
    <View style={styles.list}>
      <Card key={key} style={styles.cardStyle}>
        <CardTitle title={servicetype} subtitle={`\nDetails: ${details}`} />

        <CardContent />

        <CardAction separator={true} />

        <CardContent text={`\nReporter Name: ${name}`} />

        <CardContent text={`Created At: ${createdAt}`} />
          
        <CardContent text={`Updated At: ${updatedAt}`} />

        <CardAction separator={true} inColumn={false}>
          <CardButton
            onPress={() => {
              navigation.navigate("Main", {
                screen: "ServicesEditForm",
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
});

export default ServicesList;
