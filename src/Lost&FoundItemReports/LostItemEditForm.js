import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  AppRegistry,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../context/auth-context";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import axios from "axios";
import { API_URL } from "../config";

const LostItemForm = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [lostReport, setLostReport] = useState({});

  const route = useRoute();
  const request = route.params;
  let arrayData = [];
  for (const value in request) {
    arrayData.push(request[value]);
  }
  console.log("arrayData: ", arrayData.join(""));
  const requestId = arrayData.join("");
  console.log("id", requestId);

  useEffect(() => {
    const LoadReportData = async () => {
      const result = await axios.get(
        `${API_URL.localhost}/lost-report/report/${requestId}`
      );
      setLostReport(result.data.report);
    };
    LoadReportData();
  }, []);
  console.log("lost",lostReport.name);

  const [name, setName] = useState(lostReport.name);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [itemName, setItemName] = useState(lostReport.itemname);
  const [itemNameError, setItemNameError] = useState(false);
  const [itemNameErrorMsg, setItemNameErrorMsg] = useState("");
  const [state, setState] = useState(lostReport.state);
  const [stateError, setStateError] = useState(false);
  const [stateErrorMsg, setStateErrorMsg] = useState("");
  const [lostItem, setLostItem] = useState(lostReport.lostitemtype);
  // const [lostItemError, setLostItemError] = useState(false);
  // const [lostItemErrorMsg, setLostItemErrorMsg] = useState("");
  const [color, setColor] = useState(lostReport.color);
  const [colorError, setColorError] = useState(false);
  const [colorErrorMsg, setColorErrorMsg] = useState("");
  const [location, setLocation] = useState(lostReport.location);
  const [locationError, setLocationError] = useState(false);
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [details, setDetails] = useState(lostReport.details);
  const [detailsError, setDetailsError] = useState(false);
  const [detailsErrorMsg, setDetailsErrorMsg] = useState("");
  const [description, setDescription] = useState(lostReport.description);
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("");
 
  const nameRegex = /^[a-zA-Z_ ]+$/gm;

  const handleSubmit = async () => {
    console.log(
      name,
      itemName,
      state,
      lostItem,
      color,
      location,
      details,
      description,
    );

    if (name?.length > 0 && name?.length < 3 || !name.match(nameRegex)) {
      setNameError(true);
      setNameErrorMsg("Name must have 3 or more characters and must be in alphabets");
      return;
    }
    if (itemName?.length > 0 && itemName?.length < 4) {
      setItemNameError(true);
      setItemNameErrorMsg("Item Name must have 4 or more characters");
    }
    if (state?.length > 0 && state?.length < 3 || !state.match(nameRegex)) {
      setStateError(true);
      setStateErrorMsg("Item State must have 3 or more characters and must be in alphabets");
      return;
    }
    if (color?.length > 0 && color?.length < 3 || !color.match(nameRegex)) {
      setColorError(true);
      setColorErrorMsg("Item color must have 3 or more characters and must be in alphabets");
      return;
    }
    if (location?.length > 0 && location?.length < 4) {
      setLocationError(true);
      setLocationErrorMsg("Location must have 4 or more characters");
    }
    if (details?.length > 0 && details?.length < 4) {
      setDetailsError(true);
      setDetailsErrorMsg("Details must have 4 or more characters");
    }
    if (description?.length > 0 && description?.length < 15) {
      setDescriptionError(true);
      setDescriptionErrorMsg("Description must have 15 or more characters");
    }
    // if (lostItem == "lostItemtype" || lostItem == "" || lostItem.length === 0) {
    //   setLostItemError(true);
    //   setLostItemErrorMsg("Lost item type must be choose");
    //   return;
    // }
    // if (!image) {
    //   return;
    // } else {
    try {
      const response = await axios({
        method: "patch",
        url: `${API_URL.localhost}/lost-report/reportform/${requestId}`,
        data: {
          name: name,
          itemname: itemName,
          state: state,
          lostitemtype: lostItem,
          color: color,
          location: location,
          details: details,
          description: description,
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
        alert(`Lost Item Report is Updated successfully!`);
        navigation.navigate("LostItems Reports");
        // setName("");
        // setItemName("");
        // setColor("");
        // setState("");
        // setLostItem("");
        // setDetails("");
        // setDescription("");
        // setLocation("");
        // setImage(null);
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

      <Label text="Item Name" />
      <Input
        placeholder="Enter Lost Item Name"
        onChangeText={(itemName) => {
          setItemName(itemName);
          if (itemName.length > 0 && itemName.length < 4) {
            setItemNameError(true);
            setItemNameErrorMsg("Item Name must have 4 or more characters");
          } else {
            setItemNameError(false);
          }
        }}
        value={itemName}
        error={itemNameError ? <Text>{itemNameErrorMsg}</Text> : null}
      />

      <Label text="Item State" />
      <Input
        placeholder="Enter State of Item e.g(old/new)"
        onChangeText={(state) => {
          setState(state);
          if (state.length > 0 && state.length < 3) {
            setStateError(true);
            setStateErrorMsg("Item State must have 3 or more characters");
          }else if (!state.match(nameRegex)) {
            setStateError(true);
            setStateErrorMsg("state characters must be alphabet");
          } else {
            setStateError(false);
          }
        }}
        value={state}
        error={stateError ? <Text>{stateErrorMsg}</Text> : null}
      />

      <Label text="Choose One Option" />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={lostItem}
          onValueChange={(value) => {
            setLostItem(value);
            // if (
            //   lostItem === "lostItemtype" &&
            //   lostItem === "" &&
            //   lostItem.length === 0
            // ) {
            //   setLostItemError(true);
            //   setLostItemErrorMsg("Lost item type must be choose");
            // } else {
            //   setLostItemError(false);
            // }
          }}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Choose Lost Item Type" value="lostitemtype" />
          <Picker.Item label="Electronic" value="electronic" />
          <Picker.Item label="Wallet" value="wallet" />
          <Picker.Item label="Documents" value="documents" />
          <Picker.Item label="Jewelry" value="jewelry" />
          <Picker.Item label="Animals" value="animals" />
          <Picker.Item label="Watches" value="watches" />
          <Picker.Item label="Bags and Luggage" value="bagsandluggage" />
          <Picker.Item label="Child Affairs" value="childaffairs" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
        {/* {lostItemError ? (
          <Text style={{ color: "red" }}>{lostItemErrorMsg}</Text>
        ) : null} */}
      </View>

      <Label text="Item Color" />
      <Input
        placeholder="Enter Item Color"
        onChangeText={(color) => {
          setColor(color);
          if (color.length > 0 && color.length < 3) {
            setColorError(true);
            setColorErrorMsg("Item color must have 3 or more characters");
          }else if (!color.match(nameRegex)) {
            setColorError(true);
            setColorErrorMsg("color name must be alphabet");
          } else {
            setColorError(false);
          }
        }}
        value={color}
        error={colorError ? <Text>{colorErrorMsg}</Text> : null}
      />

      <Label text="Location" />
      <Input
        placeholder="Enter Lost Location"
        onChangeText={(location) => {
          setLocation(location);
          if (location.length > 0 && location.length < 4) {
            setLocationError(true);
            setLocationErrorMsg("Location must have 4 or more characters");
          } else {
            setLocationError(false);
          }
        }}
        value={location}
        error={locationError ? <Text>{locationErrorMsg}</Text> : null}
      />

      <Label text="Details" />
      <Input
        placeholder="Enter Details"
        onChangeText={(details) => {
          setDetails(details);
          if (details.length > 0 && details.length < 4) {
            setDetailsError(true);
            setDetailsErrorMsg("Details must have 4 or more characters");
          } else {
            setDetailsError(false);
          }
        }}
        value={details}
        error={detailsError ? <Text>{detailsErrorMsg}</Text> : null}
      />

      <Label text="Description" />
      <Input
        placeholder="Enter Description"
        onChangeText={(description) => {
          setDescription(description);
          if (description.length > 0 && description.length < 15) {
            setDescriptionError(true);
            setDescriptionErrorMsg(
              "Description must have 15 or more characters"
            );
          } else {
            setDescriptionError(false);
          }
        }}
        value={description}
        error={descriptionError ? <Text>{descriptionErrorMsg}</Text> : null}
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

export default LostItemForm;
