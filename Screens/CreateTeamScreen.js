import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';

export default function CreateTeamScreen({ navigation }) {

    const [teamName, setTeamName] = useState("Team");

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
                    <Text style={{ color: "black", paddingLeft: 5, fontSize: 20, fontWeight: "bold" }}>Create Team</Text>
                    <Text style={{ paddingLeft: 240, fontSize: 20 }}>back</Text>
                </View>

                <View>
                    <TextInput
                        placeholder="Team Name"
                        style={styles.input}
                        onChangeText={setTeamName}
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
                                backgroundColor: pressed ? "blue" : "#494953",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#494953",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#494953",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#494953",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#494953",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable style={({ pressed }) => [styles.btnSelection, {
                                backgroundColor: pressed ? "blue" : "#494953",
                                opacity: pressed ? .5 : 1
                            }]}>
                                <Text style={[styles.plusIcon]}>+</Text>
                            </Pressable>
                        </View>
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
    }
})