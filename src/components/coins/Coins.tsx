import React, { useState } from "react"
import { ApiPrincipal } from "../../types/Interfaces"
import * as S from "./styles"
import { IconeAdicionar } from "./Icons"
import { useApi } from "../../hooks/useApi"
import { Search } from "../search/styles"
import { setDocHome } from "../../backend/setDocHome"

export default function Coins() {

    const { allCoins } = useApi()
    
    const [search, setSearch] = useState('');

    const searchCoins = allCoins.filter((coin: ApiPrincipal) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
    )

    const handleChange = (e: any) => {
        e.preventDefault();
        setSearch(e.target.value.toLowerCase())
    }


    return (
        <S.DivGeral>
            <S.DivCabecalho>
                <a className="dash">DashBoard</a>
                <Search placeholder="Search..." onChange={handleChange}/>
            </S.DivCabecalho>
            <S.Body>
                {searchCoins.map((coin) => (
                    <S.Conteiner key={coin.id}>
                        <S.DivImagem>
                            <img src={coin.image} alt="simbolo da coin" className="imagem" />
                        </S.DivImagem>
                        <S.DivNomeSimbolo>
                                <p className="nome">{coin.name}<br />
                                    <a className="symbol">{coin.symbol}_#{coin.market_cap_rank}</a>
                                </p>
                        </S.DivNomeSimbolo>
                        <S.DivPrice>
                            <p>${coin.current_price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}<br />
                                <S.ChangeUSD color={coin.price_change_24h >= 0 ? '#27ff47' : 'red'}>
                                    {coin.price_change_24h > 0 ? `$+${coin.price_change_24h.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}`
                                        : `$${coin.price_change_24h.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                </S.ChangeUSD>
                            </p>
                        </S.DivPrice>
                        <S.DivPorcentageChange24h>
                            <p>
                                <S.Change24h color={coin.price_change_percentage_24h >= 0 ? '#27ff47' : 'red'}>
                                    {coin.price_change_percentage_24h > 0 ? `+${coin.price_change_percentage_24h.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
                                        : `${coin.price_change_percentage_24h.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`}
                                </S.Change24h><br />
                                <a className="change24h">24h</a>
                            </p>
                        </S.DivPorcentageChange24h>
                        <S.DivPriceHight24h>
                            <p>
                                <a>${coin.high_24h.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}</a><br />
                                <a className="hight24h">hight 24h</a>
                            </p>
                        </S.DivPriceHight24h>
                        <S.DivPriceLow24h>
                            <p>
                                <a>${coin.low_24h.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}</a><br />
                                <a className="change7d">low 24h</a>
                            </p>
                        </S.DivPriceLow24h>
                        <S.DivMarketCap>
                            <p>{coin.market_cap.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}<br />
                                <a className="marketCap">Market Cap</a>
                            </p>
                        </S.DivMarketCap>
                        <S.DivBotaoDelete>
                            <S.BotaoDelete onClick={() => setDocHome(coin.id)}>{IconeAdicionar}</S.BotaoDelete>
                        </S.DivBotaoDelete>
                    </S.Conteiner>
                ))}
            </S.Body>
        </S.DivGeral>
    )
}