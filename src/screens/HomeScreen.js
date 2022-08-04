import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { AuthContext } from "../context/auth-context";
import StatsList from "../components/StatsList";
import Chart from "../components/Chart";
import axios from "axios";
import {API_URL} from "../config";

const HomeScreen = () => {
  const auth = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [render, setRender] = useState(false);
  const [crimeCount, setCrimeCount] = useState();
  const [safelifeCount, setSafeLifeCount] = useState();
  const [lostItemCount, setLostItemCount] = useState();
  const [foundItemCount, setFoundItemCount] = useState();


  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRender(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  useEffect(() => {
    const fetchReportCount = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL.localhost}/home/${auth.userId}`
        );
        setCrimeCount(data.crimeReportCount);
        setSafeLifeCount(data.safelifeReportCount);
        setLostItemCount(data.lostItemsReportCount);
        setFoundItemCount(data.foundItemsReportCount);
      } catch (err) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchReportCount();
  }, [render]);
  return (
    <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
      <View style={styles.container}>
        <StatsList style={styles.crime}
        key={1}
          title="Crime Reports"
          description="Number of Crime Reports"
          count={crimeCount}
        />
        <StatsList
          key={2}
          title="SafeLife Reports"
          description="Number of Safelife Reports"
          count={safelifeCount}
        />
        <StatsList
        key={3}
          title="Lost Reports"
          description="Number of Lost Reports"
          count={lostItemCount}
        />
        <StatsList
        key={4}
          title="Found Reports"
          description="Number of Found Reports"
          count={foundItemCount}
        />
        <View>
          <Chart 
          crimeCount = {crimeCount}
          safelifeCount = {safelifeCount}
          lostItemCount = {lostItemCount}
          foundItemCount = {foundItemCount}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  crime: {
    borderBottomColor:'black'
  }
});

export default HomeScreen;
