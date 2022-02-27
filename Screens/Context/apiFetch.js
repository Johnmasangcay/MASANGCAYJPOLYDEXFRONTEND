const LogInFetch = async (logInUsername, logInPassword) => {
    let userToken;
    await fetch("http://192.168.12.253:5263/User/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "Username": logInUsername,
            "Password": logInPassword
        })
    })
        .then(logInResp => logInResp.json())
        .then(logInData => userToken = logInData)
        console.log(userToken)
        return userToken;
    }
// get logged in user data
    const GetUserFetch = async (logInUsername) => {
        let currentUser;
        await fetch("http://192.168.12.253:5263/User/GetCurrentUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Username": logInUsername,
            })
        })
            .then(currentUserResp => currentUserResp.json())
            .then(currentUserData => currentUser = currentUserData)
            console.log(currentUser);
            return currentUser;
    }
// get selected pokemon
    const GetSelectedPokemonData = async (pokemon) => {
        let selectedPokemonData;
        let resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        let data = await resp.json();
        console.log(data)
        selectedPokemonData = data;
        return selectedPokemonData;
    }

    // selected ability
    const GetSelectedAbility = async (ability) => {
        let selectedAbility;
        let resp = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
        let data = await resp.json();
        console.log(data);
        selectedAbility = data;
        return selectedAbility;
    }

    export {LogInFetch, GetUserFetch, GetSelectedPokemonData, GetSelectedAbility}