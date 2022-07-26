import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, RefreshControl, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {API_URL} from "../config";
import AddButton from "../components/AddButton";
import LostItemReport from "../Lost&FoundItemReports/LostItemReport";

const LostItemsScreen = () => {
  const navigation = useNavigation();
  const [lostItemReport, setLostItemReport] = useState([]);
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

  const fetchlostData = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL.localhost}/lost-report/`
      );
      setLostItemReport(data);
      console.log("Data--- ", data);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchlostData();
  }, [render]);
  console.log(lostItemReport)
  return (
    <View style={styles.container}>
      <View style={styles.refreshbutton}>
      <Button      
              title="Tap to Refresh ↻ "
              color="black"
              onPress={() => {
                fetchlostData();
              }}
      />
      </View>
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {lostItemReport.map((user) => {
          return (
            <LostItemReport
              key={user.id}
              creator={user.creator}
              id={user._id}
              lostitemtype={user.lostitemtype}
              details={user.details}
              description={user.description}
              color={user.color}
              name={user.name}
              state={user.state}
              itemname={user.itemname}
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
            navigation.navigate("Main", { screen: "LostItemForm" });
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

export default LostItemsScreen;
