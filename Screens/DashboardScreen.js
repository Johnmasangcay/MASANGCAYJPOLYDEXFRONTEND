import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import { GetSelectedPokemonData, GetDmgTaken, EditedTeamByUser, GetSelectedAbility1, GetSelectedAbility2, GetFavPokemonByUser, GetUserTeam, UpdateFavPokemon, GetTeamByTeamID } from './Context/apiFetch';
import loading from '../assets/loading.json'
import LottieView from 'lottie-react-native';

export default function DashboardScreen({ navigation }) {
    let star = "★"
    let starThin = "☆"
    let hamburgerMenu = "☰"
    let imageUrl = "https://tenor.com/view/pikachu-running-run-run-away-gif-13709403";
    const [isloaded, setIsloaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isFavPokemon, setIsFavPokemon] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [pokeSearch, setPokeSearch] = useState("");
    const [getUserId, setGetUserId] = useState(0)
    const { currentUser } = useContext(UserContext)
    const { selectedPokemon, setSelectedPokemon } = useContext(UserContext);
    const { selectedPokemon2, setSelectedPokemon2 } = useContext(UserContext);
    const { selectedPokemon3, setSelectedPokemon3 } = useContext(UserContext);
    const { selectedPokemon4, setSelectedPokemon4 } = useContext(UserContext);
    const { selectedPokemon5, setSelectedPokemon5 } = useContext(UserContext);
    const { selectedPokemon6, setSelectedPokemon6 } = useContext(UserContext);
    const { selectedPokemonType, setSelectedPokemonType } = useContext(UserContext);
    const { selectedPokemonAbility1, setSelectedPokemonAbility1 } = useContext(UserContext);
    const { selectedPokemonAbility2, setSelectedPokemonAbility2 } = useContext(UserContext);
    const { usersFavData, setUsersFavData } = useContext(UserContext);
    const { usersTeam, setUsersTeam } = useContext(UserContext);
    const { route, setRoute } = useContext(UserContext);
    const { createTeamToDash, setCreateTeamToDash } = useContext(UserContext);
    const { condPokemon, setCondPokemon } = useContext(UserContext);
    const { selectedTeam, setSelectedTeam } = useContext(UserContext);
    const { getNewAddedData, setGetNewAddedData } = useContext(UserContext);


    // getting all pokemon to access all the data.
    const getPokemons = async () => {
        let resp = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10");
        let data = await resp.json();
        function getPokemonObjects(pokeObject) {
            pokeObject.forEach(async (pokemon) => {
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await resp.json();
                setPokemons(currentArr => [...currentArr, data]);
            })
        }
        getPokemonObjects(data.results)
    }

    // filter base on the user.
    const filterPokemon = pokemons.filter(poke => {
        return poke.name.toLowerCase().includes(pokeSearch.toLowerCase())
    })


    useEffect(async () => {
        getPokemons()
        // setting the ID of logged in user.
        setGetUserId(currentUser[0].id)
        // setTimeout for dashboard onload.
        setTimeout(function () {
            setIsloaded(true)
        }, 6000)
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
                    {
                        // ternary operator if the user just logged in it will load the pokedex, if the user went from teamBuilder to dashboard it will load Select a pokemon
                        createTeamToDash ?
                            <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
                                <Text style={{ color: "black", paddingLeft: 5, fontSize: 20, fontWeight: "bold" }}>Select A Pokemon</Text>
                                <Text onPress={() => setModalVisible(true)} style={{ fontSize: 20, paddingLeft: 200 }}>Back</Text>
                            </View>
                            :
                            <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
                                <Text onPress={() => setModalVisible(true)} style={{ fontSize: 30 }}>{hamburgerMenu}</Text>
                                <Text style={{ color: "black", paddingLeft: 20, fontSize: 30, fontWeight: "bold" }}>PokeDex</Text>
                                <Text onPress={async () => {
                                    navigation.navigate("FavoritePokemonScreen")
                                    setUsersFavData(await GetFavPokemonByUser(getUserId))
                                }} style={{ fontSize: 30, paddingLeft: 210 }}>{star}</Text>
                            </View>
                    }
                    {/* Modal for selecting screens */}
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
                                        <Text style={styles.textStyle}>Close</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    {/* Search input  */}
                    <View>
                        <TextInput
                            placeholder="🔍 What Pokemon Are You Looking For?"
                            style={styles.input}
                            onChangeText={setPokeSearch}
                        />
                    </View>
                    <View>

                    </View>

                    <ScrollView style={{ paddingBottom: 20 }}>
                        {
                            // Map Filter Pokemon to pull all pokemon as well as 
                            filterPokemon.map((pokemonData, keyx) => {
                                return (

                                    <Pressable key={keyx} style={({ pressed }) => [styles.btn, {
                                        backgroundColor: pressed ? "blue" : "#EDF6E5",
                                        opacity: pressed ? .5 : 1
                                    }]} onPress={async () => {
                                        if (condPokemon == "poke1") {
                                            setSelectedPokemon(await GetSelectedPokemonData(pokemonData.id))
                                        } else if (condPokemon == "poke2") {
                                            setSelectedPokemon2(await GetSelectedPokemonData(pokemonData.id))
                                        } else if (condPokemon == "poke3") {
                                            setSelectedPokemon3(await GetSelectedPokemonData(pokemonData.id))
                                        } else if (condPokemon == "poke4") {
                                            setSelectedPokemon4(await GetSelectedPokemonData(pokemonData.id))
                                        } else if (condPokemon == "poke5") {
                                            setSelectedPokemon5(await GetSelectedPokemonData(pokemonData.id))
                                        } else if (condPokemon == "poke6") {
                                            setSelectedPokemon6(await GetSelectedPokemonData(pokemonData.id))
                                        }
                                        setSelectedPokemonType(await GetDmgTaken(pokemonData.types[0].type.name))
                                        setSelectedPokemonAbility1(await GetSelectedAbility1(pokemonData.abilities[0].ability.name))
                                        setSelectedPokemonAbility2(await GetSelectedAbility2(pokemonData.abilities[1].ability.name))
                                        setCreateTeamToDash(false)
                                        console.log(pokemonData.name)
                                        navigation.navigate(route)
                                    }}>
                                        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                            <Text style={styles.txtstyleID}>#{pokemonData.id}</Text>
                                            <Text style={[styles.txtstyleNAME]}>{pokemonData.name}</Text>
                                            <Pressable style={({ pressed }) => [{
                                                backgroundColor: pressed ? "blue" : "#EDF6E5",
                                                opacity: pressed ? .5 : 1
                                            }]} onPress={async () => {
                                                setIsFavPokemon(true)
                                                setUsersFavData(await GetFavPokemonByUser(getUserId, pokemonData.name))
                                                Alert.alert("You've added " + pokemonData.name + " to favorite")
                                            }}>
                                                <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                                    <Text style={{ fontSize: 40, paddingLeft: 10 }}>{starThin}</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                        <View style={styles.txtstyleIMAGE}>
                                            <Image
                                                source={{ uri: pokemonData.sprites.front_default }}
                                                style={{
                                                    height: 100,
                                                    width: 100,
                                                }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: "row", padding: 5 }}>
                                            {
                                                pokemonData.types.map((pokeType, i) => {

                                                    return (
                                                        <Text key={i} style={[styles.txtstyleTYPE, { backgroundColor: "#D1D1D1" }]}>{pokeType.type.name}</Text>
                                                    )
                                                })
                                            }
                                        </View>
                                    </Pressable>

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
    modalText: {
        marginBottom: 25,
        textAlign: "left",
        fontSize: 20,
        color: "gainsboro",
        fontWeight: "bold",
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
    },
    tinyLogo: {
        width: 200,
        height: 500,
    },
    loadingScreen: {
        flex: 1
    }
});