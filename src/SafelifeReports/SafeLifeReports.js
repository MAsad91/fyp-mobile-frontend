import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";

const SafeLifeReports = ({
  reporttype,
  details,
  image,
  id,
  name,
  location,
}) => {
  const onDeleteUsers = async (id) => {
    const response = await axios.delete(
      `http://192.168.100.10:5000/safelife-report/${id}`
    );
    if (response.status === 200) {
      alert(response.status);
    }
  };

  const navigation = useNavigation();
  return (
    <View style={styles.list}>
      <Card style={styles.cardStyle}>
        <CardImage src={{ uri: image }} title="safelife image" />
        <CardTitle title={reporttype} subtitle={`Details: ${details}`} />
        <CardContent />
        <CardContent text={`Reporter Name: ${name}`} />
        <CardContent text={`Location: ${location}`} />

        <CardAction separator={true} inColumn={false}>
          <CardButton
            style={styles.editbutton}
            onPress={(id) => {
              navigation.navigate("Main", {
                screen: "SafelifeForm",
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
  editbutton: {
    borderColor: "red",
  },
});

export default SafeLifeReports;
