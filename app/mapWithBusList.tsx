import Map from "@/components/Map";
import Buscard from "@/components/ui/Buscard";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const img1 = require("@/assets/SLTB_Pic/bus.png");
// function BusCard(busNumber: string, busname: string) {
//   return (
//     <View
//       style={{
//         width: "100%",
//         backgroundColor: "white",
//         borderRadius: 10,
//         padding: 10,
//         marginBottom: 10,
//         flexDirection: "row",
//         alignItems: "center",
//       }}
//     >
//       <View
//         style={{
//           marginRight: 30,
//           width: 50,
//           height: 50,
//           backgroundColor: "#84003A",
//           borderRadius: 16,
//         }}
//       >
//         <Image
//           source={img1}
//           style={{ width: 30, height: 30, objectFit: "contain", margin: 10 }}
//         />
//       </View>
//       <View style={{ width: 10, flex: 1, flexDirection: "row", gap: 20 }}>
//         <Text style={{ fontSize: 24, fontWeight: "bold" }}>{busNumber}</Text>
//         <Text style={{ fontSize: 20, fontWeight: "bold" }}>{busname}</Text>
//       </View>
//     </View>
//   );
// }

const mapWithBusList = () => {
  const { tripData } = useLocalSearchParams();
  // Parse tripData from string to array
  let trips = [];
  try {
    trips = tripData ? JSON.parse(tripData as string) : [];
  } catch (e) {
    console.error("Failed to parse tripData", e);
    trips = [];
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.mapContainer}>
          <Map />
        </View>
        <View style={styles.busListContainer}>
          <Text style={styles.title}>Busses On route</Text>
          <View style={{ width: "100%" }}>
            <FlatList
              data={trips}
              keyExtractor={(item, index) =>
                item.tripId?.toString() || index.toString()
              }
              renderItem={({ item }) => (
                <View>
                  <Buscard
                    tripId={item.tripId}
                    routeId={item.routeId}
                    tripName={item.Trip?.name}
                    routeName={item.Route?.name}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default mapWithBusList;

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "lightgray",
  },
  busListContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "50%",
    backgroundColor: "#84003A",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    marginTop: 20,
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
