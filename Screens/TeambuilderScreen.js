import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';

export default function TeamBuilderScreen({ navigation }) {
  let hamburgerMenu = "☰"
  const [modalVisible, setModalVisible] = useState(false);
  const [isloaded, setIsloaded] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
          <Text onPress={() => setModalVisible(true)} style={{ fontSize: 30 }}>{hamburgerMenu}</Text>
          <Text style={{ color: "black", paddingLeft: 20, fontSize: 30, fontWeight: "bold" }}>TeamBuilder</Text>
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
      </View>
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
  modalText: {
    marginBottom: 25,
    textAlign: "left",
    fontSize: 20,
    color: "gainsboro"
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  btn: {
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    height: 100
  },
  btnSearch: {
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  txtstyleID: {
    fontSize: 15,
    alignSelf: "flex-start",
    paddingLeft: 20
  },
  txtstyleNAME: {
    flex: 1,
    fontSize: 30,
    textTransform: 'capitalize',
    paddingLeft: 150,
    fontWeight: "bold",
    color: "#233142",
  },
  txtstyleIMAGE: {
    flex: 1,
    paddingLeft: 330,
  },
  txtstyleTYPE: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: 'capitalize',
    marginVertical: 20,
    marginRight: 50,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  input: {
    padding: 10,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
  },
  natureIncreaseTextStyle: {
    fontSize: 20,
    backgroundColor: "#9DDCDC",
    height: 40,
    borderRadius: 20,
    textTransform: 'capitalize',
    paddingLeft: 50
  },
  increasedStatText: {
    marginRight: 130,
    color: "#323232"
  }
});