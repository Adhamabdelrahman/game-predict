import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, TextInput } from "react-native";
import { Camera, CameraType } from "expo-camera";

import { Text, View } from "@/components/Themed";
import ImagePickerExample from "@/components/ImagepPicker";
import { useContext, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { PlayersContext } from "./contexts/players";
import Player from "@/components/Player";

export default function FightModal() {
  const { players } = useContext(PlayersContext);
  const params = useLocalSearchParams();
  const { winner_id, winning_percentage } = params;
  let winnerData = {};

  for (let i = 0; i < players.length; i++) {
    if (winner_id == players[i].id) {
      winnerData = players[i];
      break;
    }
  }
  return (
    <View style={styles.container}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <View style={styles.container}>
        <Text style={styles.title}>👑 WE GOT A WINNER!!! 👑</Text>
      </View>
      <View style={styles.players}>
        <Player
          name={(winnerData as any).name}
          image={(winnerData as any).image}
          isSelected={false}
        ></Player>
      </View>
      <Text style={styles.text}>{winning_percentage}%</Text>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    gap: 30,
    display: "flex",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
  players: {
    display: "flex",
    gap: 30,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10%",
  },
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
    textAlign: "center",
  },
});
