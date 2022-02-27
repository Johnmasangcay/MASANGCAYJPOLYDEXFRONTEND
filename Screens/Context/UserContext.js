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
    return (
        <>
            <UserContext.Provider value={{ currentUser, setCurrentUser, selectedPokemon, setSelectedPokemon }}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContext;