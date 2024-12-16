import axios from "axios";

// Function to fetch the description of the municipality from Gemini API
export const fetchMunicipalityDescription = async (city) => {

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  // Prepare the payload for the request
  const data = {
    contents: [
      {
        parts: [
          {
            text: `Write a detailed description of the municipality of ${city} in 200 words.Also provide the link to explore more at last.`
          }
        ]
      }
    ]
  };

  try {
    // Send the request to the Gemini API
    const response = await axios({
      url: apiUrl,
      method: "post",
      data: data,
    });

    // Extract the response text (description) from the Gemini API response
    const aiResponse = response.data.candidates[0].content.parts[0].text;

    // Return the AI-generated description
    return aiResponse;
  } catch (error) {
    // Handle error 
    console.error("Error fetching description:", error);
    return "Sorry - Something went wrong. Please try again!";
  }
};
