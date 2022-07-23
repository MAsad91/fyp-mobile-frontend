import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";

const EventsDetail = () => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        const { data } = await axios.get(`http://192.168.10.9:5000/events`);
        setEventsList(data);
        console.log("Data---: ", data);
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    };
    fetchEventsList();
  }, []);

  return (
    <View>
      <Text>Upcoming Events</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EventsDetail;
