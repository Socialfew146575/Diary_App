import { connectToDB } from "@/utils/database";
import Log from "@/models/log";

export const GET = async (req,{params}) => {
 
  console.log("GET",params)
  try {
    await connectToDB();

    const response = await Log.findById(params.id);
    // console.log(response)

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the log", { status: 500 });
  }
};


export const DELETE=async(req,{params})=>{

  

    console.log(params)


    try {

        await connectToDB();
       

      await Log.findByIdAndRemove(params.id);

        return new Response("Log deleted Successfully", { status: 200 });


    } catch (error) {
         return new Response("Failed to delete the log", { status: 500 });
    }



}

export const PATCH = async(req,{params})=>{

    const {log,date,visible} = await req.json()


  console.log(params)


  try {
    await connectToDB()

    const existingLog = await Log.findById(params.id)

    if(!existingLog){
      return new Response("Log not Found",{status:404})
    }

    existingLog.log = log;
    existingLog.date = date
    existingLog.visible = visible;

    await existingLog.save()


    return new Response(JSON.stringify(existingLog),{status:201})


  } catch (error) {
      return new Response("Failed to update the Log", { status:500 });
  }




}