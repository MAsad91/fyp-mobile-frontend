import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import {API_URL} from "../config";
import { AuthContext } from "../context/auth-context";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

const CrimeReportForm = () => {
  const navigation = useNavigation();
  const [crimeReport, setCrimeReport] = useState({});

  const route = useRoute();
  const request = route.params;
  let arrayData=[] ;
  for (const value in request) {
    arrayData.push(request[value]);
    
  }
  const requestId = arrayData.join('');

  useEffect(() => {
    const LoadReportData = async () => {
      const result = await axios.get(
        `${API_URL.localhost}/crime-report/report/${requestId}`
      );
      setCrimeReport(result.data.report);
      console.log(result.data.report);
    };
    LoadReportData();
  }, []);
  console.log(name);
  console.log("crime report=>",crimeReport.name);
  
 
  const [name, setName] = useState(crimeReport.name);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [crimeType, setCrimeType] = useState(crimeReport.crimetype);
  const [crimeTypeError, setCrimeTypeError] = useState(false);
  const [crimeTypeErrorMsg, setCrimeTypeErrorMsg] = useState("");
  const [details, setDetails] = useState(crimeReport.details);
  const [detailsError, setDetailsError] = useState(false);
  const [detailsErrorMsg, setDetailsErrorMsg] = useState("");
  const [location, setLocation] = useState(crimeReport.location);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nameRegex = /^[a-zA-Z_ ]+$/gm;

  const handleSubmit = async () => {
    console.log("Crime Type====", crimeType);
    if ( name?.length > 0 && name?.length < 3 || !name.match(nameRegex)) {
      setNameError(true);
      setNameErrorMsg("Name must have 3 or more characters and must be in alphabets");
      return;
    }
    if ( details?.length > 0 && details?.length < 20) {
      setDetailsError(true);
      setDetailsErrorMsg("Details must have 20 or more characters");
    }
    if ( location?.length > 0 && location?.length < 3) {
      setError(true);
      setErrorMessage("Location must have 3 or more characters");
    }

    // if (crimeType == "crimetype" || crimeType == "" || crimeType.length > 0) {
    //   setCrimeTypeError(false);
    //   setCrimeTypeErrorMsg("Crime type must be choose");
    //   return;
    // }
    // if (!image) {
    //   return;
    // } else {
      console.log("Name===", name, crimeType, details, location, image);

      try {
        const response = await axios({
          method: "patch",
          url: `${API_URL.localhost}/crime-report/reportform/${requestId}`,
          data: {
            name: name,
            crimetype: crimeType,
            details: details,
            location: location,
            // images: image,
            // creator: auth.userId,
          },
          headers: {
            // "Content-Type": "multipart/form-data",
            // Authorization: "Bearer " + auth.token,
          },
        });
        console.log("Response---", response);
        if (response.status === 200) {
          alert(`Crime Report is Updated Successfully!`);
          navigation.navigate("Crime Reports");
        }
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    // }
    console.log("Crime Type====", crimeType);
  };

  return (
    <ScrollView>
      <Label text={`\nName`} />
      <Input
        placeholder="Enter Your Name"
        onChangeText={(name) => {
          setName(name);
          if (name.length > 0 && name.length < 3) {
            setNameError(true);
            setNameErrorMsg("Name must have 3 or more characters");
          } else if (!name.match(nameRegex)) {
            setNameError(true);
            setNameErrorMsg("Name characters must be alphabet");
          }
          else {
            setNameError(false);
          }
        }}
        value={name}
        error={nameError === true ? <Text>{nameErrorMsg}</Text> : null}
      />
      <Label text="Choose One Option" />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={crimeType}
          onValueChange={(value) => {
            setCrimeType(value);
            // if (
            //   crimeType === "crimetype" &&
            //   crimeType === "" &&
            //   crimeType.length === 0
            // ) {
            //   setCrimeTypeError(true);
            //   setCrimeTypeErrorMsg("Crime type must be choose");
            // } else {
            //   setCrimeTypeError(false);
            // }
          }}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Choose Crime Type" value="crimetype" />
          <Picker.Item label="Robbery" value="robbery" />
          <Picker.Item label="Snatching" value="snatching" />
          <Picker.Item label="Harassment" value="harassment" />
          <Picker.Item label="Kidnapping" value="kidnapping" />
          <Picker.Item label="Cyber Crime" value="cybercrime" />
          <Picker.Item label="Fraud" value="fraud" />
          <Picker.Item label="Murder" value="murder" />
          <Picker.Item label="Others" value="Others" />
        </Picker>

        {/* {crimeTypeError ? (
          <Text style={{ color: "red" }}>{crimeTypeErrorMsg}</Text>
        ) : null} */}
      </View>

      <Label text="Details" />
      <Input
        placeholder="Enter Crime Details"
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
        error={detailsError === true ? <Text>{detailsErrorMsg}</Text> : null}
      />
      <Label text="Location" />
      <Input
        placeholder="Enter Crime Location"
        onChangeText={(location) => {
          setLocation(location);
          if (location.length > 0 && location.length < 3) {
            setError(true);
            setErrorMessage("Location must have 3 or more characters");
          } else {
            setError(false);
          }
        }}
        value={location}
        error={error === true ? <Text>{errorMessage}</Text> : null}
      />
      {/* <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
        {!image && <Text style={styles.error}>Image must be choose</Text>}
      </View> */}

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
  imageStyle: {
    width: 300,
    height: 200,
    alignSelf: "center",
  },
  error: {
    color: "red",
    fontSize: 15,
    marginTop: 3,
    textAlign: "center",
  },
});

export default CrimeReportForm;
