import styled from "styled-components";

export const DivBody = styled.div`
    width: 100%;
    height: 90vh;
`
export const DivCabecalho = styled.div`
    width: 100%;
    height: 65px;
    border-bottom: 1px solid #4865FF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    .portfolio {
        color: #4865FF;
        font-size: 20px;
        font-weight: bold;
    }
`
export const DivDadosGerais = styled.div`
    width: 100%;
    max-height: 95%;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    ::-webkit-scrollbar {
        width: 10px;               
    };
    ::-webkit-scrollbar-track {
        background: #040710;        /* color of the tracking area */
    };
    ::-webkit-scrollbar-thumb {
        background-color: #334ed6;    /* color of the scroll thumb */
        border-radius: 20px;       /* roundness of the scroll thumb */
        border: 3px solid black;  /* creates padding around scroll thumb */
    }
`
export const Container = styled.div`   
    width: 210px;
    height: 220px;
    margin: 8px;
    border: 1px solid #4865FF;
    border-radius: 20px;
    margin-top: 25px;
    :hover {
        background-color: #000034;
    }
`
export const DivHead = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
   
`
export const DivNomeImagem = styled.div`
    width: 170px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nome {
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        margin-left: 20px;
        :hover {
            color: #ffffff;
        }
    }
    .imagem {
        width: 35px;
        height: 35px;
        margin-right: 20px;
    }
`
export const DivBotaoDelete = styled.div`
    width: 40px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const BotaoDelete = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    color: #CD2626;
    cursor: pointer;
    background-color: transparent;
    
    :hover {
        color: red;
    }
`

export const DivDados = styled.div`
    width: 100%;
    height: 170px;
`
export const Tabela = styled.table`
    width: 100%;
    height: 170px;
    .titulos {
        padding-left: 5px;
        color: #29D3E4;
    }
    .dados {
        padding-right: 10px;
        text-align: end;
    }
`
export const TdLucroUsd = styled.td<{ color: string }>`
    color: ${props => props.color};
`
export const Saldo = styled.td`
    color: #12ef0f;
`