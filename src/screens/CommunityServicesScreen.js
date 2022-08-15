import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import { API_URL } from "../config";
import AddButton from "../components/AddButton";
import ServicesList from "../CommunityServices/ServicesList";

const CommunityServicesScreen = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const [servicesList, setServicesList] = useState([]);
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
    const fetchServicesReport = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL.localhost}/request-communityservices/${auth.userId}`
        );
        setServicesList(data);
        console.log("Data---: ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchServicesReport();
  }, [render]);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {servicesList.map((user) => {
          return (
            <ServicesList
              key={user._id}
              id={user._id}
              name={user.name}
              servicetype={user.servicetype}
              details={user.details}
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
              screen: "CommunityServicesForm",
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
  scrollview: {
    // backgroundColor: 'green',
  },
  cards: {
    // backgroundColor:'red',
  },
});

export default CommunityServicesScreen;
