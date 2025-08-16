const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

exports.generateSummaryWithAI = async (transcript, prompt) => {
  const chatCompletion = await groq.chat.completions.create({
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
    model: "mixtral-8x7b-32768"
  });

  return chatCompletion.choices[0]?.message?.content;
};