const { Configuration, OpenAIApi } = require("openai");
// import Replicate from "replicate";
const Replicate = require("replicate");

const botList = require('./bots.json');
const commitPrompt = require('./commitPrompt.json');
const calificationPrompt = require('./calificationPrompt.json');

// OpenAI configuration
const openAIConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openAI = new OpenAIApi(openAIConfiguration);

// Replicate configuration
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const getBots = () => {return botList;}

const getPrompt = (item, botModel, promptDict) => {
    const {holder} = botModel;
    const prompt = promptDict[holder];
    switch (holder) {
        case 'Replicate':
            prompt.prompt = item;
            prompt.max_new_tokens = 100;
            return prompt;
        case 'OpenAI':
            // if we already pushed the prompt, we need to remove it
            if (prompt.prompt.length > 1) prompt.prompt.pop();
            prompt.prompt.push({"role": "user", "content": item});
            return prompt.prompt;
        default:
            return "no prompt";
    }

}

const generateMessage = async (item, botModel, promptDict) => {
    const {model, holder} = botModel;
    const prompt = getPrompt(item, botModel, promptDict);
    console.log(prompt)
    try {
        switch (holder) {
            case 'Replicate':
                return await replicate.run(
                    model,
                    {
                        input: prompt,
                    }
                );
            case 'OpenAI':
                return await openAI.createChatCompletion({
                    model: model,
                    messages: prompt,
                    temperature: 0.7,
                });
            default:
                return item;
        }
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

const getOutput = (item, botModel) => {
    const {holder} = botModel;
    try {
        switch (holder) {
            case 'Replicate':
                return item.join('');
            case 'OpenAI':
                return item.data.choices[0].message.content;
            default:
                return item;
        }
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

module.exports = { getBots, generateMessage, getOutput, getPrompt, commitPrompt, calificationPrompt };