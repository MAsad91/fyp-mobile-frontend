import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import { API_URL } from "../config";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

const SafeLifeReportForm = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [safelifeReport, setSafelifeReport] = useState({});

  const route = useRoute();
  const request = route.params;
  let arrayData = [];
  for (const value in request) {
    arrayData.push(request[value]);
    // console.log(`key=${value}: ${request[value]}`);
  }
  console.log("arrayData: ", arrayData.join(""));
  const requestId = arrayData.join("");
  // console.log(request);

  useEffect(() => {
    const LoadReportData = async () => {
      const result = await axios.get(
        `${API_URL.localhost}/safelife-report/report/${requestId}`
      );
      setSafelifeReport(result.data[0]);
      // console.log(result.data[0].name);
    };
    LoadReportData();
  }, []);
  console.log(safelifeReport.name);

  const [name, setName] = useState(safelifeReport.name);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [reportType, setReportType] = useState(safelifeReport.reporttype);
  // const [reportTypeError, setReportTypeError] = useState(false);
  // const [reportTypeErrorMsg, setReportTypeErrorMsg] = useState("");
  const [details, setDetails] = useState(safelifeReport.details);
  const [detailsError, setDetailsError] = useState(false);
  const [detailsErrorMsg, setDetailsErrorMsg] = useState("");
  // const [image, setImage] = useState(null);
  const [location, setLocation] = useState(safelifeReport.location);
  const [locationError, setLocationError] = useState(false);
  const [locationErrorMsg, setLocationErrorMsg] = useState("");

  const nameRegex = /^[a-zA-Z_ ]+$/gm;

  const handleSubmit = async () => {
    console.log(name, reportType, details, location);
    if (name?.length > 0 && name?.length < 3 || !name.match(nameRegex)) {
      setNameError(true);
      setNameErrorMsg("Name must have 3 or more characters and must be in alphabets");
      return;
    }
    if (details?.length > 0 && details?.length < 20) {
      setDetailsError(true);
      setDetailsErrorMsg("Details must have 20 or more characters");
    }
    if (location?.length > 0 && location?.length < 3) {
      setLocationError(true);
      setLocationErrorMsg("Location must have 3 or more characters");
    }
    // if (
    //   reportType == "reporttype" ||
    //   reportType == "" ||
    //   reportType.length === 0
    // ) {
    //   setReportTypeError(true);
    //   setReportTypeErrorMsg("Report type must be choose");
    //   return;
    // }
    // if (!image) {
    //   return;
    // } else {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_URL.localhost}/safelife-report/reportform/${requestId}`,
        data: {
          name: name,
          reporttype: reportType,
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
        alert(`SafeLife Report is Updated Successfully!`);
        navigation.navigate("SafeLife Reports");
        // setName("");
        // setDetails("");
        // setLocation("");
        // // setImage(null);
        // setReportType("");
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
    // }
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
          }else if (!name.match(nameRegex)) {
            setNameError(true);
            setNameErrorMsg("Name characters must be alphabet");
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
          selectedValue={reportType}
          onValueChange={(value) => {
            setReportType(value);
            // if (
            //   reportType === "reporttype" &&
            //   reportType === "" &&
            //   reportType.length === 0
            // ) {
            //   setReportTypeError(true);
            //   setReportTypeErrorMsg("Report type must be choose");
            // } else {
            //   setReportTypeError(false);
            // }
          }}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Choose Report Type." value="reporttype" />
          <Picker.Item label="Road Accident" value="accident" />
          <Picker.Item label="Fire" value="fire" />
          <Picker.Item label="Medical Treatment" value="treatment" />
          <Picker.Item label="Violence" value="violence" />
          <Picker.Item label="Abuse" value="Abuse" />
          <Picker.Item label="Help" value="help" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
        {/* {reportTypeError ? (
          <Text style={{ color: "red" }}>{reportTypeErrorMsg}</Text>
        ) : null} */}
      </View>

      <Label text="Incident Details" />
      <Input
        placeholder="Enter Incident Details"
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

      <Label text="Incident Location" />
      <Input
        placeholder="Enter Incident Location"
        onChangeText={(location) => {
          setLocation(location);
          if (location.length > 0 && location.length < 3) {
            setLocationError(true);
            setLocationErrorMsg("Location must have 3 or more characters");
          } else {
            setLocationError(false);
          }
        }}
        value={location}
        error={locationError ? <Text>{locationErrorMsg}</Text> : null}
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

export default SafeLifeReportForm;
