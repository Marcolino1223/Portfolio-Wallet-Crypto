import { initFirebase } from "../../firebase/firebase"
import Coins from "../coins/Coins"
import Portfolio from "../portfolio/Portfolio"
import * as S from "./styles"

export default function DashBoard() {
    initFirebase()

    return (
        <>
            <S.DivCoins>
                <Coins />
            </S.DivCoins>
            <S.DivPortfolio>
                <Portfolio />
            </S.DivPortfolio>
        </>
    )
}