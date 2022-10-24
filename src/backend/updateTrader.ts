import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const updateTrader = async (id: string, SaldoTotal: number, AporteTotal: number, MoedasCompradasTotal: number,
    LucroTotal: number, PrecoMedio: number, MoedasVendidasTotal: number, PriceUsd: number, aportePortfolio: number) => {

    if (id != '') {
        const docRef = doc(db, 'CoinList', id)
        const porcentagemInicial = (((PriceUsd * MoedasCompradasTotal) / AporteTotal) - 1) * 100

        if (MoedasVendidasTotal != 0) {

            const moedas = MoedasCompradasTotal - MoedasVendidasTotal
            const newAporte = moedas * PrecoMedio
            const newSaldo = moedas * PriceUsd
            const newPorcentagem = ((((PriceUsd * moedas) / newAporte) - 1) * 100)
            const newLucro = ((PriceUsd * moedas) - newAporte)

            const payload = {
                saldoTotal: SaldoTotal,
                aporteTotal: AporteTotal,
                moedasTotal: moedas,
                lucroTotal: null,
                precoMedio: PrecoMedio,
                aporteAtual: newAporte,
                saldoAtual: newSaldo,
                porcentagemAtual: newPorcentagem,
                lucroAtual: newLucro,
                porcentagemTotal: null,
                AportePortfolio: aportePortfolio,
            }
            await updateDoc(docRef, payload);
        } else {
            const payload = {
                saldoTotal: SaldoTotal,
                aporteTotal: AporteTotal,
                moedasTotal: MoedasCompradasTotal,
                lucroTotal: LucroTotal,
                precoMedio: PrecoMedio,
                aporteAtual: null,
                porcentagemTotal: porcentagemInicial,
                saldoAtual: null,
                porcentagemAtual: null,
                lucroAtual: null,
                AportePortfolio: aportePortfolio,
            }
            await updateDoc(docRef, payload);
        }
    }
}