import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CertificatePermitList = ({ id, name, certificatetype, details }) => {
  const navigation = useNavigation();

  const onDeleteUsers = async (id) => {
    const response = await axios.delete(
      `http://192.168.100.10:5000/request-certificatepermits/report/${id}`
    );
    if (response.status === 200) {
      alert(response.status);
    }
  };

  return (
    <View style={styles.list}>
      <Card style={styles.cardStyle}>
        <CardTitle title={certificatetype} subtitle={`\nDetails: ${details}`} />
        <CardContent />
        <CardAction separator={true} />
        <CardContent text={`\nReporter Name: ${name}`} />

        <CardAction separator={true} inColumn={false}>
          <CardButton
            onPress={(id) => {
              navigation.navigate("Main", {
                screen: "Certificate&PermitEdit",
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

export default CertificatePermitList;
