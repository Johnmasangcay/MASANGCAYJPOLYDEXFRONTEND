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
    const [selectedPokemon2, setSelectedPokemon2] = useState({
        PokemonName: null
    })
    const [selectedPokemon3, setSelectedPokemon3] = useState({
        PokemonName: null
    })
    const [selectedPokemon4, setSelectedPokemon4] = useState({
        PokemonName: null
    })
    const [selectedPokemon5, setSelectedPokemon5] = useState({
        PokemonName: null
    })
    const [selectedPokemon6, setSelectedPokemon6] = useState({
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
    const [createTeamToDash, setCreateTeamToDash] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState({selectedTeam: null})
    return (
        <>
            <UserContext.Provider value={{
                currentUser, setCurrentUser, selectedPokemon, setSelectedPokemon, selectedPokemonType, setSelectedPokemonType,
                selectedPokemonAbility1, setSelectedPokemonAbility1, selectedPokemonAbility2, setSelectedPokemonAbility2,
                usersFavData, setUsersFavData, usersTeam, setUsersTeam, route, setRoute, createTeamToDash, setCreateTeamToDash,
                selectedPokemon2, setSelectedPokemon2, selectedPokemon3, setSelectedPokemon3, selectedPokemon4, setSelectedPokemon4,
                selectedPokemon5, setSelectedPokemon5, selectedPokemon6, setSelectedPokemon6, selectedTeam, setSelectedTeam
                            }}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContext;