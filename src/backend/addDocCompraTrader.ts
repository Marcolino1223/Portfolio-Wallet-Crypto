import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { TraderCompraProps } from "../types/Interfaces";

export const addDocCompraTrader = async (props: TraderCompraProps) => {

    if (props.id != '') {
        const AporteNumber = props.aporte;
        const ValorDaMoedaNumber = props.valorDaMoeda;
    
        const Aporte = AporteNumber;
        const Moedas = AporteNumber / ValorDaMoedaNumber;
    
        const refDoc = collection(db, `CoinList/${props.id}/Traders`);
        const payload = {
            Data: props.data,
            Aporte: Aporte,
            MoedasCompradas: Moedas,
            Count: 1,
            ValorDeCompra: ValorDaMoedaNumber,
            Saque: 0,
            ValorDeVenda: 0,
            MoedasVendidas: 0,
        }
        await addDoc(refDoc, payload)
    }
}