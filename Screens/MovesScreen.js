import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import { GetSelectedPokemonData, GetDmgTaken, GetSelectedAbility1, GetSelectedAbility2 } from './Context/apiFetch';

export default function DashboardScreen({ navigation }) {
  let star = "★"
  let starThin = "☆"
  let hamburgerMenu = "☰"
  const [isloaded, setIsloaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavPokemon, setIsFavPokemon] = useState(false);
  const [moves, setMoves] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");
  const { selectedPokemon, setSelectedPokemon } = useContext(UserContext);
  const { selectedPokemonType, setSelectedPokemonType } = useContext(UserContext);
  const { selectedPokemonAbility1, setSelectedPokemonAbility1 } = useContext(UserContext);
  const { selectedPokemonAbility2, setSelectedPokemonAbility2 } = useContext(UserContext);


  const getPokemons = async () => {
    let resp = await fetch("https://pokeapi.co/api/v2/move/?offset=0&limit=50");
    let data = await resp.json();

    function getPokemonObjects(pokeObject) {
      data.results.map(async (move) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/move/${move.name}`)
        const data = await resp.json();
        setMoves(currentArr => [...currentArr, data]);
      })
    }

    getPokemonObjects(data)
  }

  const filterMove = moves.filter(poke => {
    return poke.name.toLowerCase().includes(pokeSearch.toLowerCase())
  })

  useEffect(() => {
    getPokemons()
    setTimeout(function () {
      setIsloaded(true)
    }, 5000)
  }, [])
  return (
    <>
      {!isloaded ?
        <ActivityIndicator style={{ flex: 1, backgroundColor: "#FFFEEC" }} size={"large"} color={"blue"} />
        :
        <View style={styles.container}>
          <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
            <Text onPress={() => setModalVisible(true)} style={{ fontSize: 30 }}>{hamburgerMenu}</Text>
            <Text style={{ color: "black", paddingLeft: 20, fontSize: 30, fontWeight: "bold" }}>MoveDex</Text>
            <Text onPress={() => navigation.navigate("FavoritePokemonScreen")} style={{ fontSize: 30, paddingLeft: 210 }}>{star}</Text>
          </View>
          <View>
            <TextInput
              placeholder="🔍 What Pokemon Are You Looking For?"
              style={styles.input}
              onChangeText={setPokeSearch}
            />
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "#FFFEEC" }}>
            <Text style={{ paddingLeft: 45, marginTop: 5 }}>Move</Text>
            <Text style={{ paddingLeft: 170, marginTop: 5 }}>Power</Text>
            <Text style={{ paddingLeft: 30, marginTop: 5 }}>PP</Text>
            <Text style={{ paddingLeft: 30, marginTop: 5 }}>Acc</Text>
          </View>

          <ScrollView style={{ paddingBottom: 20 }}>
            {
              filterMove.map((moveData, keyx) => {
                return (
                  <>
                    <Pressable style={({ pressed }) => [styles.btn, {
                      backgroundColor: pressed ? "blue" : "#EDF6E5",
                      opacity: pressed ? .5 : 1
                    }]} onPress={async () => {
                      console.log(moveData)
                    }}>
                      <View style={{ flexDirection: "column", alignSelf: "flex-start" }}>
                        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                          <Text style={[styles.txtstyleNAMEMove]}>{moveData.name}</Text>
                          <Text style={[styles.txtstylePower]}>{moveData.power}</Text>
                          <Text style={[styles.txtstylePP]}>{moveData.pp}</Text>
                          <Text style={[styles.txtstylePP]}>{moveData.accuracy}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={[styles.txtstyleTYPE, { width: 250 }]}>{moveData.type.name}</Text>
                          <Text style={[styles.txtstyleStatus, { width: 120 }]}>{moveData.damage_class.name}</Text>
                        </View>
                      </View>
                    </Pressable>
                  </>
                )
              })
            }
          </ScrollView>
        </View>
      }
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    backgroundColor: "#FFFEEC"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "dimgrey",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 25,
    textAlign: "left",
    fontSize: 20,
    color: "gainsboro"
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  btn: {
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    height: 80
  },
  btnSearch: {
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  txtstyleID: {
    fontSize: 15,
    alignSelf: "flex-start",
    paddingLeft: 20
  },
  txtstyleNAMEMove: {
    flex: 1,
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: "bold",
    color: "#233142",
    paddingLeft: 10
  },
  txtstylePower: {
    fontSize: 15,
    color: "#233142",
    paddingRight: 40
  },
  txtstylePP: {
    fontSize: 15,
    color: "#233142",
    paddingRight: 25
  },
  txtstyleTYPE: {
    fontSize: 20,
    color: "#FFFEEC",
    backgroundColor: "#494953",
    textTransform: 'capitalize',
    marginBottom: 5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingLeft: 95
  },
  txtstyleStatus: {
    fontSize: 20,
    color: "#FFFEEC",
    backgroundColor: "#494953",
    textTransform: 'capitalize',
    marginBottom: 5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingLeft: 26
  },
  input: {
    padding: 10,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
  }
});