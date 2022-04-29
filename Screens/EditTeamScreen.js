import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import ProgressBar from 'react-native-progress/Bar';
import { GetSelectedPokemonData, GetDmgTaken, GetSelectedAbility1, GetSelectedAbility2, GetFavPokemonByUser, GetUserTeam, UpdateFavPokemon, DeleteUsersTeam, EditedTeamByUser, GetUserLastAddedTeam } from './Context/apiFetch';

export default function EditTeamScreen({ navigation }) {

    const { selectedTeam } = useContext(UserContext);
    const { route, setRoute } = useContext(UserContext);
    const { createTeamToDash, setCreateTeamToDash } = useContext(UserContext);
    const { condPokemon, setCondPokemon } = useContext(UserContext);
    const { selectedPokemon, setSelectedPokemon } = useContext(UserContext)
    const { selectedPokemon2, setSelectedPokemon2 } = useContext(UserContext)
    const { selectedPokemon3, setSelectedPokemon3 } = useContext(UserContext);
    const { selectedPokemon4, setSelectedPokemon4 } = useContext(UserContext);
    const { selectedPokemon5, setSelectedPokemon5 } = useContext(UserContext);
    const { selectedPokemon6, setSelectedPokemon6 } = useContext(UserContext);

    useEffect(async () => {
        console.log(selectedPokemon)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={[styles.btn]}>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]} onPress={() => {
                                setCondPokemon("poke1")
                                setRoute("EditTeamScreen")
                                setCreateTeamToDash(true)
                                navigation.navigate("DashboardScreen")
                            }
                            }>
                                <View>
                                    {
                                        selectedPokemon.sprites.front_default === undefined ?
                                            <Text style={[styles.plusIcon]}>+</Text>
                                            :
                                            <>
                                                <View style={[styles.imgStyle]}>
                                                    <Image
                                                        source={{ uri: selectedPokemon.sprites.front_default }}
                                                        style={{
                                                            height: 100,
                                                            width: 100,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={[styles.pokeName]}>{selectedPokemon.name}</Text>
                                            </>
                                    }
                                </View>
                            </Pressable>
                        </View>

                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]} onPress={() => {
                                setCondPokemon("poke2")
                                setRoute("EditTeamScreen")
                                setCreateTeamToDash(true)
                                navigation.navigate("DashboardScreen")
                            }
                            }>
                                <View>
                                    {
                                        selectedPokemon2 === undefined ?
                                            <Text style={[styles.plusIcon]}>+</Text>
                                            :
                                            <View>
                                                <View style={[styles.imgStyle]}>
                                                    <Image
                                                        source={{ uri: selectedPokemon2.sprites.front_default }}
                                                        style={{
                                                            height: 100,
                                                            width: 100,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={[styles.pokeName]}>{selectedPokemon2.name}</Text>
                                            </View>
                                    }
                                </View>
                            </Pressable>
                        </View>

                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]} onPress={() => {
                                setCondPokemon("poke3")
                                setRoute("EditTeamScreen")
                                setCreateTeamToDash(true)
                                navigation.navigate("DashboardScreen")
                            }
                            }>
                                <View>
                                    {
                                        selectedPokemon3 === undefined ?
                                            <Text style={[styles.plusIcon]}>+</Text>
                                            :
                                            <View>
                                                <View style={[styles.imgStyle]}>
                                                    <Image
                                                        source={{ uri: selectedPokemon3.sprites.front_default }}
                                                        style={{
                                                            height: 100,
                                                            width: 100,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={[styles.pokeName]}>{selectedPokemon3.name}</Text>
                                            </View>
                                    }
                                </View>

                            </Pressable>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]} onPress={() => {
                                setCondPokemon("poke4")
                                setRoute("EditTeamScreen")
                                setCreateTeamToDash(true)
                                navigation.navigate("DashboardScreen")
                            }
                            }>
                                <View>
                                    {
                                        selectedPokemon4 === undefined ?
                                            <Text style={[styles.plusIcon]}>+</Text>
                                            :
                                            <View>
                                                <View style={[styles.imgStyle]}>
                                                    <Image
                                                        source={{ uri: selectedPokemon4.sprites.front_default }}
                                                        style={{
                                                            height: 100,
                                                            width: 100,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={[styles.pokeName]}>{selectedPokemon4.name}</Text>
                                            </View>
                                    }
                                </View>

                            </Pressable>
                        </View>

                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]} onPress={() => {
                                setCondPokemon("poke5")
                                setRoute("EditTeamScreen")
                                setCreateTeamToDash(true)
                                navigation.navigate("DashboardScreen")
                            }
                            }>
                                <View>
                                    {
                                        selectedPokemon5 === undefined ?
                                            <Text style={[styles.plusIcon]}>+</Text>
                                            :
                                            <View>
                                                <View style={[styles.imgStyle]}>
                                                    <Image
                                                        source={{ uri: selectedPokemon5.sprites.front_default }}
                                                        style={{
                                                            height: 100,
                                                            width: 100,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={[styles.pokeName]}>{selectedPokemon5.name}</Text>
                                            </View>
                                    }
                                </View>

                            </Pressable>
                        </View>

                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]} onPress={() => {
                                setCondPokemon("poke6")
                                setRoute("EditTeamScreen")
                                setCreateTeamToDash(true)
                                navigation.navigate("DashboardScreen")
                            }
                            }>
                                <View>
                                    {
                                        selectedPokemon6 === undefined ?
                                            <Text style={[styles.plusIcon]}>+</Text>
                                            :
                                            <>
                                                <View style={[styles.imgStyle]}>
                                                    <Image
                                                        source={{ uri: selectedPokemon6.sprites.front_default }}
                                                        style={{
                                                            height: 100,
                                                            width: 100,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={[styles.pokeName]}>{selectedPokemon6.name}</Text>
                                            </>
                                    }
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Pressable style={({ pressed }) => [styles.editTeamBtn, {
                    backgroundColor: pressed ? "blue" : "#9D9D9D",
                    opacity: pressed ? .5 : 1
                }]} onPress={async () => {
                    await EditedTeamByUser(selectedPokemon.teamId, selectedPokemon.userId, selectedPokemon.teamName, selectedPokemon.name, selectedPokemon2.name, selectedPokemon3.name, selectedPokemon4.name, selectedPokemon5.name, selectedPokemon6.name)
                    //use update endpoint if user change the pokemon line up
                    setRoute("PokemonInfoScreen")
                    navigation.navigate("DashboardScreen")
                }
                }>
                    <View>
                        <Text>Save Party</Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#FFFEEC"
    },
    containerBtnForTeam: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        height: 320,
        backgroundColor: "#D1D1D1",
        flexDirection: "row",
        maxWidth: 460
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
    btn: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        height: 450,
        backgroundColor: "#EDF6E5",
    },
    btnSelection: {
        marginHorizontal: 5,
        marginVertical: 10,
        height: 200,
        width: 115,
    },
    editTeamBtn: {
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
        height: 40,
        width: 150,
        alignItems: "center",
        alignSelf: "center",
        paddingTop: 10
    },
    plusIcon: {
        fontSize: 50,
        color: "#fff",
        alignSelf: "center",
        paddingTop: 60
    },
})