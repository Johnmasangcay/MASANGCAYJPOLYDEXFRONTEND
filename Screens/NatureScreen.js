import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';

export default function DashboardScreen({ navigation }) {
    let star = "★"
    let starThin = "☆"
    let hamburgerMenu = "☰"
    const [isloaded, setIsloaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [nature, setNature] = useState([]);
    const [pokeSearch, setPokeSearch] = useState("");



    const getNature = async () => {
        let resp = await fetch("https://pokeapi.co/api/v2/nature?offset=0&limit=25");
        let data = await resp.json();

        function getPokemonObjects(pokeObject) {
            pokeObject.forEach(async (nature) => {
                const resp = await fetch(`https://pokeapi.co/api/v2/nature/${nature.name}`)
                const data = await resp.json();
                setNature(currentArr => [...currentArr, data]);
            })
        }

        getPokemonObjects(data.results)
    }

    const filterPokemon = nature.filter(natures => {
        return natures.name.toLowerCase().includes(pokeSearch.toLowerCase())
    })

    useEffect(() => {
        getNature()
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
                                            <Icon style={{ color: "gainsboro", paddingRight: 100 }} name='mobile' size={25} color="white" />
                                            <Text style={styles.modalText}>POKEDEX</Text>
                                        </View>
                                    </Pressable>

                                    <Pressable onPress={() => {
                                        navigation.navigate("MovesScreen")
                                        setModalVisible(!modalVisible)
                                    }
                                    }>
                                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                            <Icon style={{ color: "gainsboro", paddingRight: 115 }} name='shield' size={25} color="white" />
                                            <Text style={styles.modalText}>MOVES</Text>
                                        </View>
                                    </Pressable>

                                    <Pressable onPress={() => {
                                        navigation.navigate("ItemsScreen")
                                        setModalVisible(!modalVisible)
                                    }
                                    }>
                                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                            <Icon style={{ color: "gainsboro", paddingRight: 125 }} name='book' size={25} color="white" />
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

                                    <Pressable onPress={() => {
                                        navigation.navigate("TeambuilderScreen")
                                        setModalVisible(!modalVisible)
                                    }
                                    }>
                                        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                            <Icon style={{ color: "gainsboro", paddingRight: 50 }} name='user' size={25} color="white" />
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

                    <ScrollView style={{ paddingBottom: 20 }}>
                        {
                            filterPokemon.map((natureData, keyx) => {
                                return (
                                    <>
                                        <Pressable style={({ pressed }) => [styles.btn, {
                                            backgroundColor: pressed ? "blue" : "#EDF6E5",
                                            opacity: pressed ? .5 : 1
                                        }]}>
                                            <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                                <Text OnPress={console.log(natureData)} style={[styles.txtstyleNAME]}>{natureData.name}</Text>
                                            </View>
                                            <View style={[{flexDirection: "row", marginBottom: 5}]}>
                                                    <Text style={styles.increasedStatText}>Increased</Text>
                                                    <Text>Decreased</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                                                <Text style={[styles.natureIncreaseTextStyle, { width: 190, alignItems: "center" }]}>{natureData.increased_stat == null ? "-" : natureData.increased_stat.name}</Text>
                                                <Text style={[styles.natureIncreaseTextStyle, { width: 190, alignItems: "center" }]}>{natureData.decreased_stat == null ? "-" : natureData.decreased_stat.name}</Text>
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
        height: 100
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
        paddingLeft: 150,
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
    },
    natureIncreaseTextStyle: {
        fontSize: 20,
        backgroundColor: "#9DDCDC",
        height: 40,
        borderRadius: 20,
        textTransform: 'capitalize',
        paddingLeft: 50
    },
    increasedStatText: {
        marginRight: 130,
        color: "#323232"
    }
});