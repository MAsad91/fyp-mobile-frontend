import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../context/auth-context";
import StatsList from "../components/StatsList";
import Chart from "../components/Chart";
import axios from "axios";

const HomeScreen = () => {
  const auth = useContext(AuthContext);
  const [crimeCount, setCrimeCount] = useState();
  const [safelifeCount, setSafeLifeCount] = useState();
  const [lostItemCount, setLostItemCount] = useState();
  const [foundItemCount, setFoundItemCount] = useState();
  useEffect(() => {
    const fetchReportCount = async () => {
      try {
        const { data } = await axios.get(
          `http://192.168.100.10:5000/home/${auth.userId}`
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
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatsList style={styles.crime}
          title="Crime Reports"
          description="Number of Crime Reports"
          count={crimeCount}
        />
        <StatsList
          title="SafeLife Reports"
          description="Number of Safelife Reports"
          count={safelifeCount}
        />
        <StatsList
          title="Lost Reports"
          description="Number of Lost Reports"
          count={lostItemCount}
        />
        <StatsList
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
    borderBottomColor:'green'
  }
});

export default HomeScreen;
