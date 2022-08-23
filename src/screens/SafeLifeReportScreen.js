import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  Button
} from "react-native";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import { API_URL } from "../config";
import AddButton from "../components/AddButton";
import SafeLifeReports from "../SafelifeReports/SafeLifeReports";

const SafeLifeReportScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const [safeLifeReport, setSafeLifeReport] = useState([]);
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

  const fetchSafeLifeReport = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL.localhost}/safelife-report/${auth.userId}`
      );
      setSafeLifeReport(data);
      console.log("Data---: ", data);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchSafeLifeReport();
  }, [render]);
  return (
    <View style={styles.container}>
      <View style={styles.refreshbutton}>
        <Button
          title="Tap to Refresh ↻ "
          color="black"
          onPress={() => {
            fetchSafeLifeReport();
          }}
        />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {safeLifeReport.map((user) => {
          return (
            <SafeLifeReports
              key={user._id}
              id={user._id}
              reporttype={user.reporttype}
              details={user.details}
              name={user.name}
              location={user.location}
              image={user.images.map((img) => {
                console.log(`IMG:::::${img}`);
                return `${API_URL.localhost}/` + img;
              })}
              createdAt={user.createdAt}
              updatedAt={user.updatedAt}
            />
          );
        })}
      </ScrollView>
      <View style={styles.addbutton}>
        <AddButton
          onPress={() => {
            navigation.navigate("Main", {
              screen: "SafelifeForm",
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
  refreshbutton: {
    width: "100%",
    height: 40,
    backgroundColor: "white"
  },
});

export default SafeLifeReportScreen;
