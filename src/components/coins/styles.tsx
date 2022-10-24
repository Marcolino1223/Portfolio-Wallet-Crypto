import styled from "styled-components";

export const DivGeral = styled.div`
    width: 100%;
    height: 95%;
    margin-top: 15px;
    margin-bottom: 15px;
`
export const DivCabecalho = styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #4865FF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dash {
        color: #4865FF;
        font-size: 20px;
        font-weight: bold;
        margin-left: 20px;
    }
`

export const Body = styled.div`
    width: 100%;
    max-height: 83%;
    overflow-y: scroll;
    margin-top: 20px;
    ::-webkit-scrollbar {
        width: 10px;               
    };
    ::-webkit-scrollbar-track {
        background: #040710;        /* color of the tracking area */
    };
    ::-webkit-scrollbar-thumb {
        background-color: #3a56e2;    /* color of the scroll thumb */
        border-radius: 20px;       /* roundness of the scroll thumb */
        border: 3px solid black;  /* creates padding around scroll thumb */
    }
`
export const Conteiner = styled.div`
    width: 100%;
    height: 80px;
    margin: 10px 0;
    display: flex;
    :hover {
        background-color: #000034;
        border-radius: 10px;
    }
`
export const DivImagem = styled.div`
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: center;

    .imagem {
        width: 35px;
        height: 35px;
    }
`
export const DivNomeSimbolo = styled.div`
    width: 15%;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    .nome {
        width: 50px;
        margin-left: 10px;
    }
    .symbol {
        text-transform: uppercase;
        color: #777676;
    }
`
export const DivPrice = styled.div`
    width: 10%;
    margin-right: 15px;
    font-weight: bold;
    display: flex;
    text-align: end;
    justify-content: end;
`
export const ChangeUSD = styled.a<{ color: string }>`
    font-size: 15px;
    color: ${props => props.color};
`

export const DivPriceHight24h = styled.div`
    width: 15%;
    font-weight: bold;
    display: flex;
    text-align: center;
    justify-content: center;
    .hight24h {
        color: #777676; 
    }
`

export const DivPorcentageChange24h = styled.div`
    width: 15%;
    font-weight: bold;
    display: flex;
    text-align: center;
    justify-content: center;
    .change24h {
        color: #777676;
    }
`
export const Change24h = styled.a<{ color: string }>`
    color: ${props => props.color};
`

export const DivPriceLow24h = styled.div`
    width: 15%;
    font-weight: bold;
    display: flex;
    text-align: center;
    justify-content: center;
    .change7d {
        color: #777676;
    }
`

export const DivMarketCap = styled.div`
    width: 17%;
    font-weight: bold;
    display: flex;
    text-align: center;
    justify-content: center;
    .marketCap {
        color: #777676;
    }
`
export const DivBotaoDelete = styled.div`
    width: 40px;
    display: flex;
    align-items: center;
`

export const BotaoDelete = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    color: #0c9f07;
    cursor: pointer;
    background-color: transparent;
    
    :hover {
        color: #12ef0f;
    }
`