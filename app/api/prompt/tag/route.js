import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

//GET (READ)
export const POST = async (req) => {
    try {
        await connectToDB();
        const { tag } = await req.json();
        const prompt = await Prompt.find({ "tag": tag }).populate('creator');
        if (!prompt) return new Response("Prompt not found", {
            status: 404
        })

        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", {
            status: 500
        })
    }
}