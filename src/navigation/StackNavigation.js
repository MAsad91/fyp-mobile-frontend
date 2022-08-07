import React from "react";
import { View, StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CrimeReportForm from "../CrimeReports/CrimeReportForm";
import CrimeReportEditForm from "../CrimeReports/CrimeReportEditForm";

import SafeLifeReportForm from "../SafelifeReports/SafeLifeReportForm";
import SafeLifeEditForm from "../SafelifeReports/SafeLifeEditForm";

import LostItemForm from "../Lost&FoundItemReports/LostItemForm";
import LostItemEditForm from "../Lost&FoundItemReports/LostItemEditForm";

import FoundItemForm from "../Lost&FoundItemReports/FoundItemForm";
import FoundItemEditForm from "../Lost&FoundItemReports/FoundItemEditForm";

import CommunityServicesForm from "../CommunityServices/CommunityServicesForm";
import CommunityEditForm from "../CommunityServices/CommunityServiceEditForm";

import RequestForm from "../Certificate&Permit/RequestForm";
import RequestEditForm from "../Certificate&Permit/RequestEditForm";

import EditUserDetails from "../components/EditUserDetails";
import ChangeUserPassword from "../components/ChangeUserPassword";
import DeleteUserAccount from "../components/DeleteUserAccount";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CrimeReportForm" component={CrimeReportForm} />
      <Stack.Screen
        name="CrimeReportEditForm"
        component={CrimeReportEditForm}
      />
      <Stack.Screen name="SafelifeForm" component={SafeLifeReportForm} />
      <Stack.Screen name="SafelifeEditForm" component={SafeLifeEditForm} />
      <Stack.Screen name="LostItemForm" component={LostItemForm} />
      <Stack.Screen name="LostItemEditForm" component={LostItemEditForm} />
      <Stack.Screen name="FoundItemForm" component={FoundItemForm} />
      <Stack.Screen name="FoundItemEditForm" component={FoundItemEditForm} />
      <Stack.Screen
        name="CommunityServicesForm"
        component={CommunityServicesForm}
      />
      <Stack.Screen name="ServicesEditForm" component={CommunityEditForm} />
      <Stack.Screen name="Certificate&Permit" component={RequestForm} />
      <Stack.Screen name="Certificate&PermitEdit" component={RequestEditForm} />

      <Stack.Screen name="EditUserDetails" component={EditUserDetails} />
      <Stack.Screen name="ChangeUserPassword" component={ChangeUserPassword} />
      <Stack.Screen name="DeleteUserAccount" component={DeleteUserAccount} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default StackNavigation;
