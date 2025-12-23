import React, { useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function eachDestination(ShowLine?: boolean, placeholder?: string) {
  const placesRef = useRef<any>(null);

  return (
    <View
      style={{
        height: 50,
        width: "100%",
        paddingLeft: 70,
      }}
    >
      <Text style={{ textTransform: "capitalize", top: 5 }}>{placeholder}</Text>
      <TextInput
        style={{
          fontSize: 24,
          fontWeight: "bold",
          borderBottomWidth: 0, // remove underline for iOS and Android
        }}
        underlineColorAndroid="transparent"
        placeholder="Type city name"
      />
    </View>
  );
}

const DestinationSelection = () => {
  return (
    <View style={styles.conteiner}>
      {eachDestination(true, "from")}
      <View style={styles.line}></View>
      {eachDestination(false, "to")}
    </View>
  );
};

export default DestinationSelection;

const styles = StyleSheet.create({
  conteiner: {
    justifyContent: "space-between",

    paddingVertical: 20,
    gap: 10,
    width: "100%",
    borderColor: "gray",
    borderWidth: 2,

    borderRadius: 20,
  },
  line: {
    marginTop: 15,
    marginLeft: 70,
    width: "70%",
    height: 2,
    backgroundColor: "gray",
  },
});
