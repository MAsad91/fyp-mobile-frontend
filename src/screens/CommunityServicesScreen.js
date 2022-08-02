import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import AddButton from "../components/AddButton";
import ServicesList from "../CommunityServices/ServicesList";

const CommunityServicesScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    const fetchServicesReport = async () => {
      try {
        const { data } = await axios.get(
          `http://192.168.100.10:5000/request-communityservices/${auth.userId}`
        );
        setServicesList(data);
        console.log("Data---: ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchServicesReport();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        {servicesList.map((user) => {
          return(
            <ServicesList 
              id = {user._id}
              name={user.name}
              servicetype={user.servicetype}
              details={user.details}

            />
          )
        })
        }
      </ScrollView>
      
      
      <View style={styles.addbutton}>
        <AddButton
          onPress={() => {
            navigation.navigate("Main", { screen: "CommunityServicesForm", params:"post", });
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

export default CommunityServicesScreen;
