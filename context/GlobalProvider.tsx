import { getCurrentUser } from '@/lib/appwrite';
import { ThemeProvider } from '@react-navigation/native';
import { createContext, useContext, useState, useEffect } from 'react'


const GlobalContextProvider = createContext<any>({});

export const useGlobalContext = () => useContext(GlobalContextProvider)

type Props = {
    children: React.ReactNode;
}

const GlobalProvider = ({ children }: Props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        getCurrentUser().then((res) => {
            if (res) {
                setIsLoggedIn(true);
                setUser(res);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
            .catch((err) => {
                console.log(err)
                throw new Error(err);
            }).finally(() => {
                setIsLoading(false);
            })
    }, [])

    return (
        <GlobalContextProvider.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContextProvider.Provider>
    )
}

export default GlobalProvider