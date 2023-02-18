const functions = require('firebase-functions')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.completionOnCall = functions.https.onCall( async (data, context) => {

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: data.question,
      temperature: 0.5,
      max_tokens: 200
    });

    const textAnswer = completion.data.choices[0].text

    console.log(textAnswer)

    return textAnswer
})

