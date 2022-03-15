import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import { UsersNewAddedTeam } from '../Screens/Context/apiFetch'

export default function CreateTeamScreen({ navigation }) {

    const { selectedPokemon } = useContext(UserContext)
    const { selectedPokemon2 } = useContext(UserContext)
    const { currentUser } = useContext(UserContext)
    const [getUserId, setGetUserId] = useState(0)
    const [teamName, setTeamName] = useState("Team");
    const { route, setRoute } = useContext(UserContext);
    const { createTeamToDash, setCreateTeamToDash } = useContext(UserContext);
    const [isFilled, setIsFilled] = useState();
    const [isFilled2, setIsFilled2] = useState();

    const firstPokeCond = async () => {
        let firstPoke;
        if (await selectedPokemon.id > 0) {
            firstPoke = true;
        } else {
            firstPoke = false;
        }
        return firstPoke;
    }

    const secondPokeCond = async () => {
        let firstPoke;
        if (await selectedPokemon2.id > 0) {
            firstPoke = true;
        } else {
            firstPoke = false;
        }
        return firstPoke;
    }


    useEffect(async () => {
        console.log(selectedPokemon)
        setGetUserId(currentUser[0].id)
        setIsFilled(await firstPokeCond())
        setIsFilled2(await secondPokeCond())
    }, [])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
                    <Text style={{ color: "black", paddingLeft: 5, fontSize: 20, fontWeight: "bold" }}>Create Team</Text>
                    <Text onPress={() => {
                        navigation.navigate("TeambuilderScreen")
                    }} style={{ paddingLeft: 240, fontSize: 20 }}>back</Text>
                </View>

                <View>
                    <TextInput
                        placeholder="Team Name"
                        style={styles.input}
                        onChangeText={setTeamName}
                        value={teamName}
                    />
                    <Text style={[styles.txtInput]}>Enter a name for your team</Text>
                </View>

                <View>
                    <Text style={[styles.txtPokePartyTitle]}>POKEMON PARTY</Text>
                </View>
                <View style={[styles.btn]}>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]} onPress={() => {
                                setRoute("CreateTeamScreen")
                                setCreateTeamToDash(true)
                                navigation.navigate("DashboardScreen")
                            }
                            }>
                                <View>
                                    {
                                        isFilled ?
                                            <View>
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
                                            </View>

                                            :
                                            <Text style={[styles.plusIcon]}>+</Text>
                                    }
                                </View>

                            </Pressable>
                        </View>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]} onPress={() => {
                                setRoute("CreateTeamScreen")
                                setCreateTeamToDash(true)
                                navigation.navigate("DashboardScreen")
                            }
                            }>
                                <View>
                                    {
                                        isFilled ?
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

                                            :
                                            <Text style={[styles.plusIcon]}>+</Text>
                                    }
                                </View>

                            </Pressable>
                        </View>


                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#9D9D9D",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>

                <View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={async () => {
                            await UsersNewAddedTeam(getUserId, selectedPokemon.name, selectedPokemon2.name)
                            navigation.navigate("TeambuilderScreen")
                            setCreateTeamToDash(false)
                        }}
                    >
                        <Text style={styles.textStyle}>Add Team</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
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
    input: {
        padding: 10,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: '#EEEEEE',
        marginHorizontal: 30,
        marginTop: 30
    },
    txtInput: {
        paddingLeft: 35,
    },
    txtPokePartyTitle: {
        alignSelf: "center",
        paddingTop: 40,
        fontWeight: "bold",
        fontSize: 20,
    },
    btnSelection: {
        marginHorizontal: 5,
        marginVertical: 10,
        height: 200,
        width: 115,
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
    plusIcon: {
        fontSize: 50,
        color: "#fff",
        alignSelf: "center",
        paddingTop: 60
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    pokeName: {
        fontSize: 20,
        textTransform: 'capitalize',
        fontWeight: "bold",
        alignSelf: "center",

    }
})