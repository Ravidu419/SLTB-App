import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type DestinationSelectionProps = {
  selectedCitys: { from: string; to: string };
  setSelectedCitys: React.Dispatch<
    React.SetStateAction<{ from: string; to: string }>
  >;
};

const DestinationSelection: React.FC<DestinationSelectionProps> = ({
  selectedCitys,
  setSelectedCitys,
}) => {
  return (
    <View style={styles.conteiner}>
      <View
        style={{
          height: 50,
          width: "100%",
          paddingLeft: 70,
        }}
      >
        <Text style={{ textTransform: "capitalize", top: 5 }}>from</Text>
        <TextInput
          style={{
            fontSize: 24,
            fontWeight: "bold",
            borderBottomWidth: 0, // remove underline for iOS and Android
          }}
          underlineColorAndroid="transparent"
          placeholder="Type city name"
          value={selectedCitys.from}
          onChangeText={(text) =>
            setSelectedCitys((prev) => ({ ...prev, from: text }))
          }
        />
      </View>
      <View style={styles.line}></View>
      <View
        style={{
          height: 50,
          width: "100%",
          paddingLeft: 70,
        }}
      >
        <Text style={{ textTransform: "capitalize", top: 5 }}>to</Text>
        <TextInput
          style={{
            fontSize: 24,
            fontWeight: "bold",
            borderBottomWidth: 0, // remove underline for iOS and Android
          }}
          onChangeText={(text) =>
            setSelectedCitys((prev) => ({ ...prev, to: text }))
          }
          underlineColorAndroid="transparent"
          placeholder="Type city name"
          value={selectedCitys.to}
        />
      </View>
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
