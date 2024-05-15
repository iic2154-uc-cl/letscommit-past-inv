const { getBots, generateMessage, getOutput, getPrompt, commitPrompt, calificationPrompt} = require("../bots/worker")


const getMessages = async (req, res) => {
    const { diff } = req.body;

    try{
        // we get every recomenation
        let generated = [];
        for (const b of getBots()){
            
            const result = await generateMessage(diff, b, commitPrompt);

            // check api status
            if (result.status != 200 && b.holder != "Replicate") {
                console.log(result);
                generated.push({
                    bot: b.name,
                    giver: b.sign,
                    message: `server error`,
                    result: "failed",
                    success: false,
                });
                continue;
            }
            
            // get output
            const output = getOutput(result, b);
            generated.push({
                bot: b.name,
                giver: b.sign,
                message: `${output}`,
                result: "success",
                success: true,
            });

        }
        return res.status(200).json({
            generated,
            message: "Messages generated successfully",
        });
    } catch (error) {
        // catch api error message
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getCalification = async (req, res) => {
    const { diff } = req.body;

    try{
        // we get every recomenation
        let generated = [];
        for (const b of getBots()){
            
            // cambiar
            const result = await generateMessage(diff, b, calificationPrompt);

            // check api status
            if (result.status != 200 && b.holder != "Replicate") {
                console.log(result);
                generated.push({
                    bot: b.name,
                    giver: b.sign,
                    message: `server error`,
                    result: "failed",
                    success: false,
                });
                continue;
            }
            
            // get output
            const output = getOutput(result, b);
            generated.push({
                bot: b.name,
                giver: b.sign,
                message: `${output}`,
                result: "success",
                success: true,
            });

        }
        return res.status(200).json({
            generated,
            message: "Messages generated successfully",
        });
    } catch (error) {
        // catch api error message
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {getMessages, getCalification};
