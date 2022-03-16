import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';
import ProgressBar from 'react-native-progress/Bar';
import { GetSelectedPokemonData, GetDmgTaken, GetSelectedAbility1, GetSelectedAbility2, GetFavPokemonByUser, GetUserTeam, UpdateFavPokemon } from './Context/apiFetch';

export default function SelectedPokemonTV() {

    const { selectedPokemonTeamViewer } = useContext(UserContext)

    useEffect(async () => {
        console.log(selectedPokemonTeamViewer)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.btn, { backgroundColor: "#BCE0DA" }]}>
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
                        selectedPokemonTeamViewer.types.map((pokeType) => {
                            return (
                                <>
                                    <Text style={[styles.txtstyleSelectedTYPE, { backgroundColor: "#EEEEEE", marginLeft: 40 }]}>{pokeType.type.name}</Text>
                                </>
                            )
                        })
                    }
                </View>
            </View>

            <View>
                
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
})