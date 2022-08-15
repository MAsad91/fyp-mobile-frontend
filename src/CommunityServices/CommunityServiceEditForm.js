import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../context/auth-context";
import Button from "../components/Button";

import Input from "../components/Input";
import Label from "../components/Label";
import axios from "axios";
import { API_URL } from "../config";

const CommunityServicesForm = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [communityReport, setCommunityReport] = useState({});

  const route = useRoute();
  const dataRequest = route.params;
  let arrayData = [];
  for (const value in dataRequest) {
    arrayData.push(dataRequest[value]);
    // console.log(`key=${value}: ${dataRequest[value]}`);
  }
  console.log("arrayData: ", arrayData.join(""));
  const requestId = arrayData.join("");
  // console.log(dataRequest);
  console.log("id", requestId);

  useEffect(() => {
    const LoadReportData = async () => {
      const result = await axios.get(
        `${API_URL.localhost}/request-communityservices/report/${requestId}`
      );
      setCommunityReport(result.data.report);
      // console.log(result.data.report);
    };
    LoadReportData();
  }, []);
  console.log(communityReport.name);

  const [request, setRequest] = useState(communityReport.servicetype);
  // const [requestError, setRequestError] = useState(false);
  // const [requestErrorMsg, setRequestErrorMsg] = useState("");
  const [name, setName] = useState(communityReport.name);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [details, setDetails] = useState(communityReport.details);
  const [detailsError, setDetailsError] = useState(false);
  const [detailsErrorMsg, setDetailsErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (name?.length > 0 && name?.length < 3) {
      setNameError(true);
      setNameErrorMsg("Name must have 3 or more characters");
    }
    if (details?.length > 0 && details?.length < 20) {
      setDetailsError(true);
      setDetailsErrorMsg("Details must have 20 or more characters");
    }
    // if (request == "servicetype" || request == "" || request.length === 0) {
    //   setRequestError(true);
    //   setRequestErrorMsg("Request type must be choose");
    //   return;
    // }
    // else {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_URL.localhost}/request-communityservices/requestform/${requestId}`,
        data: {
          name: name,
          servicetype: request,
          details: details,
          // creator: auth.userId,
        },
        headers: {
          // Authorization: "Bearer " + auth.token,
        },
      });
      console.log("Response--", response);
      if (response.status === 200) {
        alert(`Request Updated Successfully!`);
        navigation.navigate("Community Services");
        // setName("");
        // setDetails("");
        // setRequest("");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
    // }
  };

  return (
    <ScrollView>
      <Label text={`\nName`} />
      <Input
        placeholder="Enter Name"
        onChangeText={(name) => {
          setName(name);
          if (name.length > 0 && name.length < 3) {
            setNameError(true);
            setNameErrorMsg("Name must have 3 or more characters");
          } else {
            setNameError(false);
          }
        }}
        value={name}
        error={nameError ? <Text>{nameErrorMsg}</Text> : null}
      />

      <Label text="Choose One Option" />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={request}
          onValueChange={(value) => {
            setRequest(value);
            // if (
            //   request === "servicetype" &&
            //   request.length > 0 &&
            //   request.length === 0
            // ) {
            //   setRequestError(true);
            //   requestErrorMsg("Request type must be choose");
            // } else {
            //   setRequestError(false);
            // }
          }}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Choose Service Type" value="servicetype" />
          <Picker.Item label="Home Security" value="homeSecurity" />
          <Picker.Item label="Tourists Security" value="touristSecurity" />
          <Picker.Item label="Events Security" value="eventsSecurity" />
          <Picker.Item label="Others" value="others" />
        </Picker>
        {/* {requestError ? (
          <Text style={{ color: "red" }}>{requestErrorMsg}</Text>
        ) : null} */}
      </View>

      <Label text="Details" />
      <Input
        placeholder="Enter details"
        onChangeText={(details) => {
          setDetails(details);
          if (details.length > 0 && details.length < 20) {
            setDetailsError(true);
            setDetailsErrorMsg("Details must have 20 or more characters");
          } else {
            setDetailsError(false);
          }
        }}
        value={details}
        error={detailsError ? <Text>{detailsErrorMsg}</Text> : null}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: "90%",
    height: 70,
    marginVertical: 10,
    marginLeft: 15,
  },
  picker: {
    flex: 1,
    height: 70,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default CommunityServicesForm;
