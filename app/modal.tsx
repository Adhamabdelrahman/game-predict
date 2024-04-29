import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, TextInput } from "react-native";
import { Camera, CameraType } from "expo-camera";

import { Text, View } from "@/components/Themed";
import ImagePickerExample from "@/components/ImagepPicker";
import { useContext, useState } from "react";
import { router } from "expo-router";
import { PlayersContext } from "./contexts/players";

export default function ModalScreen() {
  const [image, setImage] = useState<null | string>(null);
  const [name, setName] = useState<string>("");
  const { players, setPlayers } = useContext(PlayersContext);

  const handleAddingNewPlayer = function () {
    const newPlayers = [
      ...players,
      {
        name,
        image,
        id: players.length,
      },
    ];
    setPlayers(newPlayers);
    router.push("../");
  };
  return (
    <View style={styles.container}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <TextInput
        placeholder="Enter player's name"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          paddingHorizontal: 10,
          paddingVertical: 8,
          color: "white",
          fontSize: 24,
          fontWeight: "200",
          width: 240,
          alignSelf: "center",
        }}
        placeholderTextColor="white"
        onChangeText={(e) => setName(e)}
      />
      <ImagePickerExample image={image} setImage={setImage} />
      <Pressable
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor:
            name.length == 0 || !image ? "rgba(75, 101, 132,1.0)" : "green",
          borderRadius: 8,
          width: 100,
          alignItems: "center",
          display: "flex",
        }}
        disabled={name.length == 0 || !image}
        onPress={() => handleAddingNewPlayer()}
      >
        <Text
          style={{
            color:
              name.length == 0 || !image
                ? "rgba(165, 177, 194,1.0)"
                : "rgba(50, 255, 126,1.0)",
          }}
        >
          Add Player
        </Text>
      </Pressable>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    gap: 16,
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
