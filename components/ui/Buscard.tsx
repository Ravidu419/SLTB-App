import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const img1 = require("@/assets/SLTB_Pic/bus.png");

interface BuscardProps {
  tripId: string;
  routeId: string;
  tripName: string;
  routeName: string;
}

const Buscard = ({ tripId, routeId, tripName, routeName }: BuscardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* unExpanded View */}
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
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

        <View>
          <Text>
            <ChevronDown color="black" size={30} />
          </Text>
        </View>
      </View>

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
