import { GlobalData } from '../contexts/GlobalContext';
import { useContext } from "react";

export function useGlobalContext() {
    const { efeito, setEfeito} = useContext(GlobalData)

    return {
        efeito,
        setEfeito
    }
}