import {createContext, useState} from 'react';

const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(undefined);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
export {UserContext};