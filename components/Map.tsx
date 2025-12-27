import React, { useState } from "react";
import { Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useMapStore } from "../store/useMapStore";

const map = () => {
  const { globalTripData } = useMapStore() as { globalTripData: any };
  const [localCalculatedPresentageInTrip, setLocalCalculatedPresentageInTrip] =
    useState<any>(1);
  const [midRoutePoint, setMidRoutePoint] = useState<any>(null);

  const sortedLocations = globalTripData?.TripTimeWithCity?.map(
    (each: any) => each.City.name
  );

  // function calculatePresentageInTrip() {
  //   // console.log("This logs every 3 seconds!");
  //   console.log(localCalculatedPresentageInTrip);
  //   setLocalCalculatedPresentageInTrip((pre: any) => {
  //     let newValue = pre + 5;
  //     return newValue;
  //   });
  // }
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     calculatePresentageInTrip();
  //     // This function will run every 3 seconds
  //   }, 10000); // 3000ms = 3 seconds

  //   // Cleanup function to stop interval when component unmounts
  //   return () => clearInterval(interval);
  // }, []);

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
            apikey={}
            strokeWidth={5}
            strokeColor="#84003A90"
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
                  //add bus icon if not started show icon in start point and if completed show end icon
                  globalTripData.runningStatus === "Not_Started" && index === 0
                    ? require("@/assets/mapIcons/bus.png")
                    : globalTripData.runningStatus === "Completed" &&
                      index === sortedLocations.length - 1
                    ? require("@/assets/mapIcons/bus.png")
                    : //useEnd and Start icons
                    index === 0
                    ? require("@/assets/mapIcons/start.png")
                    : index === sortedLocations.length - 1
                    ? require("@/assets/mapIcons/end.png")
                    : require("@/assets/mapIcons/pin.png")
                }
                style={{ width: 40, height: 40 }} // set desired size
                resizeMode="contain"
              />
            </View>
          </Marker>
        ))}

        {/* use this give all cordination to get midde point */}
        {globalTripData?.runningStatus === "Running" &&
          globalTripData.pastPosition &&
          globalTripData.futurePosition && (
            <MapViewDirections
              origin={{
                latitude: globalTripData.pastPosition.location.location.lat,
                longitude: globalTripData.pastPosition.location.location.lng,
              }}
              destination={{
                latitude: globalTripData.futurePosition.location.location.lat,
                longitude: globalTripData.futurePosition.location.location.lng,
              }}
              apikey={}
              strokeWidth={6}
              strokeColor="red"
              onReady={(result) => {
                if (result.coordinates && result.coordinates.length > 0) {
                  console.log(
                    "presentage in derections is ",
                    localCalculatedPresentageInTrip
                  );
                  const midIndex = Math.floor(
                    result.coordinates.length * globalTripData.presentageInTrip
                  );
                  setMidRoutePoint(result.coordinates[midIndex]);
                }
              }}
            />
          )}

        {midRoutePoint && globalTripData.TripTimeWithCity && (
          <Marker coordinate={midRoutePoint} pinColor="red" title="Midpoint">
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("@/assets/mapIcons/bus.png")}
                style={{ width: 40, height: 40 }} // set desired size
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
