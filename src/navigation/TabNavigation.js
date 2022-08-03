import React from "react";
import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import EventsScreen from "../screens/EventsScreen";

const HomeStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const EventStack = createNativeStackNavigator();

const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      screenOptions={{ headerShown: false }}
      barStyle={{ backgroundColor: "grey" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TabNavigation;

const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
};

const MapStackScreen = ({ navigation }) => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen options={{headerShown: false}} name="Map" component={MapScreen} />
    </MapStack.Navigator>
  );
};

const EventStackScreen = ({ navigation }) => {
  return (
    <EventStack.Navigator>
      <EventStack.Screen options={{headerShown: false}} name="Events" component={EventsScreen} />
    </EventStack.Navigator>
  );
};
