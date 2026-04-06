import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API using the Vite environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const improveText = async (text: string, tone: string): Promise<string> => {
  if (!apiKey) {
    return "Error: You need to add your Gemini API Key. Check the .env.local file.";
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  let toneInstructions = "";
  switch (tone) {
    case 'Professional':
      toneInstructions = "Make it sound polite, clear, and professional tone suitable for modern workplace communication.";
      break;
    case 'Casual':
      toneInstructions = "Make it sound friendly, relaxed, and conversational, like texting a friend.";
      break;
    case 'Concise':
      toneInstructions = "Make it as short, direct, and to the point as possible without losing the initial meaning.";
      break;
    case 'Academic':
      toneInstructions = "Use scholarly vocabulary and structure suitable for a research paper.";
      break;
    case 'Creative':
      toneInstructions = "Use expressive language, metaphors, and a bit of narrative flair.";
      break;
    default:
      toneInstructions = "Improve the grammar and flow generally.";
  }

  const prompt = `
You are an expert copywriter and text editor.
Task: Improve the original text provided below.
Tone Instructions: ${toneInstructions}

IMPORTANT: Do not include any conversational filler (e.g., "Here is your text:"). Return ONLY the rewritten text and nothing else.

Original Text:
"${text}"
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Failed to connect to the AI. Please make sure your API key is correct.";
  }
};
