import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AddButton from "../components/AddButton";
import FoundItemReport from "../Lost&FoundItemReports/FoundItemReport";

const FoundItemsScreen = () => {
  const navigation = useNavigation();
  const [foundItemReport, setFoundItemReport] = useState([]);

  useEffect(() => {
    const fetchfoundData = async () => {
      try {
        const { data } = await axios.get(
          `http://192.168.100.10:5000/found-report/`
        );
        setFoundItemReport(data);
        console.log("Data--- ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchfoundData();
  }, []);
  return (
    <View style={styles.container}>
        
      <ScrollView style={styles.scrollview}>
        
        {foundItemReport.map((user) => {
          return(
            <FoundItemReport 
              creator={user.creator}
              id={user._id}
              founditemtype = {user.founditemtype}
              details = {user.details}
              description={user.description}
              color={user.color}
              name = {user.name}
              state= {user.state}
              itemname={user.itemname}
              location = {user.location}
              image = {user.images.map((img) => {
                return "http://192.168.100.10:5000/" + img;
              })}
          />
          );
        })}
        
    </ScrollView>
    <View style={styles.addbutton}>
      <AddButton
            onPress={() => {
              navigation.navigate("Main", { screen: "FoundItemForm", params:"post", });
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
});

export default FoundItemsScreen;
