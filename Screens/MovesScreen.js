import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'

export default function MovesScreen() {

  const [moves, setMoves] = useState([]);
  const [movesSearch, setMovesSearch] = useState("");

  const getAllMoves = async () => {
    let resp = await fetch("https://pokeapi.co/api/v2/move/?offset=0&limit=5");
    let data = await resp.json();
    

  }

  // const filterMoves = moves.filter(move => {
  //   return move.name.toLowerCase().includes(movesSearch.toLowerCase())
  // })

  useEffect(() => {
    getAllMoves()
  })

  return (
    <View>
      <Text>MovesScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
