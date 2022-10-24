export interface ApiPrincipal {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    high_24h: number;
    low_24h: number;
}

export interface DadosString {
    id: string;
    priceUsd: string;
    priceBr: string;
    marketCap: string;
    priceChange24h: string;
    priceChange7d: string;
    aporteTotal: string,
    moedas: string,
    lucroAtual: string,
    porcentagemAtual: string,
    saldoTotal: string;
    lucroTotal: string;
    precoMedio: string;
    porcentagemTotal: string;
    saldoAtual: string;
}

export interface TraderCompraProps {
    id: string;
    data: string;
    aporte: number;
    valorDaMoeda: number;
    priceUsd: number;
}

export interface DadosTraderPortfolio {
    idSec?: string;
    Aporte: number;
    MoedasCompradas: number
    PorcentagemLucro: number;
    LucroUsd: number;
    SaldoAtual: number;
    ValorDeCompra: number;
    Count: number;
    Saque: number;
    MoedasVendidas: number;
    ValorDeVenda: number;
}

export interface PortfolioProps {
    id: string;
    AportePortfolio: number;
    SaldoPortfolio: number;
    MoedasWallet: number;
}

export interface PortfolioHomeProps {
    id: string;
    saldo: number;
}

export interface WalletProps {
    id: string;
    name: string;
    imageSmall: string;
    aporteTotal: number;
    moedasTotal: number;
    aporteAtual: number;
    Lucro: string;
    Saldo: string;
    Rendimento: string;
    Moedas: string;
}

export interface WalletCoinProps {
    Id: string;
    Moedas: number;
    Saldo: number;
    Lucro: number;
    Rendimento: number;
}

export interface TradersDocProps {
    idSec: string;
    Data?: string;
    aporte?: number;
    ValorDeCompra: number;
    MoedasCompradas: number;
    saldo: number;
    lucroPorcent: number;
    lucroUSD: number;
    Saque: number;
    ValorDeVenda: number;
    MoedasVendidas: number;
    LucroVenda: number;
}

export interface TraderVendaProps {
    id: string;
    data: string
    valorSaque: number;
    valorDeVenda: number;
    quantDeMoedas: number;
}

export interface GetCoinDocs {
    id: string;
    moedasTotal: number;
}