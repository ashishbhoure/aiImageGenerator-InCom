import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("hello from api ");
});

router.route("/").post(async (req, res) => {
  // console.log(openai);
  try {
    const { prompt } = req.body;
    console.log(prompt);

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log(aiResponse);

    const image = aiResponse.data.data[0].b64_json;
    console.log(image);

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log("ERROR : ", error);
    res.status(500).send(error?.response.data.error);
  }
});

export default router;
