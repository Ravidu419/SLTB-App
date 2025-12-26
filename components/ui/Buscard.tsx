import axios from "axios";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
  const [isExpanded, setIsExpanded] = useState(true);

  async function getAllDetailsAboutTrip() {
    try {
      const response = await axios.post(
        `${BackEndUrl}/route/getTripDetailsByTripId`,
        { tripId }
      );

      console.log(response.data);
      setGlobalTripData(response.data);
      return response.data;
    } catch (e) {
      alert("error in fetching trip details" + e);
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
        onPress={() => {
          const data = getAllDetailsAboutTrip();
          alert("trip details" + JSON.stringify(data));
        }}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "red",
        }}
      >
        <View
          style={{
            marginRight: 30,
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
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>{routeId}</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{routeName}</Text>
        </View>

        <Pressable onPress={() => setIsExpanded(!isExpanded)}>
          <Text>
            <ChevronDown color="black" size={30} />
          </Text>
        </Pressable>
      </Pressable>

      {/* expand View */}
      {isExpanded && (
        <View>
          <Text>hasala</Text>
        </View>
      )}
    </View>
  );
};

export default Buscard;

const styles = StyleSheet.create({
  ExpandedContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
});
