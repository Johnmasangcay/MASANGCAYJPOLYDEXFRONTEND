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
    const [selectedMove1, setSelectedMove1] = useState({
        moveName: null})
    const [selectedMove2, setSelectedMove2] = useState({
        moveName: null})
    const [selectedMove3, setSelectedMove3] = useState({
        moveName: null})
    const [selectedMove4, setSelectedMove4] = useState({
        moveName: null})
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
    const [routeForSelectedPokeToMove, setRouteForSelectedPokeToMove] = useState(null)
    const [createTeamToDash, setCreateTeamToDash] = useState(false)
    const [selectedPokeToMove, setSelectedPokeToMove] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState({selectedTeam: null})
    const [selectedPokemonTeamViewer, setSelectedPokemonTeamViewer] = useState({selectedPokemonTeamViewer: null})
    const [condPokemon, setCondPokemon] = useState("poke1")
    const [condMove, setCondMove] = useState("move1")
    const [teamPokemon2Type, setTeamPokemon2Type] = useState({teamPokemon2Type: null})
    const [teamPokemon3Type, setTeamPokemon3Type] = useState({teamPokemon3Type: null})
    const [teamPokemon4Type, setTeamPokemon4Type] = useState({teamPokemon4Type: null})
    const [teamPokemon5Type, setTeamPokemon5Type] = useState({teamPokemon5Type: null})
    const [teamPokemon6Type, setTeamPokemon6Type] = useState({teamPokemon6Type: null})
    const [forSelectedTV, setForSelectedTV] = useState(false)
    const [arr, setArr] = useState([])
    const [getPokeData, setGetPokeData] = useState({selectedPoke: null})
    return (
        <>
            <UserContext.Provider value={{
                currentUser, setCurrentUser, selectedPokemon, setSelectedPokemon, selectedPokemonType, setSelectedPokemonType,
                selectedPokemonAbility1, setSelectedPokemonAbility1, selectedPokemonAbility2, setSelectedPokemonAbility2,
                usersFavData, setUsersFavData, usersTeam, setUsersTeam, route, setRoute, createTeamToDash, setCreateTeamToDash,
                selectedPokemon2, setSelectedPokemon2, selectedPokemon3, setSelectedPokemon3, selectedPokemon4, setSelectedPokemon4,
                selectedPokemon5, setSelectedPokemon5, selectedPokemon6, setSelectedPokemon6, selectedTeam, setSelectedTeam,
                selectedPokemonTeamViewer, setSelectedPokemonTeamViewer, condPokemon, setCondPokemon, teamPokemon2Type, setTeamPokemon2Type,
                teamPokemon3Type, setTeamPokemon3Type, teamPokemon4Type, setTeamPokemon4Type, teamPokemon5Type, setTeamPokemon5Type,
                teamPokemon6Type, setTeamPokemon6Type, condMove, setCondMove, routeForSelectedPokeToMove, setRouteForSelectedPokeToMove,
                selectedPokeToMove, setSelectedPokeToMove, selectedMove1, setSelectedMove1, selectedMove2, setSelectedMove2, selectedMove3, setSelectedMove3,
                selectedMove4, setSelectedMove4, forSelectedTV, setForSelectedTV, arr, setArr, getPokeData, setGetPokeData
                            }}>
                {children}
            </UserContext.Provider>
        </>
    )
}
export default UserContext;