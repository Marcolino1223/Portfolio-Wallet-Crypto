import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { TraderVendaProps } from './../types/Interfaces';

export const addDocVendaTrader = async (props: TraderVendaProps) => {

    if (props.id != '') {

        const moedas = (props.valorSaque / props.valorDeVenda)

        const docRef = collection(db, `CoinList/${props.id}/Traders`);
        const payload = {
            Data: props.data,
            Aporte: 0,
            MoedasCompradas: 0,
            Count: 0,
            ValorDeCompra: 0,
            Saque: props.valorSaque,
            ValorDeVenda: props.valorDeVenda,
            MoedasVendidas: moedas,
        }
        await addDoc(docRef, payload)
    }
}