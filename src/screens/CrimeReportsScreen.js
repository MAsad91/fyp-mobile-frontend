import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState }  from "react";
import { View, StyleSheet,Text, ScrollView } from "react-native";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import AddButton from "../components/AddButton";
import CrimeReportList from "../CrimeReports/CrimeReportList";

const CrimeReportsScreen = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [crimeReport, setCrimeReport] = useState([]);

  useEffect(() => {
    const fetchCrimeReports = async () => {
      try {
        const { data } = await axios.get(
          `http://192.168.100.10:5000/crime-report/${auth.userId}`
        );
        setCrimeReport(data);
        console.log("Data---: ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchCrimeReports();
  }, []);

  
  return (
    <View style={styles.container}>
        
      <ScrollView style={styles.scrollview}>
        
        {crimeReport.map((user) => {
          return(
            <CrimeReportList 
              key={user._id}
              crimetype = {user.crimetype}
              details = {user.details}
              name = {user.name}
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
              navigation.navigate("Root", { screen: "CrimeReportForm" });
            }}
          />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"white"
    
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

export default CrimeReportsScreen;
