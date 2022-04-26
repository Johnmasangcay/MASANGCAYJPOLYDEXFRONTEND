import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import ProgressBar from 'react-native-progress/Bar';
import { GetSelectedPokemonData, GetDmgTaken, GetSelectedAbility1, GetSelectedAbility2, GetFavPokemonByUser, GetUserTeam, UpdateFavPokemon, DeleteUsersTeam, GetPokemonUsersData, AddPokemonDataIntoApi, GetAllPokemonDataFromBackEnd } from './Context/apiFetch';


export default function TeamViewer({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const { selectedTeam } = useContext(UserContext);
    const { selectedPokemonType } = useContext(UserContext)
    const { selectedPokemonTeamViewer, setSelectedPokemonTeamViewer } = useContext(UserContext)
    const { teamPokemon2Type } = useContext(UserContext);
    const { teamPokemon3Type } = useContext(UserContext);
    const { teamPokemon4Type } = useContext(UserContext);
    const { teamPokemon5Type } = useContext(UserContext);
    const { teamPokemon6Type } = useContext(UserContext);
    const { selectedPokemon, setSelectedPokemon } = useContext(UserContext)
    const { selectedPokemon2, setSelectedPokemon2 } = useContext(UserContext)
    const { selectedPokemon3, setSelectedPokemon3 } = useContext(UserContext);
    const { selectedPokemon4, setSelectedPokemon4 } = useContext(UserContext);
    const { selectedPokemon5, setSelectedPokemon5 } = useContext(UserContext);
    const { selectedPokemon6, setSelectedPokemon6 } = useContext(UserContext);
    const { getPokeData, setGetPokeData } = useContext(UserContext);
    const { cond, setCond } = useContext(UserContext)
    const { cond2, setCond2 } = useContext(UserContext)
    const { cond3, setCond3 } = useContext(UserContext)
    const { cond4, setCond4 } = useContext(UserContext)
    const { condForHeldItems, setCondForHeldItems } = useContext(UserContext)
    

    useEffect(async () => {
        console.log(selectedTeam)
        console.log( GetAllPokemonDataFromBackEnd)
    }, [])

    return (
        <>
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Are you sure you want Delete Team?</Text>
                                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose, { backgroundColor: "#FF6363" }]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Cancel</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose, { backgroundColor: "#42C2FF" }]}
                                            onPress={async () => {
                                                await DeleteUsersTeam(selectedTeam[0].teamId)
                                                setModalVisible(!modalVisible)
                                                navigation.navigate("DashboardScreen")
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Continue</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={[styles.containerBtn]} >
                        <View style={[styles.EditBtn]}>
                            <Pressable
                                style={[styles.button, styles.buttonCloseDelete]}
                                onPress={async () => {
                                    setSelectedPokemon(selectedTeam[0])
                                    setSelectedPokemon2(selectedTeam[1])
                                    setSelectedPokemon3(selectedTeam[2])
                                    setSelectedPokemon4(selectedTeam[3])
                                    setSelectedPokemon5(selectedTeam[4])
                                    setSelectedPokemon6(selectedTeam[5])
                                    navigation.navigate("EditTeamScreen")
                                }}
                            >
                                <Text style={styles.textStyle}>Edit</Text>
                            </Pressable>
                        </View>
                        <View style={[styles.deleteBtn]}>
                            <Pressable
                                style={[styles.button, styles.buttonCloseDelete]}
                                onPress={async () => {
                                    setModalVisible(true)
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
                                selectedTeam.map((poke, i) => {
                                    return (

                                        <Pressable key={i} onPress={async () => {
                                            setGetPokeData(await GetPokemonUsersData(poke.userId, poke.teamId, poke.name))
                                            setSelectedPokemonTeamViewer(poke)
                                            setCond("teamBToSelectedTV")
                                            setCond2("teamBToSelectedTV2")
                                            setCond3("teamBToSelectedTV3")
                                            setCond4("teamBToSelectedTV4")
                                            setCondForHeldItems("teamBToSelectedTVHeldItems")
                                            navigation.navigate("SelectedPokemonTV")
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
                            <Text style={[styles.baseStatNames]}>Speed</Text>
                            <ProgressBar progress={selectedTeam[0].stats[5].base_stat / 100} width={300} height={25} color={"#9D9D9D"} />
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.dmgTitle, { marginTop: 30 }]}>Tips and Tricks</Text>
                    </View>
                    <View style={[styles.dmgTakenContainer, { backgroundColor: "#D1D1D1", marginTop: 10 }]}>
                        <View>
                            <Text style={[styles.descriptionTxt]}>Based on the types of the Pokemon in your party, you have super effective (x2) damage inflicting types of moves of your pokemon against the following types:</Text>
                        </View>

                        <View>
                            <Text style={[styles.dmgTitle, { marginTop: 10 }]}>Resistant Against..</Text>
                        </View>

                        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 10, flexWrap: "wrap", paddingLeft: 15 }}>
                            {
                                selectedPokemonType.damage_relations.double_damage_to.map((poketype, n) => {
                                    return (
                                        <Text key={n} style={[styles.pokeTypeDmgTaken]}>{poketype.name}</Text>
                                    )
                                })
                            }
                        </View>
                        <View style={{ flexDirection: "row", marginLeft: 20, flexWrap: "wrap", paddingLeft: 15 }}>
                            {
                                selectedPokemonType.damage_relations.half_damage_to.map((poketype, m) => {
                                    return (
                                        <Text key={m} style={[styles.pokeTypeDmgTaken]}>{poketype.name}</Text>
                                    )
                                })
                            }
                        </View>
                        <View style={{ flexDirection: "row", marginLeft: 20, flexWrap: "wrap", paddingLeft: 15, flex: .5 }}>
                            <Text style={{ fontSize: 10, marginLeft: 25, fontWeight: "bold" }}>Highest positive value indicates more moves affecting this types.</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, marginLeft: 15, fontWeight: "bold" }}>You do not have enough coverage against the following types:</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 10, flex: 1, flexWrap: "wrap", paddingLeft: 15 }}>
                            {
                                selectedPokemonType.damage_relations.double_damage_from.map((poketype, j) => {
                                    return (
                                        <Text key={j} style={[styles.pokeTypeDmgTaken]}>{poketype.name}</Text>
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
        elevation: 2,
        marginHorizontal: 4
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
        width: 120,
    },

    EditBtn: {
        justifyContent: "center",
        paddingLeft: 10,
        width: 250,
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 1
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
        height: 400,
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
    descriptionTxt: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 10,
        marginHorizontal: 40
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
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
})