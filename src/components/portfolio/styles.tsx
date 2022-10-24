import styled from "styled-components";

export const DivBody = styled.div`
    width: 97%;
    height: 90vh;
    margin-left: 15px;
`
export const DivCabecalho = styled.div`
    width: 100%;
    height: 65px;
    border-bottom: 1px solid #4865FF;
    display: flex;
    align-items: center;
    justify-content: center;
    .portfolio {
        color: #4865FF;
        font-size: 20px;
        font-weight: bold;
    }
`
export const DivGraficoCharts = styled.div`
    width: 100%;
    height: 40vh;
`
export const DivDadosGerais = styled.div`
    width: 100%;
    max-height: 40vh;
    display: flex;
    flex-wrap: wrap;
    .coins {
        cursor: pointer;
    }
`
export const Container = styled.div`   
    width: 180px;
    height: 120px;
    margin: 10px 10px 10px 30px;
    background-color: #00001C;
    border: 1px solid #4865FF;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    :hover {
        background-color: #000034;
    }
    .titulos {
        font-weight: bold;
        font-size: 19px;
        margin-bottom: 0;
    }
    .dados {
        font-weight: bold;
        font-size: 17px;
    }
`

export const RendimentoLucro = styled.p<{ color: string }>`
    color: ${props => props.color};
`