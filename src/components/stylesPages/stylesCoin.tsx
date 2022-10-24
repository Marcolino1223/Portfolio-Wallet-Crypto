import styled from "styled-components";

export const DivBody = styled.div`
    width: 100%;
    height: 94vh;
    margin-top: 30px;
`

export const Informacoes = styled.div`
    width: 100%;
    height: 170px;
    display: flex;
    .titulos {
        font-weight: bold;
        font-size: 20px;
        color: #4865FF;
    }
    .dados {
        font-weight: bold;
        font-size: 17px;
    }
`

export const DadosGerais = styled.div`
    width: 11%;
    height: 100px;
    border-radius: 10px;
    text-align: center;
    background-color: #00001C;
    margin: 10px;
`

export const Saldo = styled.p`
    color: #12ef0f;
`

export const DivDados = styled.div`
    width: 21%;
    height: 170px;
    display: flex;
    flex-direction: column;
    align-items: end;

    .dadosGerais {
        margin:2px;
        color: #DBE7F3;
    }
`
export const DivTraders = styled.div`
    width: 100%;
    height: 70.5vh;
`

export const Aporte = styled.p<{ color: string }>`
    color: ${props => props.color}
`