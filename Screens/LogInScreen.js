import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button } from 'react-native';
import polydexBg from '../assets/polydexbg.jpg'
import UserContext from './Context/UserContext';

export default function LogInScreen({ navigation }) {

    const [logInUsername, setLogInUsername] = useState("");
    const [logInPassword, setLogInPassword] = useState("");
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const handleGetUser = async (username) => {
        await fetch("http://192.168.12.253:5263/User/GetCurrentUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Username": username,
            })
        })
            .then(currentUserResp => currentUserResp.json())
            .then(currentUserData => {
                console.log(currentUserData)
            })
    }

    const handleLogIn = async () => {
        await fetch("http://192.168.12.253:5263/User/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Username": logInUsername,
                "Password": logInPassword
            })
        })
            .then(logInResp => logInResp.json())
            .then(logInData => {
                if (logInData.token != null) {
                    Alert.alert("Hello, " + logInUsername)
                    handleGetUser(logInUsername)
                    navigation.navigate("DashboardScreen");
                } else {
                    Alert.alert("Wrong Username or Password, Please Enter Again")
                }
                console.log(logInData.token)
            })

    }


    useEffect(() => {

    }, [])

    return (
        <>
            <View style={styles.container}>
                <View style={{ paddingTop: 180, alignItems: "center" }}>
                    <Text style={styles.titleStyle}>Sign In To PolyDex</Text>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.txtStyle}>Username</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder='Enter UserName'
                        onChangeText={setLogInUsername}
                        value={logInUsername}
                    />
                    <Text style={styles.txtStyle}>Password</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder='Enter Password'
                        onChangeText={setLogInPassword}
                        value={logInPassword}
                    />
                    <Pressable style={({ pressed }) => [styles.btn, {
                        backgroundColor: pressed ? "blue" : "skyblue",
                        opacity: pressed ? .5 : 1
                    }]} onPress={handleLogIn}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Log In</Text>
                    </Pressable>
                    <Pressable style={styles.txtStyleAlreadyHaveAcc} onPress={() => navigation.navigate("CreateAccScreen")}>
                        <Text>
                            Doesn't have an account? Sign Up
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
        paddingLeft: 120,
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