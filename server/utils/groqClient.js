import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateSummaryWithAI(transcript, prompt) {
  try {
    const chatCompletion = await getGroqChatCompletion(transcript, prompt)

    // Safely extract content
    const summary = chatCompletion?.choices?.[0]?.message?.content || "No summary generated.";
    
    return summary;
  } catch (error) {
    console.error("Error generating summary:", error.message || error);
    throw new Error("Failed to generate summary");
  }
}

export async function getGroqChatCompletion(transcript, prompt) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes meeting notes."
        },
        {
          role: "user",
          content: `Transcript: ${transcript}\n\nInstructions: ${prompt || 'Provide a concise summary'}`
        }
      ],
      model: "openai/gpt-oss-20b",
    });

    return response;
  } catch (error) {
    console.error("Groq API Error:", error.message || error);
    throw new Error("Failed to fetch chat completion");
  }
}
