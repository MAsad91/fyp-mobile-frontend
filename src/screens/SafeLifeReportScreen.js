import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import AddButton from "../components/AddButton";
import SafeLifeReports from "../SafelifeReports/SafeLifeReports";

const SafeLifeReportScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const [safeLifeReport, setSafeLifeReport] = useState([]);

  useEffect(() => {
    const fetchSafeLifeReport = async () => {
      try {
        const { data } = await axios.get(
          `http://192.168.100.10:5000/safelife-report/${auth.userId}`
        );
        setSafeLifeReport(data);
        console.log("Data---: ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchSafeLifeReport();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView >
        {safeLifeReport.map((user) => {
          return(
            <SafeLifeReports 
              // key={user._id}
              id={user._id}
              reporttype={user.reporttype}
              details={user.details}
              name={user.name}
              location={user.location}
              image={user.images.map((img) => {
                return "http://192.168.100.10:5000/" + img;
              })}
        />
          );

        })}
      
      </ScrollView>
      <View style={styles.addbutton}>
      <AddButton
        onPress={() => {
          navigation.navigate("Main", { screen: "SafelifeForm",params:"post", });
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

export default SafeLifeReportScreen;
