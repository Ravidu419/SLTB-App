import axios from "axios";
import { ChevronDown, Dot } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMapStore } from "../../store/useMapStore";
const img1 = require("@/assets/SLTB_Pic/bus.png");

interface BuscardProps {
  tripId: string;
  routeId: string;
  tripName: string;
  routeName: string;
}

const Buscard = ({ tripId, routeId, tripName, routeName }: BuscardProps) => {
  const setGlobalTripData = useMapStore(
    (state: any) => state.setGlobalTripData
  );
  const BackEndUrl = "http://192.168.83.186:3000";
  const [isExpanded, setIsExpanded] = useState(false);
  const globalTripData = useMapStore((state: any) => state.globalTripData);

  const [loading, setLoading] = useState(false);

  const [localGlobalStoreData, setLocalGlobalStoreData] = useState<any>(null);
  const [routeDistanceList, setRouteDistanceList] = useState<any>(null);

  // async function getAllDetailsAboutTrip() {
  //   try {
  //     const response = await axios.post(
  //       `${BackEndUrl}/route/getTripDetailsByTripId`,
  //       { tripId }
  //     );

  //     console.log("stored data is", response.data);
  //     setGlobalTripData(response.data);

  //     return response.data;
  //   } catch (e) {
  //     alert("error in fetching trip details" + e);
  //     return null;
  //   } finally {
  //   }
  // }

  async function getAllDetailsAboutTripAndSetLocalyAterSaveGlobaly() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/route/getTripDetailsByTripId`,
        { tripId }
      );

      console.log("stored data is", response.data);
      setLocalGlobalStoreData(response.data);
      setGlobalTripData(response.data);

      const DistanceAddedTripDetails = response.data.TripTimeWithCity?.map(
        (eachTripPosition: any) => ({
          cityId: eachTripPosition.cityId,
          City: eachTripPosition.City,
          days: eachTripPosition.days,
          hours: eachTripPosition.hours,
          mins: eachTripPosition.mins,
        })
      );

      try {
        const Resalt = await axios.post(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/maps/getRoueDistance`,
          {
            cityList: DistanceAddedTripDetails,
          }
        );
        // Save the cityList from the response to state
        setRouteDistanceList(Resalt.data);
        console.log("dutation data is ", Resalt.data.results);
      } catch (e) {
        console.log("error in fetching route distance", e);
      }
      return response.data;
    } catch (e) {
      alert("error in fetching trip details" + e);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* unExpanded View */}
      <Pressable
        onPress={async () => {
          if (isExpanded) {
            setIsExpanded(false);
            return;
          }
          if (localGlobalStoreData) {
            setGlobalTripData(localGlobalStoreData);
            setIsExpanded(true);
            return;
          }
          await getAllDetailsAboutTripAndSetLocalyAterSaveGlobaly();
          setIsExpanded(true);
        }}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginRight: 20,
            width: 50,
            height: 50,
            backgroundColor: "#84003A",
            borderRadius: 16,
          }}
        >
          <Image
            source={img1}
            style={{ width: 30, height: 30, objectFit: "contain", margin: 10 }}
          />
        </View>
        <View
          style={{
            width: 10,
            flex: 1,
            flexDirection: "row",
            gap: 20,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#84003A" }}>
            {routeId}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#84003A" }}>
            {routeName}
          </Text>
        </View>

        <Pressable
          onPress={async () => {
            if (isExpanded) {
              setIsExpanded(false);
              return;
            }
            if (localGlobalStoreData) {
              setGlobalTripData(localGlobalStoreData);
              setIsExpanded(true);
              return;
            }
            await getAllDetailsAboutTripAndSetLocalyAterSaveGlobaly();
            setIsExpanded(true);
          }}
        >
          <Text>
            {loading ? (
              // Use ActivityIndicator instead of Image for spinner
              <ActivityIndicator size={25} color="#84003A" />
            ) : (
              <ChevronDown color="#84003A" size={30} />
            )}
          </Text>
        </Pressable>
      </Pressable>

      {/* expand View */}
      {isExpanded && localGlobalStoreData && (
        <View style={styles.ExpandedContainer}>
          {/* //from to container */}
          {localGlobalStoreData.pastPosition &&
            localGlobalStoreData.futurePosition && (
              <View
                style={{
                  padding: 2,
                  flexDirection: "row",
                  minHeight: 60, // Add a minHeight to ensure children are visible
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Dot color="#84003A" size={30} strokeWidth={5} />
                    <Text
                      style={{
                        color: "#84003A",
                        fontSize: 14,
                        fontWeight: "bold",
                        left: -5,
                      }}
                    >
                      From
                    </Text>
                  </View>
                  <Text
                    style={{
                      top: -3,
                      color: "#84003A",
                      fontSize: 24,
                      fontWeight: "bold",
                      paddingLeft: 25,
                    }}
                  >
                    {localGlobalStoreData.pastPosition.City.name}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Dot color="#84003A" size={30} strokeWidth={5} />
                    <Text
                      style={{
                        color: "#84003A",
                        fontSize: 14,
                        fontWeight: "bold",
                        left: -5,
                      }}
                    >
                      to
                    </Text>
                  </View>
                  <Text
                    style={{
                      top: -3,
                      color: "#84003A",
                      fontSize: 24,
                      fontWeight: "bold",
                      paddingLeft: 25,
                    }}
                  >
                    {localGlobalStoreData.futurePosition.City.name}
                  </Text>
                </View>
              </View>
            )}

          {/* Not Trip Start Yet */}
          {localGlobalStoreData.pastPosition === null &&
            localGlobalStoreData.futurePosition && (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#84003A",
                    fontSize: 26,
                    fontWeight: "bold",
                  }}
                >
                  {(() => {
                    const hours =
                      localGlobalStoreData.futurePosition.hours ?? 0;
                    const mins = localGlobalStoreData.futurePosition.mins ?? 0;
                    const period = hours >= 12 ? "PM" : "AM";
                    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
                    const formattedMins = mins.toString().padStart(2, "0");
                    const startCity =
                      localGlobalStoreData?.futurePosition?.City.name ?? "";
                    return `Starts at ${displayHour}:${formattedMins} ${period} `;
                  })()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#84003A",
                    fontSize: 26,
                    fontWeight: "bold",
                  }}
                >
                  {`from ${localGlobalStoreData.futurePosition.City.name}`}
                </Text>
              </View>
            )}
          {/* Completed Trip */}
          {localGlobalStoreData.pastPosition &&
            localGlobalStoreData.futurePosition === null && (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#84003A",
                    fontSize: 26,
                    fontWeight: "bold",
                  }}
                >
                  {(() => {
                    const hours = localGlobalStoreData.pastPosition.hours ?? 0;
                    const mins = localGlobalStoreData.pastPosition.mins ?? 0;
                    const period = hours >= 12 ? "PM" : "AM";
                    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
                    const formattedMins = mins.toString().padStart(2, "0");
                    const startCity =
                      localGlobalStoreData?.pastPosition?.City.name ?? "";
                    return `Completed ${displayHour}:${formattedMins} ${period} `;
                  })()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#84003A",
                    fontSize: 26,
                    fontWeight: "bold",
                  }}
                >
                  {`in ${localGlobalStoreData.pastPosition.City.name}`}
                </Text>
              </View>
            )}
          {/* pogress bar */}
          {localGlobalStoreData?.presentageInTrip && (
            <View
              style={{
                backgroundColor: "#d3d3d3",
                borderRadius: 10,
                marginVertical: 10,
                padding: 5,
              }}
            >
              <View
                style={{
                  height: 5,
                  backgroundColor: "#84003A",
                  borderRadius: 10,
                  width: `${
                    (localGlobalStoreData?.presentageInTrip ?? 0) * 100
                  }%`,
                }}
              ></View>
            </View>
          )}

          {/* // Presentage */}

          {localGlobalStoreData?.presentageInTrip && (
            <View
              style={{
                top: -5,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#84003A",
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {/* //show presentage if not null paseposition and futureposition */}
                {localGlobalStoreData.pastPosition &&
                  localGlobalStoreData.futurePosition &&
                  `${Math.trunc(
                    localGlobalStoreData.presentageInTrip * 100
                  )}% Completed`}
                {/* if not have any pastPosition and have futureposition show copleted
              or not started */}
                {!localGlobalStoreData.pastPosition &&
                  localGlobalStoreData.futurePosition &&
                  "Not Started"}
                {localGlobalStoreData.pastPosition &&
                  !localGlobalStoreData.futurePosition &&
                  "Completed"}
              </Text>
            </View>
          )}

          {/* //second pogress bar */}

          <View
            style={{
              // backgroundColor: "#d3d3d3",
              borderRadius: 10,
              marginVertical: 10,
              padding: 5,
              flexDirection: "row",
              gap: 2,
            }}
          >
            {routeDistanceList &&
              routeDistanceList.results.map((each: any, index: number) => (
                <View
                  key={index}
                  style={{
                    // overflow: "show",
                    position: "relative",
                    height: 8,
                    backgroundColor: "#84003A",
                    borderRadius: 10,
                    width: `${each.percentage}%`,
                  }}
                >
                  <Text
                    style={{
                      color: "#84003A",
                      fontSize: 10,
                      position: "absolute",
                      top: 10,
                      left: "50%",
                      transform: [{ translateX: -10 }], // Approximate center alignment
                    }}
                  >
                    {Math.trunc(each.km)} km
                  </Text>

                  {/* // destination points names */}
                  <View>
                    {/* <View
                      style={{
                        height: 13,
                        width: 13,
                        backgroundColor: "white",
                        flexDirection: "row",

                        borderRadius: 100,
                        left: "100%",
                        transform: [{ translateX: -7 }],
                        position: "absolute",
                      }}
                    ></View> */}

                    {/* //vertical bar */}
                    <View
                      style={{
                        alignItems: "center",
                        height: 15,
                        width: 2,
                        backgroundColor: "#84003A",
                        flexDirection: "row",
                        justifyContent: "center",
                        top: 10,
                        position: "absolute",
                        left: "100%",
                      }}
                    ></View>
                    <Text
                      style={{
                        color: "#84003A",
                        fontSize: 10,
                        position: "absolute",
                        top: 30,
                        left: "100%",
                        transform: [
                          {
                            translateX: `${
                              index === routeDistanceList.results.length - 1
                                ? "-100%"
                                : "-50%"
                            }`,
                          },
                        ], // Approximate center alignment
                      }}
                    >
                      {each.to}
                    </Text>
                  </View>
                  {/* // start point when index is 0 */}
                  {index === 0 && (
                    <View>
                      {/* //vertical bar */}
                      <View
                        style={{
                          alignItems: "center",
                          height: 15,
                          width: 2,
                          backgroundColor: "#84003A",
                          flexDirection: "row",
                          justifyContent: "center",
                          top: 10,
                          position: "absolute",
                          right: "100%",
                        }}
                      ></View>
                      <Text
                        style={{
                          color: "#84003A",
                          fontSize: 10,
                          position: "absolute",
                          top: 30,
                          right: "100%",
                          transform: [{ translateX: "100%" }], // Approximate center alignment
                        }}
                      >
                        {each.from}
                      </Text>
                    </View>
                  )}
                </View>
                //
              ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Buscard;

const styles = StyleSheet.create({
  ExpandedContainer: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
});
