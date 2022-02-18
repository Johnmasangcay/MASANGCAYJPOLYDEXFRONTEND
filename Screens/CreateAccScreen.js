import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button } from 'react-native';
import React, { useState } from 'react'

export default function CreateAccScreen({ navigation }) {
    const [createUserName, setCreateUserName] = useState("");
    const [createPassword, setCreatePassword] = useState("");


    const handleCreateNewAccount = async () => {
        await fetch("http://192.168.12.253:5263/User/AddUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Id": 0,
                "Username": createUserName,
                "Password": createPassword
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if (createUserName == "" || createPassword == "") {
                    Alert.alert("Please Enter in all fields");
                } else {
                    if (data == true) {
                        Alert.alert("Success please Log In");
                        navigation.navigate("LogInScreen");
                    } else {
                        Alert.alert("Username has already exist!")
                    }
                }
                console.log(data)
            })
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{ paddingTop: 180, alignItems: "center" }}>
                    <Text style={styles.titleStyle}>Create Account</Text>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.txtStyle}>Username</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder='Enter UserName'
                        onChangeText={setCreateUserName}
                        value={createUserName}
                    />
                    <Text style={styles.txtStyle}>Password</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder='Enter Password'
                        onChangeText={setCreatePassword}
                        value={createPassword}
                    />

                    <Pressable style={({ pressed }) => [styles.btn, {
                        backgroundColor: pressed ? "blue" : "skyblue",
                        opacity: pressed ? .5 : 1
                    }]} onPress={handleCreateNewAccount}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
                    </Pressable>
                    <Pressable style={styles.txtStyleAlreadyHaveAcc} onPress={() => navigation.navigate("LogInScreen")}>
                        <Text>
                            Already have an account? Sign In
                        </Text>
                    </Pressable>
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
        backgroundColor: "azure"
    },
    inputs: {
        borderBottomWidth: .7,
        padding: 10,
        margin: 20
    },
    txtStyle: {
        marginLeft: 20,
        marginTop: 50,
        fontWeight: "bold"
    },
    txtStyleAlreadyHaveAcc: {
        alignItems: "center",
        fontWeight: "normal",
        fontSize: 13
    },
    titleStyle: {
        fontSize: 40,
        fontWeight: "bold",
        color: "skyblue"
    },
    btn: {
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 10,
        margin: 20,
    },
});