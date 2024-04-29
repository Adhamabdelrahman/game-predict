import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function Player({
  image,
  name,
  isSelected = false,
}: {
  image: string;
  name: string;
  isSelected: boolean;
}) {
  return (
    <View style={styles.player}>
      <Image
        source={{ uri: image }}
        width={80}
        height={80}
        style={styles.image}
      ></Image>
      <Text style={styles.text}>
        {name} {isSelected ? "📍" : null}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  player: {
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  image: {
    borderRadius: 99,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
