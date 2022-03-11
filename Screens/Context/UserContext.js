import { createContext, useState } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        Username: null,
        Id: null,
        FirstName: null,
        LastName: null
    });
    const [newUser, setNewUser] = useState({
        newUsername: null,
        newUsernameId: null,
        newUsernameFirstName: null,
        newUsernameLastName: null
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
    const [usersFavData, setUsersFavData] = useState({
        FavData: null
    })
    const [usersTeam, setUsersTeam] = useState({
        userTeam: null
    })
    const [route, setRoute] = useState("PokemonInfoScreen")
    const [teambuilderToDash, setTeambuilderToDash] = useState(false)
    return (
        <>
            <UserContext.Provider value={{
                currentUser, setCurrentUser, selectedPokemon, setSelectedPokemon, selectedPokemonType, setSelectedPokemonType,
                selectedPokemonAbility1, setSelectedPokemonAbility1, selectedPokemonAbility2, setSelectedPokemonAbility2,
                usersFavData, setUsersFavData, usersTeam, setUsersTeam, route, setRoute, teambuilderToDash, setTeambuilderToDash
            }}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContext;