import React from "react";
import { Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useMapStore } from "../store/useMapStore";

const map = () => {
  const { globalTripData } = useMapStore() as { globalTripData: any };

  const sortedLocations = globalTripData?.TripTimeWithCity?.map(
    (each: any) => each.City.name
  );

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>{JSON.stringify(globalTripData)}</Text> */}
      {/* <Text>{JSON.stringify(sortedLocations)}</Text>; */}
      <MapView
        //    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{ width: "100%", height: "100%" }}
        region={{
          latitude: 7.8731, // Centered on Sri Lanka
          longitude: 80.7718,
          latitudeDelta: 2.5,
          longitudeDelta: 2.5,
        }}
      >
        {globalTripData && (
          <MapViewDirections
            origin={sortedLocations[0]}
            destination={sortedLocations[sortedLocations.length - 1]}
            waypoints={sortedLocations.slice(1, -1)}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}

        {globalTripData?.TripTimeWithCity?.map((town: any, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: town.location.location.lat,
              longitude: town.location.location.lng,
            }}
            title={town.City?.name}
            description={`arrive at ${String(town.hours).padStart(
              2,
              "0"
            )}:${String(town.mins).padStart(2, "0")}`}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={
                  globalTripData.runningStatus === "Not_Started" && index === 0
                    ? require("@/assets/mapIcons/bus.png")
                    : globalTripData.runningStatus === "Completed" &&
                      index === sortedLocations.length - 1
                    ? require("@/assets/mapIcons/bus.png")
                    : require("@/assets/mapIcons/location.png")
                }
                style={{ width: 40, height: 40 }} // set desired size
                resizeMode="contain"
              />
            </View>
          </Marker>
        ))}

        {globalTripData?.runningStatus === "Running" && (
          <Marker
            coordinate={{
              latitude: globalTripData.futurePosition.location.location.lat,
              longitude: globalTripData.futurePosition.location.location.lng,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("@/assets/mapIcons/bus.png")}
                style={{ width: 30, height: 30 }} // set desired size
                resizeMode="contain"
              />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default map;
