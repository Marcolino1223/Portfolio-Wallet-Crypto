import { createContext, useState } from "react";

type GlobalProviderProps = {
    children: React.ReactNode
}

type UserContextProps = {
    efeito: number,
    setEfeito: (newState: number) => void
}

const initialValue = {
    efeito: 0,
    setEfeito: () => {},
}

export const GlobalData = createContext<UserContextProps>(initialValue)

export const GlobalProvider = ( {children} : GlobalProviderProps) => {

    const [efeito, setEfeito] = useState(initialValue.efeito)

    return (
        <GlobalData.Provider value={{efeito, setEfeito}}>
            {children}
        </GlobalData.Provider>
    )
}