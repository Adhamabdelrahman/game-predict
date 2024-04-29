import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, TextInput } from "react-native";
import { Camera, CameraType } from "expo-camera";

import { Text, View } from "@/components/Themed";
import ImagePickerExample from "@/components/ImagepPicker";
import { useContext, useState } from "react";
import { router } from "expo-router";
import { PlayersContext } from "./contexts/players";
import Player from "@/components/Player";

export default function FightModal() {
  const [image, setImage] = useState<null | string>(null);
  const [name, setName] = useState<string>("");
  const {
    players,
    setPlayers,
    selectedPlayers,
    setSelectedPlayers,
    matches,
    setMatches,
  } = useContext(PlayersContext);

  const handleAddingNewPlayer = function () {
    const newPlayers = [
      ...players,
      {
        name,
        image,
      },
    ];
    setPlayers(newPlayers);
    router.push("../");
  };
  return (
    <View style={styles.container}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <View style={styles.container}>
        <Text style={styles.title}>👾 Who won? 👾</Text>
      </View>
      <View style={styles.players}>
        {selectedPlayers.map((player: any, i: number) => (
          <>
            {i == 1 ? (
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 20,
                }}
              >
                vs
              </Text>
            ) : null}
            <Pressable
              onPress={() => {
                const updatedMatches = [...matches];
                updatedMatches.push([
                  selectedPlayers.map((el: any) => el.id),
                  [player.id],
                ]);
                setMatches(updatedMatches);
                setSelectedPlayers([]);
                router.back();
              }}
            >
              <Player
                name={player.name}
                image={player.image}
                isSelected={false}
              ></Player>
            </Pressable>
          </>
        ))}
      </View>
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
  },
});
