import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';


export default function TeamViewer() {

    const { selectedTeam } = useContext(UserContext);

    useEffect(async () => {
        console.log(selectedTeam)
    }, [])

    return (
        <>
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
            </SafeAreaView>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#FFFEEC"
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
    }
})