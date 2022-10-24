import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const deleteTraderDoc = async (idPri: string, idSec: string | undefined) => {
    
    if (idPri && idSec != '') {
        const docRef = doc(db, `CoinList/${idPri}/Traders`, `${idSec}`)
        await deleteDoc(docRef)
    }
}