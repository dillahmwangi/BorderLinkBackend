import express  from 'express'
import AfricasTalking  from 'africastalking'
import { geminiPrompt } from "../chatgpt/index.js"

const router = express.Router()
import 'dotenv/config'




router.post('/incoming-messages', async (req, res) => {
  console.log("incomming message")
  const response = await geminiPrompt(req.body.text);
  await sendSMS(req.body.from, response || 'Something went wrong');
  res.sendStatus(200);
});

async function sendSMS(number, message) {
  console.log("number: ", number);
  try {
    const africastalking = AfricasTalking({
      apiKey: process.env.API_KEYSANDBOX, 
      username: process.env.AT_USERNAMESANDBOX
    });
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




router.post('/contact', async(req, res) => {
  const africastalking = AfricasTalking({
    apiKey: process.env.APIKEY, 
    username: process.env.AT_USERNAME
  });
  const { phoneNumber, message } = req.body
  const result = await africastalking.SMS.send({
      to: phoneNumber,
      message: message,
  })
   
  res.send(result)
})

export default router;

