import React from "react";
import { StyleSheet } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import CrimeReportsScreen from "../screens/CrimeReportsScreen";
import SafeLifeReportScreen from "../screens/SafeLifeReportScreen";
import LostItemsScreen from "../screens/LostItemsScreen";
import FoundItemsScreen from "../screens/FoundItemsScreen";
import CommunityServicesScreen from "../screens/CommunityServicesScreen";
import CertificatePermitScreen from "../screens/CertificatePermitScreen";
import EventsScreen from "../screens/EventsScreen";
import MapScreen from "../screens/MapScreen";
import SettingScreen from "../screens/SettingScreen";
import LogoutScreen from "../screens/LogoutScreen";

import TabNavigation from "./TabNavigation";
import StackNavigation from "./StackNavigation";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
      

    >
      
      <Drawer.Screen
        name="Main"
        component={StackNavigation}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen name="Home" component={TabNavigation} />
      <Drawer.Screen name="Crime Reports" component={CrimeReportsScreen} />
      <Drawer.Screen name="SafeLife Reports" component={SafeLifeReportScreen} />
      <Drawer.Screen name="LostItems Reports" component={LostItemsScreen} />
      <Drawer.Screen name="FoundItems Reports" component={FoundItemsScreen} />
      <Drawer.Screen
        name="Community Services"
        component={CommunityServicesScreen}
      />
      <Drawer.Screen
        name="Certificate & Permit"
        component={CertificatePermitScreen}
      />
      <Drawer.Screen name="Events" component={EventsScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

export default DrawerNavigator;
