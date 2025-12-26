import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

const map = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        //    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{ width: "100%", height: "100%" }}
        region={{
          latitude: 7.8731, // Centered on Sri Lanka
          longitude: 80.7718,
          latitudeDelta: 2.5,
          longitudeDelta: 2.5,
        }}
      ></MapView>
    </View>
  );
};

export default map;
