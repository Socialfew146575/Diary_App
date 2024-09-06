
import { connectToDB } from "@/utils/database";

import Log from "@/models/log";

export const GET=async(req)=>{

    try {

        await connectToDB();

        const logs=await Log.find({visible:true}).populate("creator");
        

        return new Response(JSON.stringify(logs),{status:200})


    } catch (error) {
        return new Response("Failed to fetch all Logs",{status:500})
        
    }





}