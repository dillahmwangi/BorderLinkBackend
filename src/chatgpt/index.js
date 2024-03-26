import OpenAI  from "openai";
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const chatGptPrompt = async (content) => {
  console.log("content: ", content);
  if (!content) {
    return null;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      max_tokens: 3000,
      messages: [{ "role": "user", "content": content }],
      temperature: 0,
      response_format: { type: "json_object" },
    });
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    if (error.code === 'insufficient_quota') {
      console.error('Rate limit exceeded. Please check your plan and billing details.');
    } else {
      console.error('An error occurred:', error);
    }
    return null;
  }
};