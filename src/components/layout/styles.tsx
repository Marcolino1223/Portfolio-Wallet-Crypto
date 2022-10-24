import styled from "styled-components";

export const Layout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`

export const Menu = styled.div`
    width: 4%;
    height: 90vh;
    background-color: #00001C;
    margin: 25px;
    border-radius: 10px;
    display: block;
    padding-top: 30px;
`
export const DivHome = styled.div`
    width: 30px;
    height: 30px;
    margin: auto;
    padding-bottom: 30px;
    .cabecalho {
        color: #4865FF;
        font-weight: bold;
        :hover {
            color: white;
            cursor: pointer;
        }
    }
    .wallet {
        color: #4865FF;
        font-weight: bold;
        font-size: 23px;
        margin-left: 3px;
        :hover {
            color: white;
            cursor: pointer;
        }
    }
`
export const DivSymbol = styled.div`
    width: 40px;
    height: 40px;
    margin: auto; 
    display: flex;
    align-items: center;
    justify-content: center;
    .symbol {
        color: #4865FF;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        align-items: center;
    }
`
export const DivImagem = styled.div`
    width: 40px;
    height: 40px;
    margin: 20px auto; 
    text-align: center;
    .imagem {
        width: 35px;
        height: 35px;
    }
`

export const Content = styled.div`
    display: flex;
    width: 90%;
`