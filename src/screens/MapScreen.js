import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, useLoadScript, Marker } from "react-native-maps";

const MapScreen = () => {

  const center = { lat: 33.6844, lng: 73.0479 };
  const latitude = 33.6844;
  const longitude = 73.0479;
  const latitudeDelta = 0.0922;
  const longitudeDelta = 0.0421;

  return (
    <View style={styles.container}
    >
      <MapView
        style={styles.map}
        center={center}
        provider={PROVIDER_GOOGLE}
        zoom={10}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        
      >
        <MapView.Marker
            coordinate={{latitude: 33.6844, longitude: 73.0479,}}
            title={"Title"}
            description={"description"}
         />
      </MapView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
