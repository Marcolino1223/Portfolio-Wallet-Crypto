import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { PortfolioHomeProps } from './../types/Interfaces';

export const updatePortfolio = async (props: PortfolioHomeProps) => {

    if (props.id != '') {
        const docRef = doc(db, 'CoinList', props.id)
        const payload = {
            SaldoPortfolio: props.saldo,
        }
        await updateDoc(docRef, payload)
    }
}