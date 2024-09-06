"use client"
import { useEffect, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const LogCard = ({ log, handleLogDelete, handleLogUpdate }) => {
  return (
    <div className="flex flex-col border border-gray-300 w-fit h-fit p-3 rounded-md shadow-md gap-5 justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <Image src={log.creator.image} width={37} height={37} className="rounded-full" />
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <h1 className="text-[14px] font-bold font-satoshi">{log.creator.username}</h1>
              <p className="text-[12px] font-light text-[gray]">{log.creator.email}</p>
            </div>
            <div>
              {log.visible ? <PublicIcon /> : <PublicOffIcon />}
            </div>
          </div>
        </div>
        <div className="max-w-[400px] text-[14px] font-medium font-satoshi text-gray-700 whitespace-pre-line">
          {log.log}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[14px] font-semibold bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent font-sans">
          {log.date.substring(0, 10)}
        </span>
        <div className="flex gap-3">
          <button
            className="px-3 py-1 border border-[#ff4e00] rounded-full text-[#ff4e00] hover:bg-[#ff4e00] hover:text-white"
            onClick={() => handleLogUpdate && handleLogUpdate(log)}
          >
            Edit
          </button>
          <button
            className={`px-3 py-1 border bg-[#ff4e00] text-white rounded-full border-[#ff4e00] hover:bg-transparent hover:text-[#ff4e00] ${log.isDeleting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={() => handleLogDelete && handleLogDelete(log)}
            disabled={log.isDeleting}
          >
            {log.isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};





const Page = () => {
  const { data: session } = useSession();
  const [logs, setLogs] = useState([]);

  const router = useRouter()

  const handleLogDelete = async (log) => {
    try {
      const hasConfirmed = confirm("Are you sure you want to Delete this log?");

      if (hasConfirmed) {
        // Update the state to mark the log as being deleted
        setLogs((prevLogs) =>
          prevLogs.map((prevLog) =>
            prevLog._id === log._id ? { ...prevLog, isDeleting: true } : prevLog
          )
        );

        // Perform the delete operation
        await fetch(`/api/log/${log._id}`, {
          method: "DELETE",
        });

        // Update the state to remove the deleted log
        setLogs((prevLogs) => prevLogs.filter((prevLog) => prevLog._id !== log._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogUpdate = (log) => {
    // Handle log update logic
    router.push(`/update-log?logId=${log._id}`)
  };

  useEffect(() => {
    const fetchLog = async () => {
      const response = await fetch(`/api/users/${session?.user.id}`);
      const log = await response.json();
      setLogs(log);
    };

    fetchLog();
  }, [session?.user.id]);

  return (
    <section className="px-14 flex flex-col gap-4">
      <h1 className="bg-[#ff4e00] bg-gradient-to-r from-[#ff4e00] to-[#ec9f05] bg-clip-text text-transparent mt-5 text-6xl font-extrabold leading-[1.15] text-black ">
        My Logs
      </h1>
      <p className="max-w-2xl text-[gray]">
        Welcome to your personal Logs Page, where you can capture and chronicle the various aspects
        of your life in a structured and organized manner
      </p>
      <div className="space-y-6 columns-3 gap-2">
        {logs.map((log) => (
          <LogCard key={log._id} log={log} handleLogDelete={handleLogDelete} handleLogUpdate={handleLogUpdate} />
        ))}
      </div>
    </section>
  );
};

export default Page;
