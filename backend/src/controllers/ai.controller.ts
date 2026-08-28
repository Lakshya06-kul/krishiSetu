import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const chatWithAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    
    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'Gemini API Key is not configured on the server.' });
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // We use gemini-1.5-flash as the standard fast text model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const systemPrompt = `You are AgriLink AI, an expert multilingual agricultural assistant for farmers, buyers, and FPOs in Maharashtra, India.
  
You MUST return your response as a valid JSON object matching exactly this structure:
{
  "marketResponse": "Short title or category of response",
  "answer": "Your detailed, helpful response to the user's query in the language they asked (English, Hindi, or Marathi)",
  "credibilityScore": "A percentage score representing confidence (e.g., '96%')",
  "sources": ["List", "of", "sources", "used", "like 'Agmarknet'"],
  "recommendation": "One actionable strategic recommendation"
}

Do not include markdown code blocks around the JSON. Just return the raw JSON object.
If the user asks in Hindi, answer in Hindi. If Marathi, answer in Marathi.
Provide accurate or highly realistic simulated market prices for Nashik/Delhi region if asked.`;

    const chatSession = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: '{"marketResponse":"Acknowledged","answer":"Understood","credibilityScore":"100%","sources":[],"recommendation":""}' }] },
      ],
    });

    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();
    
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (parseError) {
      // Fallback if the AI didn't return perfect JSON
      parsedResponse = {
        marketResponse: "AI Response",
        answer: responseText,
        credibilityScore: "80%",
        sources: ["AgriLink Knowledge Base"],
        recommendation: "Consult local experts."
      };
    }

    res.status(200).json(parsedResponse);

  } catch (error: any) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: error.message || 'Failed to process AI chat' });
  }
};
