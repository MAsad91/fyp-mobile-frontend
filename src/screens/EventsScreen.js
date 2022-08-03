import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text,ScrollView } from "react-native";
import EventsDetail from "../components/EventsDetail";
import axios from "axios";
import {API_URL} from "../config";
const EventsScreen = () => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
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
    fetchEventsList();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
      {eventsList.map((user)=>{
        return(
          <EventsDetail 
            id={user._id}
            details={user.details}
            eventtype={user.eventtype}
            location={user.location}
            name={user.name}
            image={user.images.map((img)=>{
              return "http://192.168.100.10:5000/" + img;

            })}
          />
        )
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
});

export default EventsScreen;
