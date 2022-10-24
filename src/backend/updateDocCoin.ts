import axios from "axios"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const uptdateDocCoin = async (id: string) => {
    if (id != '') {
        const res = await axios.get(`http://localhost:3001/Coin?id=${id}`)
        const resp = (res.data)
        const docRef = doc(db, 'CoinList', id)
        const payload = {
            marketCapRank: resp.market_cap_rank,
            priceUsd: resp.market_data.current_price.usd,
            priceBrz: resp.market_data.current_price.brl,
            marketCap: resp.market_data.market_cap.usd,
            priceChange1h: resp.market_data.price_change_percentage_1h_in_currency.usd,
            priceChange24h: resp.market_data.price_change_percentage_24h,
            priceChange7d: resp.market_data.price_change_percentage_7d,
            priceChangeUsd: resp.market_data.price_change_24h,
        }
        await updateDoc(docRef, payload);
    }
}