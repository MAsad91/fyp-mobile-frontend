import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../context/auth-context";

import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import axios from "axios";
import {API_URL} from "../config";

const RequestForm = () => {
  const route = useRoute();
  const dataRequest = route.params;
  let arrayData=[] ;
  for (const value in dataRequest) {
    arrayData.push(dataRequest[value]);
    console.log(`key=${value}: ${dataRequest[value]}`);
    
  }
  console.log("arrayData: ",arrayData.join(''));
  const requestId = arrayData.join('');
  console.log(dataRequest);
  console.log("id",requestId);

  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [request, setRequest] = useState("");
  const [requestError, setRequestError] = useState(false);
  const [requestErrorMsg, setRequestErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState(false);
  const [detailsErrorMsg, setDetailsErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (name.length > 0 && name.length < 3) {
      setNameError(true);
      setNameErrorMsg("Name must have 3 or more characters");
    }
    if (details.length > 0 && details.length < 20) {
      setDetailsError(true);
      setDetailsErrorMsg("Details must have 20 or more characters");
    }
    // if (request == "requesttype" || request == "" || request.length === 0) {
    //   setRequestError(true);
    //   setRequestErrorMsg("Request type must be choose");
    //   return;
    // } 
    // else {
      try {
        const response = await axios({
          method: "patch",
          url: `${API_URL.localhost}/request-certificatepermits/requestform/${requestId}`,
          data: {
            name: name,
            requesttype: request,
            details: details,
            // creator: auth.userId,
          },
          headers: {
            // Authorization: "Bearer " + auth.token,
          },
        });
        console.log("Response--", response);
        if (response.status === 200) {
          alert(`Request Submitted Successfully!`);
          navigation.navigate("Certificate & Permit");
          setName("");
          setRequest("");
          setDetails("");
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
            //   request === "requesttype" &&
            //   request === "" &&
            //   request.length === 0
            // ) {
            //   requestError(true);
            //   requestErrorMsg("Request type must be choose");
            // } else {
            //   requestError(false);
            // }
          }}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item
            label="Choose Certificate or Permit"
            value="requesttype"
          />
          <Picker.Item label="Certificate" value="certificate" />
          <Picker.Item label="Permit" value="permit" />
        </Picker>
        {/* {requestError ? (
          <Text style={{ color: "red" }}>{requestErrorMsg}</Text>
        ) : null} */}
      </View>

      <Label text="Details " />
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

export default RequestForm;
