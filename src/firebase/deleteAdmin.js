
import { db } from './firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';



export const deleteAdmin = async (adminId) => {
    try {
        const adminRef = doc(db, 'admin accounts', adminId);
        await deleteDoc(adminRef);
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error removing document: ", error);
    }
};
