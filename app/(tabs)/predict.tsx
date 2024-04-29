import { Pressable, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useContext, useState } from "react";
import { PlayersContext } from "../contexts/players";
import Player from "@/components/Player";
import { router } from "expo-router";

export default function PredictTab() {
  const {
    mathces,
    setMatches,
    players,
    selectedPlayersForPrediction,
    setSelectedPlayersForPrediction,
  } = useContext(PlayersContext);
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>🔮 Lets Predict! 🔮</Text>
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
                  selectedPlayersForPrediction.length < 2 &&
                  selectedPlayersForPrediction.indexOf(el.id) == -1
                ) {
                  setSelectedPlayersForPrediction([
                    ...selectedPlayersForPrediction,
                    el.id,
                  ]);
                  alert(JSON.stringify(selectedPlayersForPrediction));
                } else {
                  if (selectedPlayersForPrediction.indexOf(el.id) == 0) {
                    if (selectedPlayersForPrediction[1])
                      setSelectedPlayersForPrediction([
                        selectedPlayersForPrediction[1],
                      ]);
                  } else if (selectedPlayersForPrediction.indexOf(el.id) == 1) {
                    if (selectedPlayersForPrediction[0])
                      setSelectedPlayersForPrediction([
                        selectedPlayersForPrediction[0],
                      ]);
                  }
                }
                console.log(selectedPlayersForPrediction);
              }}
            >
              <Player
                image={el.image}
                name={el.name}
                isSelected={
                  selectedPlayersForPrediction.indexOf(el.id) == 1 ||
                  selectedPlayersForPrediction.indexOf(el.id) == 0
                    ? true
                    : false
                }
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {selectedPlayersForPrediction.length == 2 && (
        <Pressable
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: "rgba(64, 64, 122,1.0)",
            borderRadius: 8,
            position: "absolute",
            width: "100%",
            bottom: 20,
          }}
          onPress={() => {
            axios
              .post("http://localhost:3000/predict", {
                matches: mathces,
                playersToPredict: selectedPlayersForPrediction,
              })
              .then((response) => {
                router.push({
                  pathname: "/winnerModal",
                  params: {
                    winner_id: 0,
                    winning_percentage: 70,
                  },
                });
                setSelectedPlayersForPrediction([]);
              })
              .catch((error) => {
                alert(error);
              });
          }}
        >
          <Text style={{ textAlign: "center" }}>Predict 🔮</Text>
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
