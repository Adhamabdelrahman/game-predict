import { Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useContext, useState } from "react";
import { PlayersContext } from "../contexts/players";
import Player from "@/components/Player";
import { router } from "expo-router";

export default function MatchTab() {
  const { mathces, setMatches, players, selectedPlayers, setSelectedPlayers } =
    useContext(PlayersContext);
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>👾 Lets Fight! 👾</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <View style={styles.players}>
          {players.map((el: any) => (
            <Pressable
              onPress={() => {
                if (
                  selectedPlayers.length < 2 &&
                  selectedPlayers.indexOf(el) == -1
                ) {
                  setSelectedPlayers([...selectedPlayers, el]);
                  alert(JSON.stringify(selectedPlayers));
                } else {
                  if (selectedPlayers.indexOf(el) == 0) {
                    if (selectedPlayers[1])
                      setSelectedPlayers([selectedPlayers[1]]);
                  } else if (selectedPlayers.indexOf(el) == 1) {
                    if (selectedPlayers[0])
                      setSelectedPlayers([selectedPlayers[0]]);
                  }
                }
                console.log(selectedPlayers);
              }}
            >
              <Player
                image={el.image}
                name={el.name}
                isSelected={
                  selectedPlayers.indexOf(el) == 1 ||
                  selectedPlayers.indexOf(el) == 0
                    ? true
                    : false
                }
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {selectedPlayers.length == 2 && (
        <Pressable
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: "rgba(255, 82, 82,1.0)",
            borderRadius: 8,
            position: "absolute",
            width: "100%",
            bottom: 20,
          }}
          onPress={() => router.push("/fightModal")}
        >
          <Text style={{ textAlign: "center" }}>Fight 🥊</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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
    width: "100%",
    padding: 30,
    flexDirection: "row",
    gap: 11,
    flexWrap: "wrap",
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
  },
});
