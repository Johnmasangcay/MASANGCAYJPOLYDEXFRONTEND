import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import { GetSelectedPokemonData, GetDmgTaken, GetAllPokemonDataFromBackEnd, GetUserPokeData } from './Context/apiFetch';
import loading from '../assets/loading.json'
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import {
  DancingScript_500Medium,
  DancingScript_600SemiBold,
  DancingScript_700Bold
} from '@expo-google-fonts/dancing-script'
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_300Light_Italic,
} from '@expo-google-fonts/montserrat'

export default function TeamBuilderScreen({ navigation }) {
  let hamburgerMenu = "☰"
  const [modalVisible, setModalVisible] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [pokemons2, setPokemons2] = useState([]);
  const [UsersTeamName, setUsersTeamName] = useState();
  const [isloaded, setIsloaded] = useState(false);
  const { usersTeam } = useContext(UserContext);
  const { selectedTeam, setSelectedTeam } = useContext(UserContext);
  const { selectedPokemonType, setSelectedPokemonType } = useContext(UserContext);
  const { teamPokemon2Type, setTeamPokemon2Type } = useContext(UserContext);
  const { teamPokemon3Type, setTeamPokemon3Type } = useState(UserContext);
  const { teamPokemon4Type, setTeamPokemon4Type } = useState(UserContext);
  const { teamPokemon5Type, setTeamPokemon5Type } = useState(UserContext);
  const { teamPokemon6Type, setTeamPokemon6Type } = useState(UserContext);
  const { teamData, setTeamData } = useContext(UserContext);
  let [fontsLoaded] = useFonts({
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_300Light_Italic,
  });


  const getPokeInfo = async () => {
    let test = []
    usersTeam.map(async (poke, i) => {
      console.log(poke.id)
      let pokemon = Object.entries(poke).map(x => {
        return x[1]
      }).filter((y, i) => {
        if (i > 2) {
          return y;
        }
      })

      let pokemonDataArr = [];
      pokemon.map(async (n, i) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon[i]}`)
        const data = await resp.json();
        pokemonDataArr.push({ ...data, "teamId": poke.id, "teamName": poke.teamname, "userId": poke.userId })
      })
      test.push(pokemonDataArr)
    })
    setPokemons([...test])
    console.log(test)
  }

  useEffect(async () => {
    getPokeInfo()
    setTimeout(function () {
      setIsloaded(true)
    }, 3000)
  }, [])

  return (
    <>
      {!isloaded ?
        <View style={styles.loadingScreen}>
          <LottieView
            style={styles.loadingScreen}
            source={loading}
            autoPlay loop
          />
        </View>
        :
        <SafeAreaView style={styles.container}>
          <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "black", padding: 9 }}>
            <Text onPress={() => setModalVisible(true)} style={{ fontSize: 30 }}>{hamburgerMenu}</Text>
            <Text style={{ color: "black", paddingLeft: 20, fontSize: 30, fontFamily: "DancingScript_600SemiBold" }}>TeamBuilder</Text>
            <Text onPress={() => navigation.navigate("CreateTeamScreen")} style={{ color: "black", paddingLeft: 180, fontSize: 30 }}>+</Text>
          </View>

          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable onPress={() => {
                    navigation.navigate("DashboardScreen")
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                      <Icon style={{ color: "black", paddingRight: 100 }} name='mobile' size={25} color="white" />
                      <Text style={styles.modalText}>POKEDEX</Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={() => {
                    navigation.navigate("MovesScreen")
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                      <Icon style={{ color: "black", paddingRight: 115 }} name='shield' size={25} color="white" />
                      <Text style={styles.modalText}>MOVES</Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={() => {
                    navigation.navigate("ItemsScreen")
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                      <Icon style={{ color: "black", paddingRight: 125 }} name='book' size={25} color="white" />
                      <Text style={styles.modalText}>ITEMS</Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={() => {
                    navigation.navigate("NatureScreen")
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                      <Icon style={{ color: "black", paddingRight: 125 }} name='book' size={25} color="white" />
                      <Text style={styles.modalText}>NATURE</Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={() => {
                    navigation.navigate("TeambuilderScreen")
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                      <Icon style={{ color: "black", paddingRight: 65 }} name='user' size={25} color="white" />
                      <Text style={styles.modalText}>TEAM BUILDER</Text>
                    </View>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>


          <ScrollView>
            {
              pokemons.map((pokemon, i) => {
                return (
                  <View key={i} style={[styles.btn]}>
                    <SafeAreaView>
                      <Pressable style={({ pressed }) => [styles.btnSelection, {
                        opacity: pressed ? .5 : 1
                      }]} onPress={async () => {
                        setSelectedTeam(pokemon)
                        setSelectedPokemonType(await GetDmgTaken(pokemon[0].types[0].type.name))
                        setTeamData(await GetUserPokeData(pokemon[0].teamId))
                        navigation.navigate("TeamViewer")
                      }}>
                        {
                          pokemon.map((poke, n) => {
                            return (

                              <SafeAreaView key={n}>
                                <SafeAreaView style={[styles.imgStyle]}>
                                  <Image
                                    source={{ uri: poke.sprites.front_default }}
                                    style={{
                                      height: 100,
                                      width: 100,
                                    }}
                                  />
                                </SafeAreaView>
                                <Text style={[styles.pokeName]}>{poke.name}</Text>
                              </SafeAreaView>

                            )
                          })
                        }
                      </Pressable>
                    </SafeAreaView>
                  </View>

                )
              })
            }
          </ScrollView>
        </SafeAreaView>
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
  btn: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#E78EA9',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    height: 360,
    backgroundColor: "#F1DDBF",
    flexDirection: "row",
    maxWidth: 460
  },
  teamNameStyle: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center"
  },
  btnSelection: {
    flex: 1,
    flexWrap: "wrap",
    marginHorizontal: 5,
    marginVertical: 10,
    height: 130,
    width: 215,
    justifyContent: "space-around",
    paddingLeft: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F1DDBF",
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
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  imgStyle: {
    paddingLeft: 10,
  },
  pokeName: {
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: "bold",
    alignSelf: "center",
    height: 48,
  },
  modalText: {
    marginBottom: 25,
    textAlign: "left",
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  loadingScreen: {
    flex: 1
  }
});