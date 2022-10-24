import axios from "axios"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const setDocHome = async (id: string) => {

    if (id != '') {
        const res = await axios.get(`http://localhost:3001/Coin?id=${id}`);
        const resp = (res.data);

        const payload = {
            id: resp.id,
            marketCapRank: resp.market_cap_rank,
            symbol: resp.symbol,
            name: resp.name,
            imageSmall: resp.image.small,
            imageLarge: resp.image.large,
            priceUsd: resp.market_data.current_price.usd,
            priceBrz: resp.market_data.current_price.brl,
            marketCap: resp.market_data.market_cap.usd,
            priceChange1h: resp.market_data.price_change_percentage_1h_in_currency.usd,
            priceChange24h: resp.market_data.price_change_percentage_24h,
            priceChange7d: resp.market_data.price_change_percentage_7d,
            priceChangeUsd: resp.market_data.price_change_24h,
            porcentagemAtual: 0,
            lucroAtual: 0,
            aporteTotal: 0,
            moedasTotal: 0,
            saldoTotal: 0,
            lucroTotal: 0,
            precoMedio: 0,
            LucroWallet: 0,
            MoedasWallet: 0,
            RendimentoWallet: 0,
            SaldoPortfolio: 0,
            SaldoWallet: 0,
            AportePortfolio: 0,
        }
        await setDoc(doc(db, 'CoinList', id), payload)
    }
}