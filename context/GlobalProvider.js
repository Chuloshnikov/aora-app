import { createContext, useContext, useState, useEffect } from 'react';

import { getCurrentUser, getAccount } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log(isLoggedIn);

    useEffect(() => {
          getAccount()
          .then((res) => {
            console.log(res);
            if (res) {
              setIsLoggedIn(true);
              setUser(res);
            } else {
              setIsLoggedIn(false);
              setUser(null);
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, []);


    return (
        <GlobalContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;