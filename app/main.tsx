import Button from "@/components/ui/Button";
import DestinationSelection from "@/components/ui/DestinationSelection";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const img1 = require("@/assets/SLTB_Pic/img1.png");

const Main = () => {
  const [selectedCities, setSelectedCities] = useState<{
    from: string;
    to: string;
  }>({ from: "", to: "" });

  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pictureContainerSection}>
          <Image source={img1} style={styles.image} />
        </View>
        <View style={styles.bottomBox}>
          <Text style={{ color: "black", fontSize: 28, fontWeight: "bold" }}>
            Search for Bus
          </Text>
          <View style={{ marginTop: 30, width: "100%" }}>
            <DestinationSelection
              selectedCitys={selectedCities}
              setSelectedCitys={setSelectedCities}
            />
          </View>
          <Pressable
            onPress={() => {
              router.push("/mapWithBusList");
            }}
            style={{ marginTop: 90, width: "100%" }}
          >
            <Button text="Search" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#84003A",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBox: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: "65%",
    backgroundColor: "#fff",
  },
  pictureContainerSection: {
    justifyContent: "flex-end",
    alignItems: "center",

    height: "35%",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 2,
  },
  dogText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
});
