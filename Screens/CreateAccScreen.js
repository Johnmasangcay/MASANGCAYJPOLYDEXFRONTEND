import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button } from 'react-native';
import React, { useState } from 'react'
import { signingUpNewUser, GetNewUserData, GetUserIntoFav, GetUserIntoTeamBuilder } from "./Context/apiFetch";
import UserContext from './Context/UserContext';

export default function CreateAccScreen({ navigation }) {
    const [createUserName, setCreateUserName] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [poke1, setPoke1] = useState("");
    const [poke2, setPoke2] = useState("");
    const [poke3, setPoke3] = useState("");
    const [poke4, setPoke4] = useState("");
    const [poke5, setPoke5] = useState("");
    const [poke6, setPoke6] = useState("");
    const [createId, setCreateId] = useState(0);


    const handleCreateNewAccount = async () => {
        if (createUserName != "" && createPassword != "") {
            const newuser = await signingUpNewUser(createUserName, createPassword, createId) 
            const newuserData = await GetNewUserData(createUserName) 
            if (newuser == true) {
                await GetUserIntoFav(newuserData)
                Alert.alert("Success please Log In");
                navigation.navigate("LogInScreen");
            } else {
                Alert.alert("Username has already exist!")
            }
        }
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
                        secureTextEntry
                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <Pressable style={({ pressed }) => [styles.btn, {
                        backgroundColor: pressed ? "blue" : "skyblue",
                        opacity: pressed ? .5 : 1
                    }]} onPress={handleCreateNewAccount}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
                    </Pressable>
                    <Pressable style={styles.txtStyleAlreadyHaveAcc} onPress={() => navigation.navigate("LogInScreen")}>
                        <Text>
                            Already have an account? <Text style={styles.btnToSignUpPage}>Sign In</Text>
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
    btnToSignUpPage: {
        color: "#1C6DD0"
    }
});