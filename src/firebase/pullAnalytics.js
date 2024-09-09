import { db } from "./firebaseConfig";
import { collection, query, getDocs, Timestamp } from "firebase/firestore";

export async function getAssessmentsAnalytics() {
    const today = new Date();
    const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));

    const q = query(collection(db, "Users"));
  
    try {
        const querySnapshot = await getDocs(q);
        let recentCount = 0;
        let totalCount = querySnapshot.size; // Total number of documents
        let schoolCounts = {};

        querySnapshot.forEach(doc => {
            const data = doc.data();
            const creationDate = data.accountCreationDate?.toDate();

            // Count recent assessments
            if (creationDate >= oneWeekAgo) {
                recentCount++;
            }

            // Aggregate school counts
            const schoolName = data.schoolName;
            if (schoolName) {
                schoolCounts[schoolName] = (schoolCounts[schoolName] || 0) + 1;
            }
        });

        // Determine the most popular school
        const mostPopularSchool = Object.keys(schoolCounts).reduce((a, b) => schoolCounts[a] > schoolCounts[b] ? a : b, '');

        return [recentCount, totalCount, mostPopularSchool]; // Returns an array with recent count, total count, and most popular school
    } catch (error) {
        console.error("Error fetching assessments analytics:", error);
        return [0, 0, '']; // Return zeros and empty string in case of an error
    }
}
