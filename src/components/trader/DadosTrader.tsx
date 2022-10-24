import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { updateTrader } from "../../backend/updateTrader"
import { db } from "../../firebase/firebase"
import { DadosTraderPortfolio } from "../../types/Interfaces"
import CompraVenda from "./CompraVenda"

interface TraderProps {
    id: string,
    priceUsd: number,
    Atualiza: (state: number) => void
}

export default function DadosTrader(props: TraderProps) {

    //Recuperando dados do Firebase ========================================================

    const [traders, setTraders] = useState<DadosTraderPortfolio[]>([])
    const idPri = props.id

    useEffect(() => {
        if (idPri != '') {
            onSnapshot(query(collection(db, `CoinList/${idPri}/Traders`), orderBy('Data')), (snapshot) => {
                const tradersDocs = (snapshot.docs.map((doc) => {
                    const { Aporte, MoedasCompradas, ValorDeCompra, Count, Saque, MoedasVendidas, ValorDeVenda } = doc.data();

                    const idSec = (doc.id).toString()
                    const SaldoAtual = (props.priceUsd * MoedasCompradas)
                    const PorcentagemLucro = ((((props.priceUsd * MoedasCompradas) / Aporte) - 1) * 100)
                    const LucroUsd = ((props.priceUsd * MoedasCompradas) - Aporte)

                    return ({
                        Aporte, MoedasCompradas, idSec, SaldoAtual, PorcentagemLucro, LucroUsd,
                        ValorDeCompra, Count, Saque, MoedasVendidas, ValorDeVenda,
                    })
                }))
                setTraders(tradersDocs)
            })
        } else {
            return
        }
    }, [idPri, props.priceUsd])

    //=======================================================================================

    const [SaldoTotal, setSaldoTotal] = useState<number>(0);
    const [AporteTotal, setAporteTotal] = useState<number>(0);
    const [MoedasCompradasTotal, setMoedasCompradasTotal] = useState<number>(0);
    const [LucroTotal, setLucroTotal] = useState<number>(0);
    const [PrecoMedio, setPrecoMedio] = useState<number>(0);
    const [PrecoMedioVenda, setPrecoMedioVenda] = useState<number>(0);
    const [MoedasVendidasTotal, setMoedasVendidasTotal] = useState<number>(0);
    const [aportePortfolio, setAportePortfolio] = useState<number>(0);

    useEffect(() => {
        const somaSaldo = traders.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.SaldoAtual)
        }, 0);
        const somaAporte = traders.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.Aporte)
        }, 0);
        const somaMoedas = traders.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.MoedasCompradas)
        }, 0);
        const somaLucro = traders.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.LucroUsd)
        }, 0);
        const precoTotal = traders.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.ValorDeCompra)
        }, 0);
        const count = traders.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.Count)
        }, 0);
        const moedasVenda = traders.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.MoedasVendidas)
        }, 0);

        if ((somaMoedas - moedasVenda) <= 0) {
            const precoMedio = (precoTotal / count);
            setPrecoMedio(0);
            setPrecoMedioVenda(precoMedio);
            setSaldoTotal(0);
            setAporteTotal(somaAporte);
            setMoedasCompradasTotal(0);
            setLucroTotal(0);
            setMoedasVendidasTotal(0);
            setAportePortfolio(0);
        } else if (moedasVenda == 0) {
            const precoMedio = (precoTotal / count);
            setPrecoMedio(precoMedio);
            setSaldoTotal(somaSaldo);
            setPrecoMedioVenda(precoMedio);
            setAporteTotal(somaAporte);
            setMoedasCompradasTotal(somaMoedas);
            setLucroTotal(somaLucro);
            setMoedasVendidasTotal(moedasVenda);
            setAportePortfolio(somaAporte);
        } else {
            const precoMedio = (precoTotal / count);
            const AportePortfolio = ((somaMoedas - moedasVenda) * precoMedio)
            setPrecoMedio(precoMedio);
            setSaldoTotal(somaSaldo);
            setPrecoMedioVenda(precoMedio);
            setAporteTotal(somaAporte);
            setMoedasCompradasTotal(somaMoedas);
            setLucroTotal(somaLucro);
            setMoedasVendidasTotal(moedasVenda);
            setAportePortfolio(AportePortfolio);
        }

    }, [traders])

    useEffect(() => {
        updateTrader(idPri, SaldoTotal, AporteTotal, MoedasCompradasTotal, LucroTotal, PrecoMedio, MoedasVendidasTotal, props.priceUsd, aportePortfolio)
        const interval = setInterval(() => {
            updateTrader(idPri, SaldoTotal, AporteTotal, MoedasCompradasTotal, LucroTotal, PrecoMedio, MoedasVendidasTotal, props.priceUsd, aportePortfolio)
        }, 32000)
        return () => clearInterval(interval)
    }, [idPri, SaldoTotal, AporteTotal, MoedasCompradasTotal, LucroTotal, PrecoMedio, MoedasVendidasTotal, props.priceUsd, aportePortfolio])

    return (
        <>
            <CompraVenda id={props.id} priceUsd={props.priceUsd} precoMedio={PrecoMedioVenda} Atualiza={props.Atualiza} />
        </>
    )
}