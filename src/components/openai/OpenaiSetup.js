import { Configuration, OpenAIApi } from "openai";

console.log(OpenAIApi)

const configuration = new Configuration({
    organization: "org-NOWbV1hkrOdhjnUcTI79fzZ1",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai



