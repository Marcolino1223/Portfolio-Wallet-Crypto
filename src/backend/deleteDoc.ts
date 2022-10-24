import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export const deletarDoc =  async(id: string) => {
    const docRef = doc(db,'CoinList', `${id}`);
    await deleteDoc(docRef)
}