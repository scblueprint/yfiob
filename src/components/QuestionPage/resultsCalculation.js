

// filled with dummy data
// when Lipitha's function is done:
//  - make the map output public
//  - make helper function to extract values
//  - call updateUserAssesment with the output

//  calculateUserScores()
// - returns a map called industries with the key being the industry name and the value being a float 
export const calculateUserScores = async (selectedAnswers, questionWeights) => {
    // Mapping of answer indexes to their respective weights
    const answerWeights = [-1.0, -0.5, 0, 0.5, 1.0];

    // Initialize an object to keep track of the industry scores
    let industryScores = {};

    // Iterate through each question's weights
    Object.entries(questionWeights).forEach(([question, industries], index) => {
        // Get the weight of the user's answer for this question
        const answerWeight = answerWeights[selectedAnswers[index]];

        // Calculate the score for each industry related to this question
        Object.entries(industries).forEach(([industryName, industryWeight]) => {
            // If the industry hasn't been added to industryScores, initialize it
            if (!industryScores[industryName]) {
                industryScores[industryName] = 0;
            }

            // Add the product of the answer weight and the industry weight to the total score for this industry
            industryScores[industryName] += industryWeight * answerWeight;
        });
    });

    // Ensure no negative scores
    Object.keys(industryScores).forEach(industry => {
        industryScores[industry] = Math.max(industryScores[industry], 0);
    });
    
    // Find the maximum score to use for normalization
    const maxScore = Math.max(...Object.values(industryScores));

    // Normalize the scores
    Object.keys(industryScores).forEach(industry => {
        industryScores[industry] = (industryScores[industry] / maxScore) * 100;
    });
    console.log("Industry Scores(in file)" + JSON.stringify(industryScores));
    return industryScores;
  };
  export default calculateUserScores;