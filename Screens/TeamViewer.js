import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import ProgressBar from 'react-native-progress/Bar';
import { GetSelectedPokemonData, GetDmgTaken, GetSelectedAbility1, GetSelectedAbility2, GetFavPokemonByUser, GetUserTeam, UpdateFavPokemon } from './Context/apiFetch';


export default function TeamViewer({ navigation }) {

    const { selectedTeam } = useContext(UserContext);
    const { selectedPokemonType } = useContext(UserContext)
    const { selectedPokemonTeamViewer, setSelectedPokemonTeamViewer } = useContext(UserContext)

    useEffect(async () => {
        console.log(selectedTeam)
        console.log(selectedPokemonType)
    }, [])

    return (
        <>
            <ScrollView>


                <SafeAreaView style={styles.container}>
                    <View style={[styles.containerBtn]} >
                        <View style={[styles.EditBtn]}>
                            <Pressable
                                style={[styles.button]}
                                onPress={async () => {
                                    await UsersNewAddedTeam(getUserId, selectedPokemon.name, selectedPokemon2.name)
                                    navigation.navigate("TeambuilderScreen")
                                    setCreateTeamToDash(false)
                                }}
                            >
                                <Text style={styles.textStyle}>Edit Team</Text>
                            </Pressable>
                        </View>

                        <View style={[styles.deleteBtn]}>
                            <Pressable
                                style={[styles.button, styles.buttonCloseDelete]}
                                onPress={async () => {
                                    await UsersNewAddedTeam(getUserId, selectedPokemon.name, selectedPokemon2.name)
                                    navigation.navigate("TeambuilderScreen")
                                    setCreateTeamToDash(false)
                                }}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.pokeTeamTitle]}>Pokemon Party</Text>
                    </View>
                    <View style={[styles.containerBtnForTeam]}>
                        <View style={{ flex: 1, flexWrap: "wrap", paddingLeft: 30 }}>
                            {
                                selectedTeam.map(poke => {
                                    return (
                                        <>
                                            <Pressable onPress={async () => {
                                                setSelectedPokemonTeamViewer(await GetSelectedPokemonData(poke.name))
                                                navigation.navigate("SelectedPokemonTV")
                                                console.log(poke.name)
                                            }}>
                                                <View style={[styles.imgStyle]}>
                                                    <Image
                                                        source={{ uri: poke.sprites.front_default }}
                                                        style={{
                                                            height: 100,
                                                            width: 100,
                                                        }}
                                                    />
                                                </View>
                                                <View>
                                                    <Text style={[styles.pokeName]}>{poke.name}</Text>
                                                </View>
                                            </Pressable>
                                        </>
                                    )
                                })
                            }

                        </View>
                    </View>

                    <View>
                        <Text style={[styles.pokeTeamTitle]}>Team Stats</Text>
                    </View>
                    <View style={[styles.baseStatContainer, { backgroundColor: "#D1D1D1" }]}>
                        <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
                            <Text style={[styles.baseStatNames]}>HP</Text>
                            <ProgressBar progress={selectedTeam[0].stats[0].base_stat / 100} width={300} height={25} color={"#9D9D9D"} />
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
                            <Text style={[styles.baseStatNames]}>Attack</Text>
                            <ProgressBar progress={selectedTeam[0].stats[1].base_stat / 100} width={300} height={25} color={"#9D9D9D"} />
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
                            <Text style={[styles.baseStatNames]}>Defense</Text>
                            <ProgressBar progress={selectedTeam[0].stats[2].base_stat / 100} width={300} height={25} color={"#9D9D9D"} />
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
                            <Text style={[styles.baseStatNames]}>Sp. Atk</Text>
                            <ProgressBar progress={selectedTeam[0].stats[3].base_stat / 100} width={300} height={25} color={"#9D9D9D"} />
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
                            <Text style={[styles.baseStatNames]}>Sp. Def</Text>
                            <ProgressBar progress={selectedTeam[0].stats[4].base_stat / 100} width={300} height={25} color={"#9D9D9D"} />
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
                            <Text onPress={console.log(selectedTeam[0])} style={[styles.baseStatNames]}>Speed</Text>
                            <ProgressBar progress={selectedTeam[0].stats[5].base_stat / 100} width={300} height={25} color={"#9D9D9D"} />
                        </View>
                    </View>


                    <View style={[styles.dmgTakenContainer, { backgroundColor: "#D1D1D1", marginTop: 40 }]}>
                        <View>
                            <Text style={[styles.dmgTitle]}>Weak Against..</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 10, flex: 1, flexWrap: "wrap", paddingLeft: 15 }}>
                            {
                                selectedPokemonType.damage_relations.double_damage_from.map((poketype) => {
                                    return (
                                        <>
                                            <View>
                                                <Text style={[styles.pokeTypeDmgTaken]}>{poketype.name}</Text>
                                            </View>
                                        </>
                                    )
                                })
                            }
                        </View>

                        <View>
                            <Text style={[styles.dmgTitle]}>Super Effective..</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 10, flex: 1, flexWrap: "wrap", paddingLeft: 15 }}>
                            {
                                selectedPokemonType.damage_relations.double_damage_to.map((poketype) => {
                                    return (
                                        <>
                                            <View>
                                                <Text style={[styles.pokeTypeDmgTaken]}>{poketype.name}</Text>
                                            </View>
                                        </>
                                    )
                                })
                            }
                        </View>

                        <View>
                            <Text style={[styles.dmgTitle]}>Normal Effective..</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 10, flex: 1, flexWrap: "wrap", paddingLeft: 15 }}>
                            {
                                selectedPokemonType.damage_relations.half_damage_to.map((poketype) => {
                                    return (
                                        <>
                                            <View>
                                                <Text style={[styles.pokeTypeDmgTaken]}>{poketype.name}</Text>
                                            </View>
                                        </>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View>

                    </View>
                </SafeAreaView>
            </ScrollView>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#9D9D9D"
    },
    buttonCloseDelete: {
        backgroundColor: "#FF6464",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
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
        height: 100
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
    deleteBtn: {
        justifyContent: "center",
        width: 130,
        paddingRight: 10
    },
    EditBtn: {
        justifyContent: "center",
        paddingLeft: 10,
        width: 250,
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center"
    },
    pokeTeamTitle: {
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center",
        marginTop: 30,
    },
    dmgTitle: {
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center",
    },
    btnSelection: {
        flex: 1,
        flexWrap: "wrap",
        marginHorizontal: 5,
        marginVertical: 10,
        height: 530,
        width: 450,
        justifyContent: "space-around",
        paddingLeft: 0,
        flexDirection: "row",
        maxWidth: 390
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
    baseStatContainer: {
        flex: 1,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 10,
        height: 350,
    },
    dmgTakenContainer: {
        flex: 1,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 10,
        height: 480,
    },
    baseStatNames: {
        backgroundColor: "#9D9D9D",
        paddingHorizontal: 20,
        fontSize: 12,
        textAlign: "center",
        color: "#323232",
        borderRadius: 5,
        height: 27,
        width: 80,
    },
    pokeTypeDmgTaken: {
        backgroundColor: "#EFEFEF",
        paddingHorizontal: 40,
        paddingVertical: 10,
        fontSize: 12,
        textAlign: "center",
        color: "#323232",
        borderRadius: 5,
        textTransform: 'capitalize',
        fontWeight: "bold",
    },
})