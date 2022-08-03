import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/auth-context";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";
import axios from "axios";
const SafeLifeReports = ({
  id,
  reporttype,
  details,
  name,
  location,
  image,
}) => {
  const cardImage = image[0];
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
      `http://192.168.100.10:5000/safelife-report/${id}`
    );
    if (response.status === 200) {
      alert("Deleted successfully!",response.status);
    }
  };

  const navigation = useNavigation();
  return (
    <View style={styles.list}>
      <Card key={id} style={styles.cardStyle}>
        <CardImage source={{ uri: cardImage }} title="safelife image" />
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
