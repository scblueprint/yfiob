import { db } from "./firebaseConfig";
import { collection, query, getDocs, Timestamp } from "firebase/firestore";

export async function getAssessmentsAnalytics() {
    const today = new Date();
    const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));

    const q = query(collection(db, "Users"));
    const careerQuery = query(collection(db, "career data"));

    try {
        const querySnapshot = await getDocs(q);
        const careerSnapshot = await getDocs(careerQuery);
        
        let recentCount = 0;
        let totalCount = querySnapshot.size; // Total number of documents
        let schoolCounts = {};
        let maxVisitors = 0;
        let mostPopularCareer = "";

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

        // Determine the most popular career based on the highest visitors count
        careerSnapshot.forEach(doc => {
            const careerData = doc.data();
            if (careerData.visitors > maxVisitors) {
                maxVisitors = careerData.visitors;
                mostPopularCareer = doc.id; // Assuming the document ID is the career name
            }
        });

        return [recentCount, totalCount, mostPopularSchool, mostPopularCareer]; // Returns an array with recent count, total count, most popular school, and most popular career
    } catch (error) {
        console.error("Error fetching assessments analytics:", error);
        return [0, 0, '', '']; // Return zeros and empty strings in case of an error
    }
}
