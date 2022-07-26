import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  Button
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../config";
import AddButton from "../components/AddButton";
import FoundItemReport from "../Lost&FoundItemReports/FoundItemReport";

const FoundItemsScreen = () => {
  const navigation = useNavigation();
  const [foundItemReport, setFoundItemReport] = useState([]);
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

  const fetchfoundData = async () => {
    try {
      const { data } = await axios.get(`${API_URL.localhost}/found-report/`);
      setFoundItemReport(data);
      console.log("Data--- ", data);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchfoundData();
  }, [render]);
  return (
    <View style={styles.container}>
      <View style={styles.refreshbutton}>
      <Button      
              title="Tap to Refresh ↻ "
              color="black"
              onPress={() => {
                fetchfoundData();
              }}
      />
      </View>
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {foundItemReport.map((user) => {
          return (
            <FoundItemReport
              key={user._id}
              creator={user.creator}
              id={user._id}
              founditemtype={user.founditemtype}
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
            navigation.navigate("Main", {
              screen: "FoundItemForm",
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

export default FoundItemsScreen;
