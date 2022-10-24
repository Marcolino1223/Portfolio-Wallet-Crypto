import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { deleteTraderDoc } from "../../backend/deleteDocTrader"
import { db } from "../../firebase/firebase"
import { TradersDocProps } from "../../types/Interfaces"
import { IconeLixo } from "../coins/Icons"
import * as S from "./styles"

interface TraderProps {
    id: string,
    priceUsd: number,
    precoMedio: number,
    Atualiza: (state: number) => void,
}

export default function CompraVenda(props: TraderProps) {

    const [docTraders, setDocTraders] = useState<TradersDocProps[]>([])

    useEffect(() => {
        if (props.id != '') {
            onSnapshot(query(collection(db, `CoinList/${props.id}/Traders`), orderBy('Data')), (snapshot) => {
                const tradersDocs = (snapshot.docs.map((doc) => {
                    const { Aporte, MoedasCompradas, Data, ValorDeCompra, MoedasVendidas, Saque, ValorDeVenda } = doc.data();

                    const idSec = (doc.id).toString()
                    const aporte = parseFloat(Aporte)
                    const saldo = (props.priceUsd * MoedasCompradas)
                    const lucroPorcent = ((((props.priceUsd * MoedasCompradas) / Aporte) - 1) * 100)
                    const lucroUSD = ((props.priceUsd * MoedasCompradas) - Aporte)
                    const LucroVenda = (MoedasVendidas * ValorDeVenda) - (MoedasVendidas * props.precoMedio);

                    return ({ idSec, Data, aporte, ValorDeCompra, MoedasCompradas, saldo, lucroPorcent, lucroUSD, Saque, ValorDeVenda, MoedasVendidas, LucroVenda })
                }))
                setDocTraders(tradersDocs)
            })
        } else {
            return
        }
    }, [props.id, props.priceUsd, props.precoMedio])

    function deleteTrader(id: string, idSec: string) {
        deleteTraderDoc(id, idSec);
        props.Atualiza(1)
    }

    return (
        <>
            {docTraders.map((trade) => (
                <S.Container key={trade.idSec}>
                    {(trade.aporte != undefined && trade.aporte != 0) ? (
                        <S.DivDadosCompra>
                            <S.Tabela>
                                <tbody>
                                    <tr>
                                        <td className="titulos">Data</td>
                                        <td className="dados">{trade.Data}</td>
                                    </tr>
                                    <tr>
                                        <td className="titulos">Aporte</td>
                                        <td className="dados">{trade.aporte.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</td>
                                    </tr>
                                    <tr>
                                        <td className="titulos">Valor de Compra</td>
                                        <td className="dados">{trade.ValorDeCompra.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</td>
                                    </tr>
                                    <tr>
                                        <td className="titulos">Moedas</td>
                                        <td className="dados">{trade.MoedasCompradas.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 8 })}</td>
                                    </tr>
                                    <tr>
                                        <td className="titulos">Rendimento</td>
                                        <S.TdPorcentagemLucro color={trade.lucroPorcent >= 0 ? '#12ef0f' : 'red'} className="dados">
                                            {trade.lucroPorcent.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                        </S.TdPorcentagemLucro>
                                    </tr>
                                    <tr>
                                        <td className="titulos">Lucro USD</td>
                                        <S.TdPorcentagemLucro color={trade.lucroUSD >= 0 ? '#12ef0f' : 'red'} className="dados">
                                            {trade.lucroUSD.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $
                                        </S.TdPorcentagemLucro>
                                    </tr>
                                </tbody>
                            </S.Tabela>
                            <S.DivBotaoDeleteTrader>
                                <S.BotaoDeleteTrader onClick={() => deleteTrader(props.id, trade.idSec)}>{IconeLixo}</S.BotaoDeleteTrader>
                            </S.DivBotaoDeleteTrader>
                        </S.DivDadosCompra>
                    ) : (
                        <S.DivDadosVenda>
                            <S.Tabela>
                                <tbody>
                                    <tr>
                                        <td className="titulos">Data</td>
                                        <td className="dados">{trade.Data}</td>
                                    </tr>
                                    <tr>
                                        <td className="titulos">Valor do Saque</td>
                                        <td className="dados">{trade.Saque.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</td>
                                    </tr>
                                    <tr>
                                        <td className="titulos">Valor de Venda</td>
                                        <td className="dados">{trade.ValorDeVenda.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $</td>
                                    </tr>
                                    <tr>
                                        <td className="titulos">Moedas</td>
                                        <td className="dados">{trade.MoedasVendidas.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 8 })}</td>
                                    </tr>
                                    <tr>
                                        <td className="titulos">Lucro USD</td>
                                        <S.TdPorcentagemLucro color={trade.LucroVenda >= 0 ? '#12ef0f' : 'red'} className="dados">
                                            {trade.LucroVenda.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $
                                        </S.TdPorcentagemLucro>
                                    </tr>
                                </tbody>
                            </S.Tabela>
                            <S.DivBotaoDeleteTrader>
                                <S.BotaoDeleteTrader onClick={() => deleteTrader(props.id, trade.idSec)}>{IconeLixo}</S.BotaoDeleteTrader>
                            </S.DivBotaoDeleteTrader>
                        </S.DivDadosVenda>
                    )}
                </S.Container>
            ))}
        </>
    )
}