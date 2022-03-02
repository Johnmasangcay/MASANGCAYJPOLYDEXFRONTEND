import { createContext, useState } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        Username: null,
        Id: null,
        FirstName: null,
        LastName: null
    });
    const [selectedPokemon, setSelectedPokemon] = useState({
        PokemonName: null
    })
    const [selectedPokemonType, setSelectedPokemonType] = useState({
        PokemonType: null
    })
    const [selectedPokemonAbility1, setSelectedPokemonAbility1] = useState({
        PokemonAbility1: null
    })
    const [selectedPokemonAbility2, setSelectedPokemonAbility2] = useState({
        PokemonAbility2: null
    })
    return (
        <>
            <UserContext.Provider value={{
                currentUser, setCurrentUser, selectedPokemon, setSelectedPokemon, selectedPokemonType, setSelectedPokemonType,
                selectedPokemonAbility1, setSelectedPokemonAbility1, selectedPokemonAbility2, setSelectedPokemonAbility2
            }}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContext;