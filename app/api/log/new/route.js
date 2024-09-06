
import { connectToDB } from "@/utils/database";

import Log from "@/models/log";


export const POST=async(req,res)=>{


    const {user,log,date,visible}=await req.json();
    console.log(visible)

    try {
        await connectToDB();

        const logExist=await Log.findOne({creator:user,date:date})
        console.log(logExist)
        // console.log()
       

            if(!logExist){
                const newLog = new Log({
                  creator: user,
                  log: log,
                  date: date,
                  visible:visible
                });

                await newLog.save();

                return new Response(JSON.stringify(newLog), { status: 201 });
            }
            else{
               return  new Response("Log already Exists",{status:409})
            }


        


    } catch (error) {
         return new Response("Failed to create log", { status: 500 });
    }
   






}