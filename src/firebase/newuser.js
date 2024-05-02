import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const addUserToFirestore = async (userId, email, firstName, zipcode = null, school = null, grade = null) => {
  if (zipcode !== null && school !== null && grade !== null) {
    const userDocRef = doc(db, "Users", userId);
    const updatedFields = {};
    if (zipcode !== null) updatedFields.zipcode = zipcode;
    if (school !== null) updatedFields.school = school;
    if (grade !== null) updatedFields.grade = grade;

    await updateDoc(userDocRef, updatedFields);
  }
  else {
    try {
      //This line creates a documents in firebase with user information
      await setDoc(doc(db, "Users", userId), {
        email: email,
        firstName: firstName,
        accountCreationDate: serverTimestamp(),
        school: null,
        zipcode: null,
        grade: null
      });
      console.log("User successfully added with ID: ", userId);

      // TODO: This code below is causing an error
      // Dev tools states that "db.collection is not a function"
      // May need to look into

      // const adminPanelRef = db.collection("admin_panel").doc("user_list");
      // const adminPanelSnapshot = await adminPanelRef.get();
      //
      // let userList = [];
      // if (adminPanelSnapshot.exists) {
      //   userList = adminPanelSnapshot.data().userList || [];
      // }
      //
      // userList.push({
      //   userId: userId,
      //   firstName: firstName,
      //   email: email,
      // });
      //
      // await adminPanelRef.set({ userList });
      // console.log("User data added to admin panel");
    } catch (error) {
      console.error("Error adding user: ", error.message);
      throw error;
    }
  }
};

export default addUserToFirestore;
