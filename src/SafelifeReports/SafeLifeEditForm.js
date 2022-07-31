import { useNavigation, useRoute} from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

const SafeLifeReportForm = () => {
  const route = useRoute();
  const requestId = route.params; 

  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportTypeError, setReportTypeError] = useState(false);
  const [reportTypeErrorMsg, setReportTypeErrorMsg] = useState("");
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState(false);
  const [detailsErrorMsg, setDetailsErrorMsg] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState(false);
  const [locationErrorMsg, setLocationErrorMsg] = useState("");

  //Pick image from gallery
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Result---", result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    console.log(name, reportType, details, location, image);
    if (name.length > 0 && name.length < 3) {
      setNameError(true);
      setNameErrorMsg("Name must have 3 or more characters");
    }
    if (details.length > 0 && details.length < 20) {
      setDetailsError(true);
      setDetailsErrorMsg("Details must have 20 or more characters");
    }
    if (location.length > 0 && location.length < 3) {
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
    if (!image) {
      return;
    } else {
      try {
        const response = await axios({
          method: "patch",
          url: `http://192.168.100.10:5000/safelife-report/reportform/${requestId}`,
          data: {
            name: name,
            reporttype: reportType,
            details: details,
            location: location,
            images: image,
            creator: auth.userId,
          },
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + auth.token,
          },
        });
        console.log("Response---", response);
        if (response.status === 201) {
          alert(`SafeLife Report is submitted Successfully!`);
          navigation.navigate("SafeLife Reports");
          setName("");
          setDetails("");
          setLocation("");
          setImage(null);
          setReportType("");
        }
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <ScrollView>
      <Label text="Name" />
      <Input
        placeholder="Enter Your Name"
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
        {reportTypeError ? (
          <Text style={{ color: "red" }}>{reportTypeErrorMsg}</Text>
        ) : null}
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

      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
        {/* {!image && <Text style={styles.error}>Image must be choose</Text>} */}
      </View>

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
