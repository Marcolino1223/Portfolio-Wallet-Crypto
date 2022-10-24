import { useEffect, useState } from "react"
import { ApiPrincipal } from "../types/Interfaces"
import axios from "axios";

export const useApi = () => {
    const [allCoins, setAllCoins] = useState<ApiPrincipal[]>([])
    
    const loadCoins = async () => {

        const res = await axios.get('http://localhost:3001/')
        const resp = res.data
        setAllCoins(resp)
    }

    useEffect(() => {
        loadCoins()
        const interval = setInterval(() => {
            loadCoins();
        }, 30000);
        return () => clearInterval(interval);
    }, []);
    
    return {
        allCoins,
    }
}