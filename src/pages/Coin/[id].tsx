import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { uptdateDocCoin } from "../../backend/updateDocCoin";
import { IconeHome } from "../../components/coins/Icons";
import Layout from "../../components/layout/Layout";
import Trader from "../../components/trader/Trader";
import { db } from "../../firebase/firebase";
import { DadosString } from "../../types/Interfaces";
import * as S from "../../components/stylesPages/stylesCoin"

export default function MoedaUnica() {

    const {
        query: { id },
    } = useRouter()

    const [atualiza, setAtualiza] = useState(0)

    function atualizacao() {
        setAtualiza(prev => prev + 1)
    }

    // Recuperando dados do Firebase

    const [moedaUnica, setMoedaUnica] = useState<DocumentData>({})

    const loadData = useCallback(async () => {
        const docRef = doc(db, 'CoinList', `${id}`)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const data = docSnap.data()
            setMoedaUnica(data)
        }
    }, [id])

    useEffect(() => {
        loadData()
        const interval = setInterval(() => {
            loadData()
        }, 40000)
        return () => clearInterval(interval)
    }, [id, loadData, atualiza])

    //==================================================================   
    // Atualizando o valor das moedas

    useEffect(() => {
        if (moedaUnica.id != '') {
            uptdateDocCoin(moedaUnica.id)
        };
        const interval = setInterval(() => {
            if (moedaUnica.id != null) {
                uptdateDocCoin(moedaUnica.id)
            };
        }, 35000)
        return () => clearInterval(interval)
    }, [id, moedaUnica])

    //==================================================================

    const [dadosString, setDadosString] = useState<DadosString>({
        id: '',
        priceUsd: '',
        priceBr: '',
        marketCap: '',
        priceChange24h: '',
        priceChange7d: '',
        aporteTotal: '',
        moedas: '',
        lucroAtual: '',
        porcentagemAtual: '',
        lucroTotal: '',
        saldoTotal: '',
        precoMedio: '',
        porcentagemTotal: '',
        saldoAtual: '',
    })

    useEffect(() => {
        if (moedaUnica.priceUsd != null) {
            const data: DadosString = {
                id: moedaUnica.id.toString(),
                priceUsd: moedaUnica.priceUsd.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 3 }),
                priceBr: moedaUnica.priceBrz.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 3 }),
                marketCap: moedaUnica.marketCap.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 3 }),
                priceChange24h: moedaUnica.priceChange24h.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                priceChange7d: moedaUnica.priceChange7d.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                aporteTotal: moedaUnica.aporteTotal?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                moedas: moedaUnica.moedasTotal?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 4 }),
                lucroAtual: moedaUnica.lucroAtual?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                porcentagemAtual: moedaUnica.porcentagemAtual?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                lucroTotal: moedaUnica.lucroTotal?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                saldoTotal: moedaUnica.saldoTotal?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                precoMedio: moedaUnica.precoMedio?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                porcentagemTotal: moedaUnica.porcentagemTotal?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                saldoAtual: moedaUnica.saldoAtual?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            }
            setDadosString(data)
        }
    }, [id, moedaUnica])

    //====================================================================

    return (
        <Layout titulo={`${id}`} cabecalho={IconeHome} symbol={moedaUnica.symbol} image={moedaUnica.imageSmall}>
            <S.DivBody>
                <S.Informacoes>
                    <S.DadosGerais>
                        <p className="titulos">Aporte Total</p>
                        <p className="dados">{dadosString.aporteTotal} $</p>
                    </S.DadosGerais>
                    <S.DadosGerais>
                        <p className="titulos">Aporte Atual</p>
                        <p className="dados">{(moedaUnica.aporteAtual == null && moedaUnica.precoMedio == 0) ? '0,00'
                            : ( moedaUnica.aporteAtual?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || dadosString.aporteTotal)} $</p>
                    </S.DadosGerais>
                    <S.DadosGerais>
                        <p className="titulos">Qtd. Moedas</p>
                        <p className="dados">{dadosString.moedas}</p>
                    </S.DadosGerais>
                    <S.DadosGerais>
                        <p className="titulos">Preço Médio</p>
                        <p className="dados">{dadosString.precoMedio} $</p>
                    </S.DadosGerais>
                    <S.DadosGerais>
                        <p className="titulos">Lucro US$</p>
                        <S.Aporte color={(dadosString.lucroAtual || dadosString.lucroTotal) >= '0' ? '#12ef0f' : 'red'} className="dados">
                            {dadosString.lucroAtual || dadosString.lucroTotal} $
                        </S.Aporte>
                    </S.DadosGerais>
                    <S.DadosGerais>
                        <p className="titulos">Lucro %</p>
                        <S.Aporte color={(dadosString.porcentagemAtual || dadosString.porcentagemTotal) >= '0' ? '#12ef0f' : 'red'} className="dados">
                            {(dadosString.porcentagemAtual == null && moedaUnica.precoMedio == 0) ? '0.00' : (dadosString.porcentagemAtual || dadosString.porcentagemTotal)} %
                        </S.Aporte>
                    </S.DadosGerais>
                    <S.DadosGerais>
                        <p className="titulos">Saldo</p>
                        <S.Saldo className="dados">
                            {dadosString.saldoAtual || dadosString.saldoTotal} $
                        </S.Saldo>
                    </S.DadosGerais>
                    <S.DivDados>
                        <p className="dadosGerais">US $ {dadosString.priceUsd}</p>
                        <p className="dadosGerais">BR $ {dadosString.priceBr}</p>
                        <p className="dadosGerais">Variação 24h {dadosString.priceChange24h}%</p>
                        <p className="dadosGerais">Variação 7d {dadosString.priceChange7d}%</p>
                        <p className="dadosGerais">Market Cap $ {dadosString.marketCap}</p>
                    </S.DivDados>
                </S.Informacoes>
                <S.DivTraders>
                    <Trader id={dadosString.id} priceUsd={moedaUnica.priceUsd} moedasTotal={moedaUnica.moedasTotal} Atualiza={atualizacao} />
                </S.DivTraders>
            </S.DivBody>
        </Layout>
    )
}

