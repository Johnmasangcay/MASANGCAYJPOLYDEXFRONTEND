import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Alert, ImageBackground, ActivityIndicator, Button, Modal, ScrollView, Image, StatusBar } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'
import ProgressBar from 'react-native-progress/Bar';
import UserContext from './Context/UserContext';

export default function PokemonInfoScreen({ navigation }) {

  const { selectedPokemon } = useContext(UserContext)
  const { selectedPokemonType } = useContext(UserContext)
  const { selectedPokemonAbility1 } = useContext(UserContext)
  const { selectedPokemonAbility2 } = useContext(UserContext)
  const [modalVisibleAbilities, setModalVisibleAbilities] = useState(false);


  useEffect(() => {
    console.log(selectedPokemonAbility1)
    console.log(selectedPokemonAbility2)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", borderBottomWidth: .9, borderBottomColor: "gainsboro", padding: 9 }}>
        <Text style={{ color: "black", paddingLeft: 5, fontSize: 20, fontWeight: "bold" }}>Pokemon Info</Text>
        <Text onPress={() => navigation.navigate("DashboardScreen")} style={{ fontSize: 20, paddingLeft: 240, color: "#494953" }}>Back</Text>
      </View>
      {/* //-------------------------------PokemonInfo------------------------------------------------------- */}
      <View style={[styles.btn, { backgroundColor: "#BCE0DA" }]}>
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          <Text style={[styles.txtstyleSelectedNAME, { marginTop: 40, position: "absolute" }]}>{selectedPokemon.name}</Text>
          <Image
            source={{ uri: selectedPokemon.sprites.front_default }}
            style={{
              flex: .8,
              height: 120,
              width: 120,
              marginLeft: 220,
              Position: "relative"
            }}
          />
        </View>
        <View style={{ flexDirection: "row", padding: 5 }}>
          {
            selectedPokemon.types.map((pokeType) => {
              return (
                <>
                  <Text style={[styles.txtstyleSelectedTYPE, { backgroundColor: "#EEEEEE", marginLeft: 40 }]}>{pokeType.type.name}</Text>
                </>
              )
            })
          }
        </View>
      </View>

      {/* //----------------------------ABILITIES----------------------------------------------------------------- */}
      <ScrollView>
        <View>
          <Text style={{ color: "#49495385", fontSize: 20, alignSelf: "center", marginTop: 30, fontWeight: "bold" }}>ABILITIES</Text>
        </View>
        <View style={[styles.btnAbilities, { backgroundColor: "#494953" }]}>
          <View>
            {
              selectedPokemon.abilities.map((pokeAbility) => {
                return (
                  <>
                    <Pressable style={({ pressed }) => { opacity: pressed ? .5 : 1 }}
                      onPress={async () => {
                        setModalVisibleAbilities(true)
                      }}>
                      <Text style={styles.pokemonAbilitiesTxtHidden}>{pokeAbility.ability.name}</Text>
                    </Pressable>
                  </>
                )
              })
            }
          </View>
        </View>

        {/* //----------------------------MOVES----------------------------------------------------------------- */}
        <View>
          <Text style={{ color: "#49495385", fontSize: 20, alignSelf: "center", marginTop: 30, fontWeight: "bold" }}>MOVES</Text>
        </View>
        <View style={[styles.btnMoves, { backgroundColor: "#494953" }]}>
          <ScrollView>
            {
              selectedPokemon.moves.map((pokeMoves) => {
                return (
                  <>
                    <Pressable>
                      <Text style={styles.pokemonMovesTxt}>{pokeMoves.move.name}</Text>
                    </Pressable>
                  </>
                )
              })
            }
          </ScrollView>
        </View>

        {/* //----------------------------BASE STAT----------------------------------------------------------------- */}
        <View>
          <Text style={{ color: "#49495385", fontSize: 20, alignSelf: "center", marginTop: 30, fontWeight: "bold" }}>Base Stat</Text>
        </View>
        <View style={[styles.baseStatContainer, { backgroundColor: "#494953" }]}>
          <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
            <Text style={[styles.baseStatNames]}>HP</Text>
            <ProgressBar progress={selectedPokemon.stats[0].base_stat / 100} width={300} height={25} color={"white"} />
          </View>
          <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
            <Text style={[styles.baseStatNames]}>Attack</Text>
            <ProgressBar progress={selectedPokemon.stats[1].base_stat / 100} width={300} height={25} color={"white"} />
          </View>
          <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
            <Text style={[styles.baseStatNames]}>Defense</Text>
            <ProgressBar progress={selectedPokemon.stats[2].base_stat / 100} width={300} height={25} color={"white"} />
          </View>
          <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
            <Text style={[styles.baseStatNames]}>Sp. Atk</Text>
            <ProgressBar progress={selectedPokemon.stats[3].base_stat / 100} width={300} height={25} color={"white"} />
          </View>
          <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
            <Text style={[styles.baseStatNames]}>Sp. Def</Text>
            <ProgressBar progress={selectedPokemon.stats[4].base_stat / 100} width={300} height={25} color={"white"} />
          </View>
          <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
            <Text style={[styles.baseStatNames]}>Speed</Text>
            <ProgressBar progress={selectedPokemon.stats[5].base_stat / 100} width={300} height={25} color={"white"} />
          </View>
        </View>

        {/* //----------------------------DMG TAKEN----------------------------------------------------------------- */}
        <View>
          <Text style={{ color: "#49495385", fontSize: 20, alignSelf: "center", marginTop: 30, fontWeight: "bold" }}>Damage Taken</Text>
        </View>
        <View style={[styles.baseStatContainer, { backgroundColor: "#494953" }]}>
          <View>
            <Text style={{ color: "#EEEEEE", fontSize: 20, alignSelf: "center", marginTop: 20, fontWeight: "bold" }}>Weak Against..</Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}>
            {
              selectedPokemonType.damage_relations.double_damage_from.map((poketype) => {
                return (
                  <>
                    <View>
                      <Text style={[styles.pokeTypeDmgTaken]}>{poketype.name}</Text>
                    </View>
                  </>
                )
              })
            }
          </View>

          <View>
            <Text style={{ color: "#EEEEEE", fontSize: 20, alignSelf: "center", marginTop: 20, fontWeight: "bold" }}>Super Effective..</Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}>
            {
              selectedPokemonType.damage_relations.double_damage_to.map((poketype) => {
                return (
                  <>
                    <View>
                      <Text style={[styles.pokeTypeDmgTaken]}>{poketype.name}</Text>
                    </View>
                  </>
                )
              })
            }
          </View>

          <View>
            <Text style={{ color: "#EEEEEE", fontSize: 20, alignSelf: "center", marginTop: 20, fontWeight: "bold" }}>Normal Effective..</Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 20 }}>
            {
              selectedPokemonType.damage_relations.half_damage_to.map((poketype) => {
                return (
                  <>
                    <View>
                      <Text style={[styles.pokeTypeDmgTaken]}>{poketype.name}</Text>
                    </View>
                  </>
                )
              })
            }
          </View>

        </View>
      </ScrollView>
      <View style={[styles.btnFooter, { backgroundColor: "#BCE0DA", margin: 15 }]}>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text style={[styles.txtFooter]}>Add To Team</Text>
        </View>
      </View>

      {/* //----------------------------MODALS----------------------------------------------------------------- */}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleAbilities}
          onRequestClose={() => {
            setModalVisibleAbilities(!modalVisibleAbilities);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={[styles.modalTxtAbiltyTitle]}>{selectedPokemonAbility1.name}</Text>
                <Text>{selectedPokemonAbility1.effect_entries[0].effect}</Text>
              </View>
              <View>
                <Text style={[styles.modalTxtAbiltyTitle]}>{selectedPokemonAbility2.name}</Text>
                <Text>{selectedPokemonAbility2.effect_entries[1].effect}</Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisibleAbilities(!modalVisibleAbilities)}
              >
                <Text style={styles.textStyle}>CLOSE</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: "flex-start",
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
    backgroundColor: "#BCE0DA",
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
  textStyle: {
    marginTop: 20,
    color: "#EEEEEE",
    backgroundColor: "#494953",
    fontWeight: "bold",
    textAlign: "center",
    height: 30,
    width: 60
  },
  btn: {
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 180,
    margin: 15
  },
  btnFooter: {
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 60,
  },
  btnAbilities: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    height: 120,
  },
  btnMoves: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    height: 210
  },
  baseStatContainer: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
    height: 350,

  },
  pokemonAbilitiesTxt: {
    backgroundColor: "#EEEEEE",
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    fontSize: 15,
    textAlign: "center",
  },
  pokemonAbilitiesTxtHidden: {
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 155,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 20,
    fontSize: 15,
    textAlign: "center",
    textTransform: 'capitalize',
  },
  pokemonMovesTxt: {
    backgroundColor: "#EEEEEE",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 20,
    fontSize: 15,
    textAlign: "center",
  },
  txtstyleSelectedTYPE: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: 'capitalize',
    borderRadius: 50,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20
  },
  txtstyleSelectedNAME: {
    flex: 1,
    fontSize: 40,
    textTransform: 'capitalize',
    paddingLeft: 50,
    fontWeight: "bold",
    color: "#323232"
  },
  baseStatNames: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 20,
    fontSize: 12,
    textAlign: "center",
    color: "#323232",
    borderRadius: 5,
    height: 27,
    width: 80,
  },
  pokeTypeDmgTaken: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 12,
    textAlign: "center",
    color: "#323232",
    borderRadius: 5,
    textTransform: 'capitalize',
    fontWeight: "bold",
  },
  txtFooter: {
    color: "#323232",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
  }, 
  modalTxtAbiltyTitle: {
    color: "#323232", 
    fontSize: 20, 
    alignSelf: "center", 
    marginTop: 20, 
    fontWeight: "bold"
  }
})