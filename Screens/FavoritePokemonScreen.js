import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image, StatusBar } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'
import ProgressBar from 'react-native-progress/Bar';
import UserContext from './Context/UserContext';
import { GetSelectedPokemonData, GetDmgTaken, GetSelectedAbility1, GetSelectedAbility2, GetFavPokemonByUser, GetUserTeam, UpdateFavPokemon } from './Context/apiFetch';

export default function FavoritePokemonScreen({ navigation }) {
  let star = "★"
  const { usersFavData, setUsersFavData } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);
  const [getUserId, setGetUserId] = useState(0)
  const { currentUser } = useContext(UserContext)

  const getFavPokemon = async () => {
    Object.keys(usersFavData).forEach(async (pokemon) => {
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      const data = await resp.json();
      setPokemons(currentArr => [...currentArr, data])
    })
  }

  useEffect(async () => {
    getFavPokemon()
    setGetUserId(currentUser[0].id)
    console.log(usersFavData)
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
        <Text style={{ color: "black", paddingLeft: 5, fontSize: 20, fontWeight: "bold" }}>Favorite Pokemon</Text>
        <Text onPress={() => navigation.navigate("DashboardScreen")} style={{ fontSize: 20, paddingLeft: 200, color: "#494953" }}>Back</Text>
      </View>

      <ScrollView>
        {
          pokemons.map((pokemon) => {
            return (
              <>
                <Pressable style={({ pressed }) => [styles.btn, {
                  backgroundColor: pressed ? "blue" : "#EDF6E5",
                  opacity: pressed ? .5 : 1
                }]} onPress={async () => {
                  navigation.navigate("PokemonInfoScreen")
                }}>
                  <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                    <Text style={styles.txtstyleID}>#{pokemon.id}</Text>
                    <Text style={[styles.txtstyleNAME]}>{pokemon.name}</Text>
                    <Pressable style={({ pressed }) => [{
                      backgroundColor: pressed ? "blue" : "#EDF6E5",
                      opacity: pressed ? .5 : 1
                    }]} onPress={async () => {
                      setUsersFavData(await GetFavPokemonByUser(getUserId, pokemon.name))
                      Alert.alert("You unfavorited " + pokemon.name + " from favorite")
                    }}>
                      <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                        <Text style={{ fontSize: 40, paddingLeft: 10 }}>{star}</Text>
                      </View>
                    </Pressable>
                  </View>
                  <View style={styles.txtstyleIMAGE}>
                    <Image
                      source={{ uri: pokemon.sprites.front_default }}
                      style={{
                        height: 100,
                        width: 100,
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", padding: 5 }}>
                    {
                      pokemon.types.map((pokeType, f) => {

                        return (
                          
                            <Text key={f} style={[styles.txtstyleTYPE, { backgroundColor: "#D1D1D1" }]}>{pokeType.type.name}</Text>
                          
                        )
                      })
                    }
                  </View>
                </Pressable>
              </>
            )
          })
        }
      </ScrollView>

    </SafeAreaView>
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
      height: 150
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
  txtstyleNAME: {
      flex: 1,
      fontSize: 30,
      textTransform: 'capitalize',
      paddingLeft: 40,
      fontWeight: "bold",
      color: "#233142",
  },
  txtstyleIMAGE: {
      flex: 1,
      paddingLeft: 300,
  },
  txtstyleTYPE: {
      fontSize: 25,
      fontWeight: "bold",
      textTransform: 'capitalize',
      marginVertical: 20,
      marginRight: 50,
      shadowColor: '#171717',
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      borderRadius: 20,
      paddingHorizontal: 10
  },
  input: {
      padding: 10,
      paddingVertical: 20,
      borderRadius: 20,
      backgroundColor: '#EEEEEE',
  }
});