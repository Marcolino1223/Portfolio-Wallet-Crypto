import { IconeHome, IconeLixo } from "../../components/coins/Icons";
import Layout from "../../components/layout/Layout";
import { collection, DocumentData, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deletarDoc } from "../../backend/deleteDoc";
import { db } from "../../firebase/firebase";
import { WalletProps } from "../../types/Interfaces";
import * as S from "../../components/stylesPages/stylesWallet"
import axios from "axios";
import { updateWallet } from "../../backend/updateWallet";

export default function Wallet() {
    const [docCoins, setDocCoins] = useState<WalletProps[]>([])
    const [getCoin, setGetCoin] = useState<DocumentData[]>([])

    const getCoins = async () => {
        const data = await getDocs(collection(db, 'CoinList'));
        setGetCoin(data.docs.map((doc)=>({...doc.data()})))
    }

    const recuperarDados = () => {
        onSnapshot(query(collection(db, 'CoinList'), orderBy('marketCapRank')), (snapshot) => {
            const dataCoins = (snapshot.docs.map((doc) => {
                const { id, name, imageSmall, aporteTotal, moedasTotal, aporteAtual, LucroWallet, SaldoWallet, RendimentoWallet, MoedasWallet } = doc.data();

                const Lucro = LucroWallet?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                const Saldo = SaldoWallet?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                const Rendimento = RendimentoWallet?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                const Moedas = MoedasWallet?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

                return ({ id, name, imageSmall, aporteTotal, moedasTotal, aporteAtual, Lucro, Saldo, Rendimento, Moedas })
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
        }, 60000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        getCoin.map(async (doc) => {
            const res = await axios.get(`http://localhost:3001/Coin?id=${doc.id}`)
            const resp = res.data;
            const price = resp.market_data.current_price.usd
            if (doc.moedasTotal > 0) {
                const saldo = (doc.moedasTotal * price);
                const lucro = (saldo - (doc.aporteAtual || doc.aporteTotal));
                const rendimento = (((saldo * 100) / (doc.aporteAtual || doc.aporteTotal)) - 100)

                const coinWallet = {
                    Id: doc.id,
                    Moedas: doc.moedasTotal,
                    Saldo: saldo,
                    Lucro: lucro,
                    Rendimento: rendimento,
                }
                updateWallet(coinWallet)
            } else {
                const coinWallet = {
                    Id: doc.id,
                    Moedas: 0,
                    Saldo: 0,
                    Lucro: 0,
                    Rendimento: 0,
                }
                updateWallet(coinWallet)
            }
        })
    }, [getCoin])

    return (
        <Layout titulo="Wallet" cabecalho={IconeHome}>
            <S.DivBody>
                <S.DivCabecalho>
                    <a className="portfolio">Wallet</a>
                </S.DivCabecalho>
                <S.DivDadosGerais>
                    {docCoins.map((coin) => (
                        <S.Container key={coin.id}>
                            <S.DivHead>
                                <Link href={`/Coin/${coin.id}`}>
                                    <S.DivNomeImagem>
                                        <a className="nome">{coin.name}</a>
                                        <img src={coin.imageSmall} alt="simbolo da moeda" className="imagem" />
                                    </S.DivNomeImagem>
                                </Link>
                                <S.DivBotaoDelete>
                                    <S.BotaoDelete onClick={() => deletarDoc(coin.id)}>{IconeLixo}</S.BotaoDelete>
                                </S.DivBotaoDelete>
                            </S.DivHead>
                            <S.DivDados>
                                <S.Tabela>
                                    <tbody>
                                        <tr>
                                            <td className="titulos">Aportado</td>
                                            <td className="dados">{(coin.aporteAtual == null && coin.moedasTotal == 0) ? '0,00'
                                                : (coin.aporteAtual?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                                    || coin.aporteTotal?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))} $</td>
                                        </tr>
                                        <tr>
                                            <td className="titulos">Moedas</td>
                                            <td className="dados">{coin.Moedas}</td>
                                        </tr>
                                        <tr>
                                            <td className="titulos">Saldo</td>
                                            <S.Saldo className="dados">{coin.Saldo} $</S.Saldo>
                                        </tr>
                                        <tr>
                                            <td className="titulos">Rendimento</td>
                                            <S.TdLucroUsd color={(coin.Rendimento) >= '0' ? '#12ef0f' : 'red'} className="dados">
                                                {coin.Rendimento} %
                                            </S.TdLucroUsd>
                                        </tr>
                                        <tr>
                                            <td className="titulos">Lucro USD</td>
                                            <S.TdLucroUsd color={(coin.Lucro) >= '0' ? '#12ef0f' : 'red'} className="dados">
                                                {coin.Lucro} $
                                            </S.TdLucroUsd>
                                        </tr>
                                    </tbody>
                                </S.Tabela>
                            </S.DivDados>
                        </S.Container>
                    ))}
                </S.DivDadosGerais>
            </S.DivBody >
        </Layout>
    )
}