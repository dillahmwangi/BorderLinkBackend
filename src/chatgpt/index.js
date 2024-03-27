import 'dotenv/config';
import { GoogleGenerativeAI }  from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY);


export const geminiPrompt = async (content) =>{
  if (!content) {
    return null;
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = content + "Please limit the promote to 100 characters";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();

    

    console.log(text);
    return text;
  } catch (error) {
    return error;
  }
}
