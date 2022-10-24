import axios from "axios";
import { collection, DocumentData, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { updatePortfolio } from "../../backend/updatePortfolio";
import { db } from "../../firebase/firebase";
import { PortfolioProps } from "../../types/Interfaces";
import GraficoCharts from "./GraficoCharts";
import * as S from "./styles"

export default function Portfolio() {

    const [docCoins, setDocCoins] = useState<PortfolioProps[]>([])
    const [AporteTotal, setAporteTotal] = useState<number>(0)
    const [TotalMoedas, setTotalMoedas] = useState<number>(0)
    const [rendimentoGeral, setRendimentoGeral] = useState<number>(0)
    const [lucroGeral, setLucroGeral] = useState<number>(0)
    const [getCoinPortfolio, setGetCoinPortfolio] = useState<DocumentData[]>([])

    const getCoins = async () => {
        const data = await getDocs(collection(db, 'CoinList'));
        setGetCoinPortfolio(data.docs.map((doc) => ({ ...doc.data() })))
    }

    const recuperarDados = () => {
        onSnapshot(query(collection(db, 'CoinList'), orderBy('marketCapRank')), (snapshot) => {
            const dataCoins = (snapshot.docs.map((doc) => {
                const { id, AportePortfolio, SaldoPortfolio, MoedasWallet } = doc.data();

                return ({ id, AportePortfolio, SaldoPortfolio, MoedasWallet })
            }))
            setDocCoins(dataCoins)
        })
    }

    useEffect(() => {
        recuperarDados()
        getCoins()
        const interval = setInterval(() => {
            recuperarDados()
            getCoins()
        }, 70000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const somaAporte = docCoins.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.AportePortfolio)
        }, 0);
        const moedas = docCoins.reduce((acumulador) => {
            return acumulador + 1
        }, 0);
        const saldoTotal = docCoins.reduce((acumulador, valorAtual) => {
            return acumulador + (valorAtual.SaldoPortfolio)
        }, 0)
        setAporteTotal(somaAporte)
        setTotalMoedas(moedas)

        const rendimento = (((saldoTotal * 100) / somaAporte) - 100)
        const lucro = saldoTotal - somaAporte

        setRendimentoGeral(rendimento)
        setLucroGeral(lucro)

    }, [docCoins])

    useEffect(() => {
        console.log('effect')
        getCoinPortfolio.map(async (doc) => {
            const res = await axios.get(`http://localhost:3001/Coin?id=${doc.id}`)
            const resp = res.data;
            const price = resp.market_data.current_price.usd
            console.log(price)
            if (doc.moedasTotal > 0) {
                const saldoportfolio = (doc.MoedasWallet) * (price);
                const dadosPortfolio = {
                    id: doc.id,
                    saldo: saldoportfolio,
                }
                updatePortfolio(dadosPortfolio)
            } else {
                const dadosPortfolio = {
                    id: doc.id,
                    saldo: 0,
                }
                updatePortfolio(dadosPortfolio)
            }
        })
    }, [getCoinPortfolio])

    return (
        <S.DivBody>
            <S.DivCabecalho>
                <a className="portfolio">Portfolio</a>
            </S.DivCabecalho>
            <S.DivGraficoCharts>
                <GraficoCharts />
            </S.DivGraficoCharts>
            <S.DivDadosGerais>
                <S.Container>
                    <p className="titulos">Contributed</p>
                    <p className="dados">{AporteTotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</p>
                </S.Container>
                <Link href="/wallet/Wallet">
                    <S.Container className="coins">
                        <p className="titulos">Coins in Wallet</p>
                        <p className="dados">{TotalMoedas} coins</p>
                    </S.Container>
                </Link>
                <S.Container>
                    <p className="titulos">Yield</p>
                    <S.RendimentoLucro color={rendimentoGeral >= 0 ? '#27ff47' : 'red'} className="dados">
                        {rendimentoGeral.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %
                    </S.RendimentoLucro>
                </S.Container>
                <S.Container>
                    <p className="titulos">Profit USD</p>
                    <S.RendimentoLucro color={lucroGeral >= 0 ? '#27ff47' : 'red'} className="dados">
                        {lucroGeral.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $
                    </S.RendimentoLucro>
                </S.Container>
            </S.DivDadosGerais>
        </S.DivBody >
    )
}