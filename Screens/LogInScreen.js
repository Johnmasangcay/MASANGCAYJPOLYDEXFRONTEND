import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button } from 'react-native';
import polydexBg from '../assets/polydexbg.jpg'



export default function LogInScreen({ navigation }) {
    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={polydexBg} style={{ height: "100%", width: "100%" }}>
                <Pressable style={({ pressed }) => [{
                    // If logInBtn pressed
                    backgroundColor: pressed ? "red" : "purple",
                    opacity: pressed ? .5 : 1
                }]} onPress={() => navigation.navigate("DashboardScreen")}>
                   <Text style={{ color: "white", fontWeight: "bold" }}>Dashboard</Text> 
                </Pressable>
                </ImageBackground>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 30
    }
});