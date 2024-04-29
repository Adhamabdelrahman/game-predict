import { Button, Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useContext, useState } from "react";
import { router } from "expo-router";
import { PlayersContext } from "../contexts/players";
import Player from "@/components/Player";

export default function AddPlayersScreen() {
  const { players } = useContext(PlayersContext);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚀 Players</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Pressable
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "green",
          borderRadius: 8,
        }}
        onPress={() => router.push("/modal")}
      >
        <Text style={{ textAlign: "center" }}>Add Player</Text>
      </Pressable>

      <View style={styles.players}>
        {players.map((el: any) => (
          <Player image={el.image} name={el.name} isSelected={false} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100 %",
  },
  players: {
    display: "flex",
    width: "100%",
    padding: 30,
    flexDirection: "row",
    gap: 11,
    flexWrap: "wrap",
  },
});
