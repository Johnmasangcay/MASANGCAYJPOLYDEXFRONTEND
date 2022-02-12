import React from 'react'
import Emoji from 'react-native-emoji';
import hamburgerMenu from '../assets/bars-solid.svg'
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button } from 'react-native';

export default function DashboardScreen() {
    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "grey", padding: 9}}>
                    <Text style={{ color: "grey", paddingLeft: 20}}></Text>
                    <Text style={{ color: "grey", paddingLeft: 120 }}>PokeDex</Text>
                    <Text style={{ paddingLeft: 120,  }}><Emoji name="star" style={{fontSize: 13, color: 'white'}} /></Text>
                </View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 30,
        backgroundColor: "black"
    }
});