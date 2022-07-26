import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  Button,
} from "react-native";
import EventsDetail from "../components/EventsDetail";
import axios from "axios";
import { API_URL } from "../config";
const EventsScreen = () => {
  const [eventsList, setEventsList] = useState([]);
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

  const fetchEventsList = async () => {
    try {
      const { data } = await axios.get(`${API_URL.localhost}/events`);
      setEventsList(data);
      console.log("Data---: ", data);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchEventsList();
  }, [render]);
  return (
    <View style={styles.container}>
      <View style={styles.refreshbutton}>
      <Button      
              title="Tap to Refresh ↻ "
              color="black"
              onPress={() => {
                fetchEventsList();
              }}
      />
      </View>
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {eventsList.map((user) => {
          return (
            <EventsDetail
              key={user._id}
              id={user._id}
              details={user.details}
              eventtype={user.eventtype}
              location={user.location}
              name={user.name}
              image={user.images.map((img) => {
                return `${API_URL.localhost}/` + img;
              })}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"white"
  },
  refreshbutton: {
    width: "100%",
    height: 40,
    backgroundColor: "white"
  },
});

export default EventsScreen;
