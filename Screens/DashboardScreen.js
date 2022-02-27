import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import { GetSelectedPokemonData } from './Context/apiFetch';

export default function DashboardScreen({ navigation }) {
    let star = "★"
    let starThin = "☆"
    let hamburgerMenu = "☰"
    const [isloaded, setIsloaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isFavPokemon, setIsFavPokemon] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [pokeSearch, setPokeSearch] = useState("");
    const { selectedPokemon, setSelectedPokemon } = useContext(UserContext);


    const getPokemons = async () => {
        let resp = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
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

    const filterPokemon = pokemons.filter(poke => {
        return poke.name.toLowerCase().includes(pokeSearch.toLowerCase())
    })

    useEffect(() => {
        getPokemons()
        setTimeout(function () {
            setIsloaded(true)
        }, 5000)
    }, [])
    return (
        <>
            {!isloaded ?
                <ActivityIndicator style={{ flex: 1, backgroundColor: "#FFFEEC" }} size={"large"} color={"blue"} />
                :
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
                        <Text onPress={() => setModalVisible(true)} style={{ fontSize: 30 }}>{hamburgerMenu}</Text>
                        <Text style={{ color: "black", paddingLeft: 20, fontSize: 30, fontWeight: "bold" }}>PokeDex</Text>
                        <Text onPress={() => navigation.navigate("FavoritePokemonScreen")} style={{ fontSize: 30, paddingLeft: 210 }}>{star}</Text>
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
                                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                        <Icon style={{ color: "gainsboro", paddingRight: 100 }} name='mobile' size={25} color="white" />
                                        <Text style={styles.modalText}>POKEDEX</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                        <Icon style={{ color: "gainsboro", paddingRight: 115 }} name='shield' size={25} color="white" />
                                        <Text style={styles.modalText}>MOVES</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                        <Icon style={{ color: "gainsboro", paddingRight: 125 }} name='book' size={25} color="white" />
                                        <Text style={styles.modalText}>ITEMS</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                        <Icon style={{ color: "gainsboro", paddingRight: 50 }} name='user' size={25} color="white" />
                                        <Text style={styles.modalText}>TEAM BUILDER</Text>
                                    </View>
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

                    <ScrollView style={{ paddingBottom: 20 }}>
                        {
                            filterPokemon.map((pokemonData, keyx) => {
                                return (
                                    <>
                                        <Pressable style={({ pressed }) => [styles.btn, {
                                            backgroundColor: pressed ? "blue" : "#EDF6E5",
                                            opacity: pressed ? .5 : 1
                                        }]} onPress={async () => {
                                            setSelectedPokemon(await GetSelectedPokemonData(pokemonData.id))
                                            navigation.navigate("PokemonInfoScreen")
                                        }}>
                                            <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                                <Text style={styles.txtstyleID}>#{pokemonData.id}</Text>
                                                <Text style={[styles.txtstyleNAME]}>{pokemonData.name}</Text>
                                                <Text onPress={() => setIsFavPokemon(true)} style={{ fontSize: 30, paddingLeft: 10 }}>{
                                                    isFavPokemon ? star : starThin
                                                }</Text>
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
                                                    pokemonData.types.map((pokeType) => {

                                                        return (
                                                            <>
                                                                <Text style={[styles.txtstyleTYPE, { backgroundColor: "#D1D1D1" }]}>{pokeType.type.name}</Text>
                                                            </>
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
        paddingLeft: 330,
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