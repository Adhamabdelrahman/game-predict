import { View, Text } from "react-native";
import { createContext, useState } from "react";
import React from "react";
const PlayersContext = createContext<null | any>(null);

function PlayersProvidor({ children }: { children: any }) {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedPlayersForPrediction, setSelectedPlayersForPrediction] =
    useState<string[]>([]);
  return (
    <PlayersContext.Provider
      value={{
        players,
        setPlayers,
        matches,
        setMatches,
        selectedPlayers,
        setSelectedPlayers,
        selectedPlayersForPrediction,
        setSelectedPlayersForPrediction,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export { PlayersContext, PlayersProvidor };
