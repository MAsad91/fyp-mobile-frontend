import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl
} from "react-native";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import AddButton from "../components/AddButton";
import CrimeReportList from "../CrimeReports/CrimeReportList";
import { API_URL } from "../config";

const CrimeReportsScreen = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [crimeReport, setCrimeReport] = useState([]);
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
    const fetchCrimeReports = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL.localhost}/crime-report/${auth.userId}`
        );
        setCrimeReport(data);
        console.log("Data---: ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchCrimeReports();
  }, [render]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {crimeReport.map((user) => {
          console.log("user", user);
          return (
            <CrimeReportList
              key={user._id}
              id={user._id}
              crimetype={user.crimetype}
              details={user.details}
              name={user.name}
              location={user.location}
              image={user.images.map((img) => {
                console.log(`IMG:::::${img}`);
                // return `${API_URL.localhost}/` + img;
                return `https://safecityservices.herokuapp.com/` + img;
              })}
            />
          );
        })}
      </ScrollView>
      <View style={styles.addbutton}>
        <AddButton
          onPress={() => {
            navigation.navigate("Main", {
              screen: "CrimeReportForm",
              params: "post"
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor:"white"
  },
  addbutton: {
    width: "100%",
    height: 60,
    backgroundColor: "white"
  },
  scrollview: {
    // backgroundColor: 'green',
  },
  cards: {
    // backgroundColor:'red',
  }
});

export default CrimeReportsScreen;
