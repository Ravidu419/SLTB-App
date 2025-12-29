import React from "react";
import { Text, View } from "react-native";

const Button = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        backgroundColor: "#84003A",
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 100,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
        {text}
      </Text>
    </View>
  );
};

export default Button;
