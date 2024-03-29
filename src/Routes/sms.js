import express  from 'express'
import AfricasTalking  from 'africastalking'
import { geminiPrompt } from "../chatgpt/index.js"

const router = express.Router()
import 'dotenv/config'

const africastalking = AfricasTalking({
  apiKey: process.env.API_KEY, 
  username: process.env.AT_USERNAME
});


router.post('/incoming-messages', async (req, res) => {
  console.log("incomming message")
  const response = await geminiPrompt(req.body.text);
  await sendSMS(req.body.from, response || 'Something went wrong');
  res.sendStatus(200);
});

async function sendSMS(number, message) {
  console.log("number: ", number);
  try {
    const result = await africastalking.SMS.send({
      to: [number], 
      message: message,
      from: '53089'
    });
    console.log(result);
    return true;
  } catch(ex) {
    console.error(ex);
    return false;
  } 
}

router.post("/contact", async (req, res) => {
  try{
    const result = await africastalking.SMS.send({
      to: [number], 
      message: message,
    });
    return true
  }catch(err){
    console.error(ex);
    return false;
  }
})

export default router;

