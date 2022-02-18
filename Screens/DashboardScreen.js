import React, { useState, useEffect } from 'react'
import Emoji from 'react-native-emoji';
import Icon from 'react-native-vector-icons/FontAwesome';
import polydexBg from '../assets/polydexbg.jpg'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';

export default function DashboardScreen() {
    const [allPokemonNumbers, setAllPokemonNumbers] = useState(898);
    const [isloaded, setIsloaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [pokemons, setPokemons] = useState([]);

    const getPokemons = async () => {
        let resp = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
        let data = await resp.json();
        console.log(data.results);

        function getPokemonObjects(pokeObject) {
            pokeObject.forEach(async (pokemon) => {
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await resp.json();
                setPokemons(currentArr => [...currentArr, data]);

            })
        }
        getPokemonObjects(data.results)
    }



    useEffect(() => {
        getPokemons()
        console.log(pokemons)
        setTimeout(function () {
            setIsloaded(true)
        }, 4000)
    }, [])
    return (
        <>
            {!isloaded ?
                <ActivityIndicator style={{ flex: 1, backgroundColor: "black" }} size={"large"} color={"red"} />
                :
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
                        <Icon onPress={() => setModalVisible(true)} style={{ color: "black" }} name='bars' size={25} color="white" />
                        <Text style={{ color: "black", paddingLeft: 20, fontSize: 20 }}>PokeDex</Text>
                        <Icon style={{ color: "black", paddingLeft: 250 }} name='star' size={25} color="white" />
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

                    <ScrollView style={{ paddingBottom: 20 }}>
                        {
                            pokemons.map((pokemonData, keyx) => {
                                return (
                                    <>
                                        <Pressable style={({ pressed }) => [styles.btn, {
                                            backgroundColor: pressed ? "blue" : "skyblue",
                                            opacity: pressed ? .5 : 1
                                        }]} onPress={console.log("hello")}>

                                            <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                                <Text style={styles.txtstyleID}>#{pokemonData.id}</Text>
                                                <Text style={styles.txtstyleNAME}>{pokemonData.name}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.txtstyleTYPE}>{pokemonData.types[0].type.name}</Text>
                                                
                                                <View style={styles.txtstyleIMAGE}>
                                                    <Image
                                                        source={pokemonData.sprites.front_default}
                                                        style={{
                                                            height: 70,
                                                            width: 70,
                                                        }}
                                                    />
                                                </View>
                                            </View>


                                        </Pressable>
                                        {/* -------------------------------------------------------------------------- */}


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
        backgroundColor: "azure"
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
        paddingVertical: 10,
        marginVertical: 20,
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
        fontSize: 20,
        textTransform: 'capitalize',
        paddingLeft: 40
    },
    txtstyleIMAGE: {
        paddingLeft: 90
    },
    txtstyleTYPE: {
        fontSize: 20,
        textTransform: 'capitalize',
        paddingLeft: 40,
        paddingTop: 20
    }
});