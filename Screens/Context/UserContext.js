import { createContext, useState } from "react";
const UserContext = createContext();
export const UserProvider = ({children}) => {
        const [currentUser, setCurrentUser] = useState({
            Username: null,
            Id: null,
            FirstName: null,
            LastName: null
        });
        return(
            <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                {children}
            </UserContext.Provider>
        )
}
export default UserContext;