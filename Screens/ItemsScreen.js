import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image } from 'react-native';

export default function ItemScreen({ navigation }) {
  let star = "★"
  let starThin = "☆"
  let hamburgerMenu = "☰"
  const [isloaded, setIsloaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleItem, setModalVisibleItem] = useState(false);
  const [pokeItems, setPokeItems] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");
  const [defaultItem, setDeafaultItem] = useState();
  const [defaultItemDescription, setDeafaultItemDescription] = useState();


  const getItems = async () => {
    let resp = await fetch("https://pokeapi.co/api/v2/item-category/12");
    let data = await resp.json();

    function getItemObjects(itemObject) {
      itemObject.forEach(async (items) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/item/${items.name}`)
        const data = await resp.json();
        setDeafaultItem(data.name)
        setDeafaultItemDescription(data.flavor_text_entries[3].text)
        setPokeItems(currentArr => [...currentArr, data]);
      })
    }

    getItemObjects(data.items)
  }

  const filterItem = pokeItems.filter(pokeItem => {
    return pokeItem.name.toLowerCase().includes(pokeSearch.toLowerCase())
  })

  useEffect(() => {
    getItems()
    setTimeout(function () {
      setIsloaded(true)
    }, 5000)
  }, [])
  return (
    <>
      {!isloaded ?
        <ActivityIndicator style={{ flex: 1, backgroundColor: "#FFFEEC" }} size={"large"} color={"blue"} />
        :
        <View style={styles.container}>
          <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
            <Text onPress={() => setModalVisible(true)} style={{ fontSize: 30 }}>{hamburgerMenu}</Text>
            <Text style={{ color: "black", paddingLeft: 20, fontSize: 30, fontWeight: "bold" }}>ItemDex</Text>
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
          <View>
            <TextInput
              placeholder="🔍 What Pokemon Are You Looking For?"
              style={styles.input}
              onChangeText={setPokeSearch}
            />
          </View>

          <ScrollView style={{ paddingBottom: 20 }}>
            {
              filterItem.map((itemData, keyx) => {
                return (
                  <>
                    <Pressable style={({ pressed }) => [styles.btn, {
                      backgroundColor: pressed ? "blue" : "#EDF6E5",
                      opacity: pressed ? .5 : 1
                    }]} onPress={async () => {
                      setDeafaultItem(itemData.name)
                      setDeafaultItemDescription(itemData.effect_entries[0].effect)
                      setModalVisibleItem(true)
                    }}>
                      <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                        <Text style={[styles.txtstyleNAME]}>{itemData.name}</Text>
                        <View style={styles.txtstyleIMAGE}>
                          <Image
                            source={{ uri: itemData.sprites.default }}
                            style={{
                              height: 100,
                              width: 100,
                            }}
                          />
                        </View>
                      </View>
                    </Pressable>
                  </>
                )
              })
            }
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleItem}
                onRequestClose={() => {
                  setModalVisibleItem(!modalVisibleItem);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={[styles.modalTxtAbiltyTitle]}>{defaultItem}</Text>
                    <Text>{defaultItemDescription}</Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisibleItem(!modalVisibleItem)}
                    >
                      <Text style={styles.textStyle}>CLOSE</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </View>
      }
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
  modalTxtAbiltyTitle: {
    color: "#323232",
    fontSize: 20,
    alignSelf: "center",
    marginVertical: 20,
    fontWeight: "bold"
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
    fontSize: 40,
    textTransform: 'capitalize',
    paddingLeft: 40,
    paddingTop: 10,
    fontWeight: "bold",
    color: "#233142",
    position: "absolute",
  },
  txtstyleIMAGE: {
    paddingLeft: 280,
    position: "relative"
  },
  effect: {
    fontSize: 10,
    marginRight: 150,
  },
  input: {
    padding: 10,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
  }
});