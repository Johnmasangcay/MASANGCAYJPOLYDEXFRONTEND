import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image, FlatList } from 'react-native';
import UserContext from './Context/UserContext';
import loading from '../assets/loading.json'
import LottieView from 'lottie-react-native';
import { GetSelectedPokemonData, GetDmgTaken, EditedTeamByUser, GetSelectedAbility1, GetSelectedAbility2, GetFavPokemonByUser, GetUserTeam, UpdateFavPokemon, GetTeamByTeamID, UpdateSelectedPokemon, GetPokemonUsersData } from './Context/apiFetch';

export default function DashboardScreen({ navigation }) {
  let star = "★"
  let starThin = "☆"
  let hamburgerMenu = "☰"
  let test = []
  const [isloaded, setIsloaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleMove, setModalVisibleMove] = useState(false);
  const [moves, setMoves] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");
  const [defaultMove, setDefaultMove] = useState()
  const [defaultMoveDescription, setDefaultMoveDescription] = useState()
  const { condMove, setCondMove } = useContext(UserContext)
  const { routeForSelectedPokeToMove, setRouteForSelectedPokeToMove } = useContext(UserContext)
  const { selectedPokeToMove, setSelectedPokeToMove } = useContext(UserContext)
  const { selectedMove1, setSelectedMove1 } = useContext(UserContext)
  const { selectedMove2, setSelectedMove2 } = useContext(UserContext)
  const { selectedMove3, setSelectedMove3 } = useContext(UserContext)
  const { selectedMove4, setSelectedMove4 } = useContext(UserContext)
  const { forSelectedTV, setForSelectedTV } = useContext(UserContext)
  const { selectedPokemonTeamViewer } = useContext(UserContext)
  const { arr, setArr } = useContext(UserContext)
  const [getUserId, setGetUserId] = useState(0)
  const { currentUser } = useContext(UserContext)
  const { usersTeam, setUsersTeam } = useContext(UserContext);
  const { getPokeData, setGetPokeData } = useContext(UserContext);
  const { getPokeDataForCond, setGetPokeDataForCond } = useContext(UserContext);
  const { isloadedForSecCond, setIsloadedForSecCond } = useContext(UserContext)
  const { counter, setCounter } = useContext(UserContext)
  const { cond, setCond } = useContext(UserContext)
  const { cond2, setCond2 } = useContext(UserContext)
  const { cond3, setCond3 } = useContext(UserContext)
  const { cond4, setCond4 } = useContext(UserContext)
  const { selectedMoveFromMoves, setSelectedMoveFromMoves } = useContext(UserContext);


  const getPokemons = async () => {
    let resp = await fetch("https://pokeapi.co/api/v2/move/?offset=0&limit=30");
    let data = await resp.json();

    function getPokemonObjects(moveObject) {
      moveObject.forEach(async (move) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/move/${move.name}`)
        const data = await resp.json();
        setDefaultMove(data.name)
        setDefaultMoveDescription(data.effect_entries[0].effect)
        setMoves(currentArr => [...currentArr, data]);
      })
    }
    console.log(moves)
    getPokemonObjects(data.results)
  }

  const filterMove = moves.filter(poke => {
    return poke.name.toLowerCase().includes(pokeSearch.toLowerCase())
  })

  useEffect(() => {
    getPokemons()
    setGetUserId(currentUser[0].id)
    setTimeout(function () {
      setIsloaded(true)
    }, 3000)
  }, [])
  return (
    <>
      {!isloaded ?
        <View style={styles.loadingScreen}>
          {/* <LottieView
            style={styles.loadingScreen}
            source={loading}
            autoPlay loop
          /> */}
        </View>
        :
        <View style={styles.container}>
          <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
            <Text onPress={() => setModalVisible(true)} style={{ fontSize: 30 }}>{hamburgerMenu}</Text>
            <Text style={{ color: "black", paddingLeft: 20, fontSize: 30, fontWeight: "bold" }}>MoveDex</Text>
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
                      <Icon style={{ color: "gainsboro", paddingRight: 115 }} name='mobile' size={25} color="white" />
                      <Text style={styles.modalText}>POKEDEX</Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={() => {
                    navigation.navigate("MovesScreen")
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                      <Icon style={{ color: "gainsboro", paddingRight: 130 }} name='shield' size={25} color="white" />
                      <Text style={styles.modalText}>MOVES</Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={() => {
                    navigation.navigate("ItemsScreen")
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                      <Icon style={{ color: "gainsboro", paddingRight: 135 }} name='book' size={25} color="white" />
                      <Text style={styles.modalText}>ITEMS</Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={() => {
                    navigation.navigate("NatureScreen")
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                      <Icon style={{ color: "gainsboro", paddingRight: 125 }} name='book' size={25} color="white" />
                      <Text style={styles.modalText}>NATURE</Text>
                    </View>
                  </Pressable>

                  <Pressable onPress={async () => {
                    setUsersTeam(await GetUserTeam(getUserId))
                    navigation.navigate("TeambuilderScreen")
                    setModalVisible(!modalVisible)
                  }
                  }>
                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                      <Icon style={{ color: "gainsboro", paddingRight: 70 }} name='user' size={25} color="white" />
                      <Text style={styles.modalText}>TEAM BUILDER</Text>
                    </View>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
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
              forSelectedTV ?
                <FlatList
                  data={filterMove}
                  renderItem={({ item, i }) => {
                    return (

                      <Pressable key={i} style={({ pressed }) => [styles.btn, {
                        backgroundColor: pressed ? "blue" : "#EDF6E5",
                        opacity: pressed ? .5 : 1
                      }]} onPress={async () => {
                        if (condMove == "move1") {
                          await UpdateSelectedPokemon(getPokeData[0].id, getPokeData[0].userId, getPokeData[0].teamId, getPokeData[0].levels, getPokeData[0].pokemonName, getPokeData[0].heldItems, getPokeData[0].ability1, getPokeData[0].ability2, item.name, getPokeData[0].move2, getPokeData[0].move3, getPokeData[0].move4)
                          setSelectedMove1(item.name)
                          setCond("MovesToSelectedTV")
                          navigation.navigate("SelectedPokemonTV")
                        } else if (condMove == "move2") {
                          await UpdateSelectedPokemon(getPokeData[0].id, getPokeData[0].userId, getPokeData[0].teamId, getPokeData[0].levels, getPokeData[0].pokemonName, getPokeData[0].heldItems, getPokeData[0].ability1, getPokeData[0].ability2, getPokeData[0].move1, item.name, getPokeData[0].move3, getPokeData[0].move4)
                          setSelectedMove2(item.name)
                          setCond2("MovesToSelectedTV")
                          navigation.navigate("SelectedPokemonTV")
                        } else if (condMove == "move3") {
                          await UpdateSelectedPokemon(getPokeData[0].id, getPokeData[0].userId, getPokeData[0].teamId, getPokeData[0].levels, getPokeData[0].pokemonName, getPokeData[0].heldItems, getPokeData[0].ability1, getPokeData[0].ability2, getPokeData[0].move1, getPokeData[0].move2, item.name, getPokeData[0].move4)
                          setSelectedMove3(item.name)
                          setCond3("MovesToSelectedTV")
                          navigation.navigate("SelectedPokemonTV")
                        } else if (condMove == "move4") {
                          await UpdateSelectedPokemon(getPokeData[0].id, getPokeData[0].userId, getPokeData[0].teamId, getPokeData[0].levels, getPokeData[0].pokemonName, getPokeData[0].heldItems, getPokeData[0].ability1, getPokeData[0].ability2, getPokeData[0].move1, getPokeData[0].move2, getPokeData[0].move3, item.name)
                          setSelectedMove4(item.name)
                          setCond4("MovesToSelectedTV")
                          navigation.navigate("SelectedPokemonTV")
                        }
                      }}>
                        <View style={{ flexDirection: "column", alignSelf: "flex-start" }}>
                          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                            <Text style={[styles.txtstyleNAMEMove]}>{item.name}</Text>
                            <Text style={[styles.txtstylePower]}>{item.power}</Text>
                            <Text style={[styles.txtstylePP]}>{item.pp}</Text>
                            <Text style={[styles.txtstylePP]}>{item.accuracy}</Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.txtstyleTYPE, { width: 250 }]}>{item.type.name}</Text>
                            <Text style={[styles.txtstyleStatus, { width: 120 }]}>{item.damage_class.name}</Text>
                          </View>
                        </View>
                      </Pressable>

                    )
                  }}
                />
                :
                <FlatList
                  data={filterMove}
                  renderItem={({ item, n }) => {
                    return (

                      <Pressable key={n} style={({ pressed }) => [styles.btn, {
                        backgroundColor: pressed ? "blue" : "#EDF6E5",
                        opacity: pressed ? .5 : 1
                      }]} onPress={async () => {
                        setDefaultMove(item.name)
                        setDefaultMoveDescription(item.effect_entries[0].effect)
                        setModalVisibleMove(true)
                        console.log(item)
                      }}>
                        <View style={{ flexDirection: "column", alignSelf: "flex-start" }}>
                          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                            <Text style={[styles.txtstyleNAMEMove]}>{item.name}</Text>
                            <Text style={[styles.txtstylePower]}>{item.power}</Text>
                            <Text style={[styles.txtstylePP]}>{item.pp}</Text>
                            <Text style={[styles.txtstylePP]}>{item.accuracy}</Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.txtstyleTYPE, { width: 250 }]}>{item.type.name}</Text>
                            <Text style={[styles.txtstyleStatus, { width: 120 }]}>{item.damage_class.name}</Text>
                          </View>
                        </View>
                      </Pressable>

                    )
                  }}
                />
            }
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleMove}
                onRequestClose={() => {
                  setModalVisibleMove(!modalVisibleMove);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={[styles.modalTxtAbiltyTitle]}>{defaultMove}</Text>
                    <Text>{defaultMoveDescription}</Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisibleMove(!modalVisibleMove)}
                    >
                      <Text style={styles.textStyle}>CLOSE</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
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
    backgroundColor: "#9D9D9D",
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
  modalTxtAbiltyTitle: {
    color: "#323232",
    fontSize: 20,
    alignSelf: "center",
    marginVertical: 20,
    fontWeight: "bold"
  },
  modalText: {
    marginBottom: 25,
    textAlign: "left",
    fontSize: 20,
    color: "gainsboro",
    textTransform: 'capitalize',
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
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
    color: "#EEEEEE",
    fontWeight: "bold",
    textAlign: "center",
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
  },
  loadingScreen: {
    flex: 1
  }
});