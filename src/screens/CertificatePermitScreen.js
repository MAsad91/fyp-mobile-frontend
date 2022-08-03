import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import { API_URL } from "../config";
import AddButton from "../components/AddButton";
import CertificatePermitList from "../Certificate&Permit/CertificatePermitList";

const CertificatePermitScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const [requestList, setRequestList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [render, setRender] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRender(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const fetchRequestList = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL.localhost}/request-certificatepermits/${auth.userId}`
        );
        setRequestList(data);
        console.log("Data---: ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchRequestList();
  }, [render]);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {requestList.map((user) => {
          return (
            <CertificatePermitList
              id={user._id}
              certificatetype={user.requesttype}
              details={user.details}
              name={user.name}
            />
          );
        })}
      </ScrollView>
      <View style={styles.addbutton}>
        <AddButton
          onPress={() => {
            navigation.navigate("Main", {
              screen: "Certificate&Permit",
              params: "post",
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addbutton: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
  },
  scrollview: {
    // backgroundColor: 'green',
  },
  cards: {
    // backgroundColor:'red',
  },
});

export default CertificatePermitScreen;
