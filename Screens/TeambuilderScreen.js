import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';
import UserContext from './Context/UserContext';

export default function TeamBuilderScreen({ navigation }) {
  let hamburgerMenu = "☰"
  const [modalVisible, setModalVisible] = useState(false);
  const { usersTeam } = useContext(UserContext);

  useEffect(async () => {
    console.log(await usersTeam)
  }, [])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
          <Text onPress={() => setModalVisible(true)} style={{ fontSize: 30 }}>{hamburgerMenu}</Text>
          <Text style={{ color: "black", paddingLeft: 20, fontSize: 30, fontWeight: "bold" }}>TeamBuilder</Text>
          <Text onPress={() => navigation.navigate("CreateTeamScreen")} style={{ color: "black", paddingLeft: 180, fontSize: 30 }}>+</Text>
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


        <ScrollView>
          {
            usersTeam.map(poke => {
              return (
                <>
                  <View style={[styles.btn]}>
                    <Text style={[styles.teamNameStyle]}>{poke.teamname}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                          backgroundColor: pressed ? "blue" : "#494953",
                          opacity: pressed ? .5 : 1
                        }]}>
                          <Text onPress={console.log(poke)}>{poke.pokemon1}</Text>
                        </Pressable>
                      </View>
                      <View>
                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                          backgroundColor: pressed ? "blue" : "#494953",
                          opacity: pressed ? .5 : 1
                        }]}>
                          <Text>{poke.pokemon2}</Text>
                        </Pressable>
                      </View>
                      <View>
                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                          backgroundColor: pressed ? "blue" : "#494953",
                          opacity: pressed ? .5 : 1
                        }]}>
                          <Text>{poke.pokemon3}</Text>
                        </Pressable>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                          backgroundColor: pressed ? "blue" : "#494953",
                          opacity: pressed ? .5 : 1
                        }]}>
                          <Text>{poke.pokemon4}</Text>
                        </Pressable>
                      </View>
                      <View>
                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                          backgroundColor: pressed ? "blue" : "#494953",
                          opacity: pressed ? .5 : 1
                        }]}>
                          <Text>{poke.pokemon5}</Text>
                        </Pressable>
                      </View>
                      <View>
                        <Pressable style={({ pressed }) => [styles.btnSelection, {
                          backgroundColor: pressed ? "blue" : "#494953",
                          opacity: pressed ? .5 : 1
                        }]}>
                          <Text>{poke.pokemon6}</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>

                </>
              )
            })
          }
        </ScrollView>
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
    height: 460,
    backgroundColor: "#EDF6E5",
  },
  teamNameStyle: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center"
  },
  btnSelection: {
    marginHorizontal: 5,
    marginVertical: 10,
    height: 180,
    width: 115,
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
});