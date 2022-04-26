import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import ProgressBar from 'react-native-progress/Bar';
import { GetSelectedPokemonData, GetDmgTaken, GetSelectedAbility1, GetSelectedAbility2, GetFavPokemonByUser, GetUserTeam, UpdateFavPokemon, GetPokemonUsersData } from './Context/apiFetch';

export default function SelectedPokemonTV({ navigation }) {

    const { isloaded, setIsloaded } = useContext(UserContext)
    const { isloadedForSecCond, setIsloadedForSecCond } = useContext(UserContext)
    const { cond, setCond } = useContext(UserContext)
    const { cond2, setCond2 } = useContext(UserContext)
    const { cond3, setCond3 } = useContext(UserContext)
    const { cond4, setCond4 } = useContext(UserContext)
    const { condForHeldItems, setCondForHeldItems } = useContext(UserContext)
    const { selectedPokemonTeamViewer, setSelectedPokemonTeamViewer } = useContext(UserContext)
    const { condMove, setCondMove } = useContext(UserContext)
    const { routeForSelectedPokeToMove, setRouteForSelectedPokeToMove } = useContext(UserContext)
    const { selectedPokeToMove, setSelectedPokeToMove } = useContext(UserContext)
    const { selectedMove1, setSelectedMove1 } = useContext(UserContext)
    const { selectedMove2, setSelectedMove2 } = useContext(UserContext)
    const { selectedMove3, setSelectedMove3 } = useContext(UserContext)
    const { selectedMove4, setSelectedMove4 } = useContext(UserContext)
    const { forSelectedTV, setForSelectedTV } = useContext(UserContext)
    const { getPokeData, setGetPokeData } = useContext(UserContext);
    const { selectedHeldItems, setSelectedHeldItems } = useContext(UserContext);

    useEffect(async () => {
        // window.location.reload(false); 
        console.log(getPokeData[0])
        setTimeout(function () {
            setIsloaded(true)
        }, 1000)
    }, [])

    return (
        <>
            {!isloaded ?
                <ActivityIndicator style={{ flex: 1, backgroundColor: "#FFFEEC" }} size={"large"} color={"blue"} />
                :
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View style={[styles.btn, { backgroundColor: "#628395" }]}>
                            <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                <Text style={[styles.txtstyleSelectedNAME, { marginTop: 40, position: "absolute" }]}>{selectedPokemonTeamViewer.name}</Text>
                                <Image
                                    source={{ uri: selectedPokemonTeamViewer.sprites.front_default }}
                                    style={{
                                        flex: .8,
                                        height: 120,
                                        width: 120,
                                        marginLeft: 220,
                                        Position: "relative"
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: "row", padding: 5 }}>
                                {
                                    selectedPokemonTeamViewer.types.map((pokeType, i) => {
                                        return (
                                            <Text key={i} style={[styles.txtstyleSelectedTYPE, { backgroundColor: "#EEEEEE", marginLeft: 40 }]}>{pokeType.type.name}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={[styles.containerBtn]}>
                            <View style={[styles.btn]}>
                                <View>
                                    <Text style={{ color: "black", fontSize: 20, alignSelf: "center", marginTop: 5, fontWeight: "bold" }}>MOVES</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                                            backgroundColor: pressed ? "blue" : "#EEEEEE",
                                            opacity: pressed ? .5 : 1
                                        }]} onPress={() => {
                                            setCondMove("move1")
                                            setSelectedPokeToMove(true)
                                            setForSelectedTV(true)
                                            navigation.navigate("MovesScreen")
                                        }
                                        }>
                                            <View>
                                                {
                                                    getPokeData[0].move1 === "" || getPokeData[0].move1 === null ?
                                                        <View>
                                                            <Text style={[styles.plusIcon]}>+</Text>
                                                        </View>
                                                        :
                                                        cond == "teamBToSelectedTV" ?
                                                            <Text style={[styles.pokeName]}>{getPokeData[0].move1}</Text>
                                                            :
                                                            <Text style={[styles.pokeName]}>{selectedMove1}</Text>
                                                }
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                                            backgroundColor: pressed ? "blue" : "#EEEEEE",
                                            opacity: pressed ? .5 : 1
                                        }]} onPress={() => {
                                            setCondMove("move2")
                                            setSelectedPokeToMove(true)
                                            setForSelectedTV(true)
                                            navigation.navigate("MovesScreen")
                                        }
                                        }>
                                            <View>
                                                {
                                                    getPokeData[0].move2 === null || getPokeData[0].move2 === "" ?
                                                        <View>
                                                            <Text style={[styles.plusIcon]}>+</Text>
                                                        </View>
                                                        :
                                                        cond2 == "teamBToSelectedTV2" ?
                                                            <Text style={[styles.pokeName]}>{getPokeData[0].move2}</Text>
                                                            :
                                                            <Text style={[styles.pokeName]}>{selectedMove2}</Text>
                                                }
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View>
                                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                                            backgroundColor: pressed ? "blue" : "#EEEEEE",
                                            opacity: pressed ? .5 : 1
                                        }]} onPress={() => {
                                            setCondMove("move3")
                                            setForSelectedTV(true)
                                            navigation.navigate("MovesScreen")
                                        }
                                        }>
                                            <View>
                                                {
                                                    getPokeData[0].move3 === "" || getPokeData[0].move3 === null ?
                                                        <View>
                                                            <Text style={[styles.plusIcon]}>+</Text>
                                                        </View>
                                                        :
                                                        cond3 == "teamBToSelectedTV3" ?
                                                            <Text style={[styles.pokeName]}>{getPokeData[0].move3}</Text>
                                                            :
                                                            <Text style={[styles.pokeName]}>{selectedMove3}</Text>
                                                }
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                                            backgroundColor: pressed ? "blue" : "#EEEEEE",
                                            opacity: pressed ? .5 : 1
                                        }]} onPress={() => {
                                            setCondMove("move4")
                                            setForSelectedTV(true)
                                            navigation.navigate("MovesScreen")
                                        }
                                        }>
                                            <View>
                                                {
                                                    getPokeData[0].move4 === "" || getPokeData[0].move4 === null ?
                                                        <View>
                                                            <Text style={[styles.plusIcon]}>+</Text>
                                                        </View>
                                                        :
                                                        cond4 == "teamBToSelectedTV4" ?
                                                            <Text style={[styles.pokeName]}>{getPokeData[0].move4}</Text> 
                                                            :
                                                            <Text style={[styles.pokeName]}>{selectedMove4}</Text>
                                                }
                                            </View>
                                        </Pressable>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ color: "black", fontSize: 10, alignSelf: "center", marginTop: 5 }}>Tap plus icon to Select</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.btnAbilities, { backgroundColor: "#D1D1D1", }]}>
                            <View>
                                <Text style={{ color: "black", fontSize: 20, alignSelf: "center", marginTop: 5, fontWeight: "bold" }}>ABILITIES</Text>
                            </View>
                            <View>
                                {
                                    selectedPokemonTeamViewer.abilities.map((pokeAbility, i) => {
                                        return (
                                            <Pressable key={i} style={({ pressed }) => { opacity: pressed ? .5 : 1 }}
                                                onPress={() => {
                                                    setCondMove("itemCond")
                                                    setForSelectedTV(true)
                                                    navigation.navigate("ItemScreen")
                                                }}>
                                                <Text style={styles.pokemonAbilitiesTxtHidden}>{pokeAbility.ability.name}</Text>
                                            </Pressable>
                                        )
                                    })
                                }
                            </View>
                        </View>

                        <View style={[styles.btnHeldItem, { backgroundColor: "#D1D1D1", }]}>
                            <View>
                                <Text style={{ color: "black", fontSize: 20, alignSelf: "center", marginTop: 5, fontWeight: "bold" }}>Held Item</Text>
                            </View>
                            <View>
                                <Pressable style={({ pressed }) => { opacity: pressed ? .5 : 1 }}
                                    onPress={async () => {
                                    }}>
                                    <View>
                                        {
                                            getPokeData[0].heldItems === "" || getPokeData[0].heldItems === null ?
                                                <View>
                                                    <Text style={styles.pokemonHeldItemTxtHidden}>+</Text>
                                                </View>
                                                :
                                                condForHeldItems == "teamBToSelectedTVHeldItems" ?
                                                    <Text style={[styles.pokeName]}>{getPokeData[0].heldItems}</Text>
                                                    :
                                                    <Text style={[styles.pokeName]}>{selectedHeldItems}</Text>
                                            }
                                    </View>
                                </Pressable>
                            </View>
                        </View>

                        

                        {/* <View style={[styles.btnHeldItem, { backgroundColor: "#D1D1D1", }]}>
                            <View>
                                <Text style={{ color: "black", fontSize: 20, alignSelf: "center", marginTop: 5, fontWeight: "bold" }}>Enter Level</Text>
                            </View>
                            <View>
                                <TextInput
                                    placeholder="Enter Mobile No."
                                    onChangeText={setMobileNumber}
                                    value={mobileNumber}
                                    keyboardType="number-pad"
                                    maxLength={12}
                                />
                            </View>
                        </View> */}
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
        backgroundColor: "#FFFEEC",
        marginTop: 30,
    },
    txtstyleSelectedNAME: {
        flex: 1,
        fontSize: 40,
        textTransform: 'capitalize',
        paddingLeft: 50,
        fontWeight: "bold",
        color: "#323232"
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
    baseStatContainer: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 10,
        height: 150,
    },
    btn: {
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 5,
        height: 180,
    },
    btnSelection: {
        marginHorizontal: 5,
        marginVertical: 5,
        height: 40,
        width: 155,
        borderRadius: 20,
        marginLeft: 20
    },
    plusIcon: {
        fontSize: 40,
        color: "#AAAAAA",
        alignSelf: "center",
    },
    pokeName: {
        fontSize: 20,
        textTransform: 'capitalize',
        fontWeight: "bold",
        alignSelf: "center",
    },
    containerBtn: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        backgroundColor: "#D1D1D1",
        flexDirection: "row",
        height: 160,
        marginTop: 30
    },
    btnAbilities: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginTop: 10,
        height: 140,
    },
    btnHeldItem: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginTop: 20,
        height: 100,
    },
    btnNotes: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginTop: 20,
        height: 150,
    },
    btnSaveChanges: {
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginBottom: 50,
        marginLeft: 300,
        height: 70,
        width: 80
    },
    pokemonAbilitiesTxtHidden: {
        backgroundColor: "#EEEEEE",
        paddingHorizontal: 150,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 20,
        fontSize: 15,
        textAlign: "center",
        textTransform: 'capitalize',
    },
    pokemonHeldItemTxtHidden: {
        backgroundColor: "#EEEEEE",
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 20,
        fontSize: 15,
        textAlign: "center",
        textTransform: 'capitalize',
        width: 200,
        alignSelf: "center"
    },
    saveTxt: {
        alignSelf: "center",
        fontSize: 20,
        marginTop: 15
    },
    input: {
        padding: 10,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: '#EEEEEE',
    },
})