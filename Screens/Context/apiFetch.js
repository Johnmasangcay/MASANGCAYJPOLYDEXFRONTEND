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
    const GetSelectedAbility1 = async (ability1) => {
        let selectedAbility1;
        let resp = await fetch(`https://pokeapi.co/api/v2/ability/${ability1}`)
        let data = await resp.json();
        console.log(data);
        selectedAbility1 = data;
        return selectedAbility1;
    }

    const GetSelectedAbility2 = async (ability2) => {
        let selectedAbility2;
        let resp = await fetch(`https://pokeapi.co/api/v2/ability/${ability2}`)
        let data = await resp.json();
        console.log(data);
        selectedAbility2 = data;
        return selectedAbility2;
    }

    // type Dmg taken from
    const GetDmgTaken = async (type) => {
        let selectedType;
        let resp = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        let data = await resp.json();
        console.log(data);
        selectedType = data;
        return selectedType;
    }

    export {LogInFetch, GetUserFetch, GetSelectedPokemonData, GetSelectedAbility1, GetSelectedAbility2, GetDmgTaken}