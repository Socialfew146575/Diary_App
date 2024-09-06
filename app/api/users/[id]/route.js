import { connectToDB } from "@/utils/database";
import Log from "@/models/log";

export const GET = async ({params}, req) => {
  try {
    await connectToDB();
    
    

    const userLog = await Log.find({}).populate("creator");

    return new Response(JSON.stringify(userLog), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch logs of User", { status: 500 });
  }
};
