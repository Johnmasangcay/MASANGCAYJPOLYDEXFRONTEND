import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'
import UserContext from './Context/UserContext';
import { GetSelectedAbility } from './Context/apiFetch';

export default function PokemonInfoScreen({ navigation }) {

  const { selectedPokemon } = useContext(UserContext)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState()

  useEffect(() => {
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
        <Text style={{ color: "black", paddingLeft: 5, fontSize: 20, fontWeight: "bold" }}>Pokemon Info</Text>
        <Text onPress={() => navigation.navigate("DashboardScreen")} style={{ fontSize: 20, paddingLeft: 240 }}>Back</Text>
      </View>
      {/* //-------------------------------PokemonInfo------------------------------------------------------- */}
      <View style={[styles.btn, { backgroundColor: "#323232" }]}>
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          <Text style={[styles.txtstyleSelectedNAME, { marginTop: 40 }]}>{selectedPokemon.name}</Text>
          <Image
            source={{ uri: selectedPokemon.sprites.front_default }}
            style={{
              flex: .8,
              height: 120,
              width: 120,
              marginLeft: 20
            }}
          />
        </View>
        <View style={{ flexDirection: "row", padding: 5 }}>
          {
            selectedPokemon.types.map((pokeType) => {
              return (
                <>
                  <Text style={[styles.txtstyleSelectedTYPE, { backgroundColor: "#EEEEEE", marginLeft: 40 }]}>{pokeType.type.name}</Text>
                </>
              )
            })
          }
        </View>
      </View>

      {/* //----------------------------ABILITIES----------------------------------------------------------------- */}
      <ScrollView>
        <View>
          <Text style={{ color: "black", fontSize: 20, alignSelf: "center", marginTop: 30, fontWeight: "bold" }}>ABILITIES</Text>
        </View>
        <View style={[styles.btnAbilities, { backgroundColor: "#323232" }]}>
          <View>
            {
              selectedPokemon.abilities.map((pokeAbility) => {
                return (
                  <>
                    <Pressable style={({ pressed }) => { opacity: pressed ? .5 : 1 }}
                      onPress={async () => {
                        setSelectedAbility(await GetSelectedAbility(pokeAbility.ability.name))
                      }}>
                      <Text style={styles.pokemonAbilitiesTxtHidden}>{pokeAbility.ability.name}</Text>
                    </Pressable>
                  </>
                )
              })
            }
          </View>
        </View>

        {/* //----------------------------MOVES----------------------------------------------------------------- */}
        <View>
          <Text style={{ color: "black", fontSize: 20, alignSelf: "center", marginTop: 30, fontWeight: "bold" }}>MOVES</Text>
        </View>
        <View style={[styles.btnMoves, { backgroundColor: "#323232" }]}>
          <ScrollView>
            {
              selectedPokemon.moves.map((pokeMoves) => {
                return (
                  <>
                      <Pressable>
                        <Text style={styles.pokemonMovesTxt}>{pokeMoves.move.name}</Text>
                      </Pressable>
                  </>
                )
              })
            }
          </ScrollView>
        </View>
      </ScrollView>
    </View>
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
  btn: {
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    height: 180,
  },
  btnAbilities: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    height: 120,
  },
  btnMoves: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    height: 150
  },
  pokemonAbilitiesTxt: {
    backgroundColor: "#EEEEEE",
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    fontSize: 15,
    textAlign: "center",
  },
  pokemonAbilitiesTxtHidden: {
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 155,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 20,
    fontSize: 15,
    textAlign: "center",
  },
  pokemonMovesTxt: {
    backgroundColor: "#EEEEEE",
    paddingVertical: 10,
    paddingHorizontal: 160,
    marginTop: 10,
    borderRadius: 20,
    fontSize: 15,
    textAlign: "center",
    height: 40
  },
  txtstyleSelectedTYPE: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: 'capitalize',
    borderRadius: 50,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20
  },
  txtstyleSelectedNAME: {
    flex: 1,
    fontSize: 40,
    textTransform: 'capitalize',
    paddingLeft: 50,
    fontWeight: "bold",
    color: "#EFEFEF"
  },
})