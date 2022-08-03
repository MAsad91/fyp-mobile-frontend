import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "../context/auth-context";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import axios from "axios";
import {API_URL} from "../config";

const FoundItemForm = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemNameError, setItemNameError] = useState(false);
  const [itemNameErrorMsg, setItemNameErrorMsg] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState(false);
  const [stateErrorMsg, setStateErrorMsg] = useState("");
  const [foundItem, setFoundItem] = useState("");
  const [foundItemError, setFoundItemError] = useState(false);
  const [foundItemErrorMsg, setFoundItemErrorMsg] = useState("");
  const [color, setColor] = useState("");
  const [colorError, setColorError] = useState(false);
  const [colorErrorMsg, setColorErrorMsg] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState(false);
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState(false);
  const [detailsErrorMsg, setDetailsErrorMsg] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("");
  const [image, setImage] = useState(null);

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
    console.log(
      name,
      itemName,
      state,
      foundItem,
      color,
      location,
      details,
      description,
      image
    );

    if (name === "" && name.length < 3) {
      setNameError(true);
      setNameErrorMsg("Name must have 3 or more characters");
    }
    if (itemName === "" && itemName.length < 4) {
      setItemNameError(true);
      setItemNameErrorMsg("Item Name must have 4 or more characters");
    }
    if (state === "" && state.length < 3) {
      setStateError(true);
      setStateErrorMsg("Item State must have 3 or more characters");
    }
    if (color === "" && color.length < 3) {
      setColorError(true);
      setColorErrorMsg("Item color must have 3 or more characters");
    }
    if (location === "" && location.length < 4) {
      setLocationError(true);
      setLocationErrorMsg("Location must have 4 or more characters");
    }
    if (details === "" && details.length < 4) {
      setDetailsError(true);
      setDetailsErrorMsg("Details must have 4 or more characters");
    }
    if (description === "" && description.length < 15) {
      setDescriptionError(true);
      setDescriptionErrorMsg("Description must have 15 or more characters");
    }
    if (
      foundItem == "founditemtype" ||
      foundItem == "" ||
      foundItem.length === 0
    ) {
      setFoundItemError(true);
      setFoundItemErrorMsg("Found item type must be choose");
      return;
    }
    if (!image) {
      return;
    } else {
      try {
        const response = await axios({
          method: "post",
          url: `${API_URL.localhost}/found-report/reportform/`,
          data: {
            name: name,
            itemname: itemName,
            state: state,
            founditemtype: foundItem,
            color: color,
            location: location,
            details: details,
            description: description,
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
          alert(`Found Item Report is submitted successfully!`);
          navigation.navigate("FoundItems Reports");
          setName("");
          setItemName("");
          setColor("");
          setFoundItem("");
          setDescription("");
          setLocation("");
          setDetails("");
          setState("");
          setImage(null);
        }
      } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };

  return (
    <ScrollView>
      <Label text={`\nName`} />
      <Input
        placeholder="Enter Your Name"
        onChangeText={(name) => {
          setName(name);
          if (name.length < 3) {
            setNameError(true);
            setNameErrorMsg("Name must have 3 or more characters");
          } else {
            setNameError(false);
          }
        }}
        value={name}
        error={nameError ? <Text>{nameErrorMsg}</Text> : null}
      />

      <Label text="Item Name" />
      <Input
        placeholder="Enter Found Item Name"
        onChangeText={(itemName) => {
          setItemName(itemName);
          if (itemName.length < 4) {
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
          if (state.length < 3) {
            setStateError(true);
            setStateErrorMsg("Item State must have 3 or more characters");
          } else {
            setStateError(false);
          }
        }}
        value={state}
        error={stateError ? <Text>{stateErrorMsg}</Text> : null}
      />

      <Label text="Choose One option" />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={foundItem}
          onValueChange={(value) => {
            setFoundItem(value);
            if (
              foundItem === "founditemtype" &&
              foundItem === "" &&
              foundItem.length === 0
            ) {
              setFoundItemError(true);
              setFoundItemErrorMsg("Found item type must be choose");
            } else {
              setFoundItemError(false);
            }
          }}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Choose Found Item Type" value="founditemtype" />
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
        {foundItemError ? (
          <Text style={{ color: "red" }}>{foundItemErrorMsg}</Text>
        ) : null}
      </View>

      <Label text="Item Color" />
      <Input
        placeholder="Enter Item Color"
        onChangeText={(color) => {
          setColor(color);
          if (color.length < 3) {
            setColorError(true);
            setColorErrorMsg("Item color must have 3 or more characters");
          } else {
            setColorError(false);
          }
        }}
        value={color}
        error={colorError ? <Text>{colorErrorMsg}</Text> : null}
      />

      <Label text="Location" />
      <Input
        placeholder="Enter Found Location"
        onChangeText={(location) => {
          setLocation(location);
          if (location.length < 4) {
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
          if (details.length < 4) {
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
          if (description.length < 15) {
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

      <View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
        {!image && <Text style={styles.error}>Image must be choose</Text>}
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

export default FoundItemForm;
