import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AddButton from "../components/AddButton";
import LostItemReport from "../Lost&FoundItemReports/LostItemReport";

const LostItemsScreen = () => {
  const navigation = useNavigation();
  const [lostItemReport, setLostItemReport] = useState([]);

  useEffect(() => {
    const fetchlostData = async () => {
      try {
        const { data } = await axios.get(
          `http://192.168.100.10:5000/lost-report/`
        );
        setLostItemReport(data);
        console.log("Data--- ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchlostData();
  }, []);
  return (
    <View style={styles.container}>
        
      <ScrollView style={styles.scrollview}>
        
        {lostItemReport.map((user) => {
          return(
            <LostItemReport 
              key={user._id}
              lostitemtype = {user.lostitemtype}
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
              navigation.navigate("Root", { screen: "LostItemForm" });
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

export default LostItemsScreen;
