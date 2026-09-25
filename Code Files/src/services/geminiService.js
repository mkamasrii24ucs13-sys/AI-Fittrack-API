require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateWorkoutRecommendation = async (age, fitnessGoal, experience) => {
  try {
    console.log("Using API Key:", process.env.GEMINI_API_KEY? "Key Loaded" : "Key NOT Loaded");
    console.log("Using Model:", process.env.GEMINI_MODEL);

    const prompt = `Generate a personalized workout recommendation for Age: ${age}, Goal: ${fitnessGoal}, Experience: ${experience}. Keep it direct and concise.`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });

    console.log("Gemini Response:", response);
    return response.text? response.text.trim() : response.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error('FULL GEMINI ERROR:', error);
    throw new Error('Failed to generate workout recommendation from Gemini AI: ' + error.message);
  }
};

const generateFitnessInsights = async (totalWorkouts, averageDuration, totalCaloriesBurned) => {
  try {
    const prompt = `Analyze fitness progress: Workouts ${totalWorkouts}, Avg ${averageDuration} mins, Calories ${totalCaloriesBurned}. Give concise insight.`;
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: prompt,
    });
    return response.text? response.text.trim() : response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('FULL GEMINI ERROR:', error);
    throw new Error('Failed to generate insights: ' + error.message);
  }
};

module.exports = { generateWorkoutRecommendation, generateFitnessInsights };