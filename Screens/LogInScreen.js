import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button } from 'react-native';
import polydexBg from '../assets/polydexbg.jpg'
import loginBg from '../assets/114998.webp';
import { LogInFetch } from './Context/apiFetch';
import { GetUserFetch } from './Context/apiFetch';
import UserContext from './Context/UserContext';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
import {
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold
} from '@expo-google-fonts/dancing-script'

export default function LogInScreen({ navigation }) {

    const [logInUsername, setLogInUsername] = useState("");
    const [logInPassword, setLogInPassword] = useState("");
    const [usernameError, SetUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [userFoundError, setUserFoundError] = useState("");
    const { currentUser, setCurrentUser } = useContext(UserContext);
    let [fontsLoaded] = useFonts({
        DancingScript_400Regular,
        DancingScript_500Medium,
        DancingScript_600SemiBold,
        DancingScript_700Bold, 
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    const handleLogIn = async () => {
        if (logInUsername != "") {
            SetUsernameError("")
        } else {
            SetUsernameError("Please Type In A Username")
        }

        if (logInPassword != "") {
            setPasswordError("")
        } else {
            setPasswordError("Please Type In A Password")
        }

        if (logInUsername != "" && logInPassword != "") {
            const user = await LogInFetch(logInUsername, logInPassword);

            if (user.token != null) {
                setCurrentUser(await GetUserFetch(logInUsername));
                setUserFoundError("")
                navigation.navigate("DashboardScreen");
            } else {
                setUserFoundError("Username and/or Password is incorrect.");
            }
        }
    }

    return (
        <>

            <SafeAreaView style={styles.container}>
                <ImageBackground source={loginBg} style={{ flex: 1 }}>
                    <View style={{ paddingTop: 50, alignItems: "center" }}>
                        <Text style={[styles.titleStyle, { fontFamily: "DancingScript_700Bold" }]}>POLYDEX</Text>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={styles.txtStyle}>Username</Text>
                        <TextInput
                            style={styles.inputs}
                            placeholder='Enter UserName'
                            onChangeText={setLogInUsername}
                            value={logInUsername}
                        />
                        <Text style={styles.error}>{usernameError}</Text>
                        <Text style={styles.txtStyle}>Password</Text>
                        <TextInput
                            style={styles.inputs}
                            placeholder='Enter Password'
                            onChangeText={setLogInPassword}
                            value={logInPassword}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <Text style={styles.error}>{passwordError}</Text>
                        <Pressable style={({ pressed }) => [styles.btn, {
                            backgroundColor: pressed ? "blue" : "#393E46",
                            opacity: pressed ? .5 : 1
                        }]} onPress={handleLogIn}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Log In</Text>
                        </Pressable>
                        <Text style={styles.error}>{userFoundError}</Text>
                        <Pressable style={styles.txtStyleAlreadyHaveAcc} onPress={() => navigation.navigate("CreateAccScreen")}>
                            <Text>
                                Doesn't have an account? <Text style={styles.btnToSignUpPage}>Sign Up</Text>
                            </Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </SafeAreaView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
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
        fontSize: 65,
        color: "#393E46",
    },
    btn: {
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 10,
        margin: 20,
    },
    error: {
        color: "#FC4F4F",
        alignSelf: "center",
    },
    btnToSignUpPage: {
        color: "#1C6DD0"
    }
});