
import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is available in the environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

/**
 * Asks a question to the Gemini model, framed as a student asking a teacher.
 * @param questionText - The text highlighted by the student.
 * @param subjectName - The name of the subject being studied.
 * @returns The generated answer from the model.
 */
export const askTeacher = async (questionText: string, subjectName: string): Promise<string> => {
  if (!API_KEY) {
    return "کلیل (API Key)ی جێمینای دانەنراوە. تکایە دڵنیابە لە بوونی.";
  }

  try {
    const systemInstruction = `You are an expert AI teacher from Kurdistan called "مامۆستای ئامادە". You are explaining concepts to a high school student. Your answers MUST be extremely concise, short, and to the point. Aim for a maximum of one or two sentences. Respond like you're giving a quick hint or a dictionary definition. Always respond in Kurdish. Focus only on the core answer, avoid any extra conversation or introductory phrases. وەڵامەکانت پێویستە ئێجگار کورت، پوخت، و ڕاستەوخۆ بن، لە دوو ڕستە تێپەڕ نەکات. وەک ئاماژەیەکی خێرا یان پێناسەیەکی فەرهەنگی وەڵام بدەرەوە. تەنها خاڵی سەرەکی ڕوون بکەرەوە و لە هەر جۆرە قسەیەکی زیاد یان دەستپێکێکی ڕوونکردنەوە خۆت بپارێزە.`;
    
    const userPrompt = `قوتابییەک پرسیارێکی هەیە لە وانەی "${subjectName}" دەربارەی ئەم بەشە: "${questionText}". تکایە بە سادەیی و ڕوونی بۆی شروڤە بکە.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "ببورە، لە کاتی پەیوەندیکردن بە مامۆستای زیرەکدا کێشەیەک ڕوویدا. تکایە دواتر هەوڵبدەرەوە.";
  }
};