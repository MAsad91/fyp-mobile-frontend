import React from "react";
import { View, StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CrimeReportForm from "../CrimeReports/CrimeReportForm";
import SafeLifeReportForm from "../SafelifeReports/SafeLifeReportForm";
import LostItemForm from "../Lost&FoundItemReports/LostItemForm";
import FoundItemForm from "../Lost&FoundItemReports/FoundItemForm";
import CommunityServicesForm from "../CommunityServices/CommunityServicesForm";
import RequestForm from "../Certificate&Permit/RequestForm";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="CrimeReportForm" component={CrimeReportForm} />
      <Stack.Screen name="SafelifeForm" component={SafeLifeReportForm} />
      <Stack.Screen name="LostItemForm" component={LostItemForm} />
      <Stack.Screen name="FoundItemForm" component={FoundItemForm} />
      <Stack.Screen
        name="CommunityServicesForm"
        component={CommunityServicesForm}
      />
      <Stack.Screen name="Certificate&Permit" component={RequestForm} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default StackNavigation;
