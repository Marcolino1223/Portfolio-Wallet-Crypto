import styled from "styled-components"

export const DivBody = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
`

export const DivBotoes = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #324dd4;
    padding-top: 15px;
    padding-bottom: 15px;
`
export const BotaoCompra = styled.button`
    color: white;
    background-color: green;
    margin-right: 10px;
    width: 100px;
    height: 40px;
    border: none;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
    :hover{
        background-color: #1ea71e;
    }
`
export const BotaoVenda = styled.button`
    color: white;
    background-color: #a50909;
    width: 100px;
    height: 40px;
    border: none;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
    :hover{
        background-color: #e82e2e;
    }
`
export const DivDadosTrader = styled.div`
    width: 100%;
    max-height: 420px;
    display: flex;
    overflow-y: scroll;
    flex-wrap: wrap;
    background-color: #00001C;
    border-radius: 20px;
    ::-webkit-scrollbar {
        width: 10px;               
    };
    ::-webkit-scrollbar-track {
        background: #040710;        /* color of the tracking area */
    };
    ::-webkit-scrollbar-thumb {
        background-color: #324dd4;    /* color of the scroll thumb */
        border-radius: 20px;       /* roundness of the scroll thumb */
        border: 3px solid black;  /* creates padding around scroll thumb */
    }
`


// Styles Component DadosTrader =================================

export const Container = styled.div`
    width: 250px;
    height: 230px;
    border-radius: 10px;
    margin: 20px 0px 0px 20px;
    
`
export const DivDadosCompra = styled.div`
    width: 246px;
    height: 220px;
    border: 2px solid #12ef0f;
    border-radius: 10px;
    .titulos {
        color: #29D3E4;
    }
`
export const DivDadosVenda = styled.div`
    width: 242px;
    height: 220px;
    border: 2px solid red;
    border-radius: 10px;
    .titulos {
        color: #29D3E4;
    }
`

export const Tabela = styled.table`
    width: 240px;
    height: 165px;
    margin: auto;
    color: #DBE7F3;
    .dados {
        font-size: 18px;
        text-align: end;
    }
`
export const TdPorcentagemLucro = styled.td<{ color: string }>`
    color: ${props => props.color};
`

export const DivBotaoDeleteTrader = styled.div`
    width: 240px;
    height: 25px;
    margin-top: 10px;
    text-align: end;
`

export const BotaoDeleteTrader = styled.button`
    width: 40px;
    height: 30px;
    border-radius: 50%;
    border: none;
    color: #CD2626;
    cursor: pointer;
    background-color: transparent;
    
    :hover {
        color: red;
    }
`
export const TitulosModal = styled.p`
    font-size: 16px;
    font-weight: bold;
`
export const InputModal = styled.input`
    width: 100%;
    height: 25px;
    border: 2px solid blue;
    background-color: transparent;
    color: white;
    font-weight: bold;
    font-size: 15px;
    outline: 0;
`
export const DivBotaoCompraTrader = styled.div`
    width: 100%;
    height: 35px;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const BotaoCompraTrader = styled.button`
    width: 100px;
    height: 35px;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
    background-color: green;
    color: white;
    font-weight: bold;
    :hover {
        background-color: #12ef0f;
    }
`
export const DivBotaoVendaTrader = styled.div`
    width: 100%;
    height: 35px;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const BotaoVendaTrader = styled.button`
     width: 100px;
    height: 35px;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
    background-color: #af1d1d;
    color: white;
    font-weight: bold;
    :hover {
        background-color: #ff0000;
    }
`