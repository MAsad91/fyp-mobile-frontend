import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import AddButton from "../components/AddButton";
import CertificatePermitList from "../Certificate&Permit/CertificatePermitList";

const CertificatePermitScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const fetchRequestList = async () => {
      try {
        const { data } = await axios.get(
          `http://192.168.100.10:5000/request-certificatepermits/${auth.userId}`
        );
        setRequestList(data);
        console.log("Data---: ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchRequestList();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        {requestList.map((user)=> {
          <CertificatePermitList 
            id={user._id}
            certificatetype={user.certificatetype}
            details={user.detail}
            name={user.name}
          />
        })
        }
        
      </ScrollView>
      <View style={styles.addbutton}>
      <AddButton
        onPress={() => {
          navigation.navigate("Main", { screen: "Certificate&Permit", params:"post", });
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
    width:'100%',
    height:60,
    backgroundColor:'white'
  },
  scrollview: {
    // backgroundColor: 'green',
  },
  cards: {
    // backgroundColor:'red',
  }
});

export default CertificatePermitScreen;
