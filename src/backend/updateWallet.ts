import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { WalletCoinProps } from './../types/Interfaces';

export const updateWallet = async ( props: WalletCoinProps) => {
    if (props.Id != '') {
        const docRef = doc(db, 'CoinList', props.Id)
        const payload = {
            SaldoWallet: props.Saldo,
            RendimentoWallet: props.Rendimento,
            MoedasWallet: props.Moedas,
            LucroWallet: props.Lucro,
        }
        await updateDoc(docRef, payload);
    }
}