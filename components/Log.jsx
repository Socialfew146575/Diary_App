"use client"

import Image from "next/image"
import { useEffect, useState } from "react"


const LogCard=({name,email,image,data,date})=>{

    console.log(data)

return (
    
    <div className="flex flex-col border border-gray-300 w-fit h-fit p-3 rounded-md shadow-md gap-5 justify-between">
        <div className="flex flex-col gap-5"> <div className="flex gap-4">
            <Image src={image} width={37} height={37} className="rounded-full" />

            <div className="flex flex-col">
                <h1 className="text-[14px] font-bold font-satoshi">{name}</h1>
                <p className="text-[12px] font-light text-[gray]">{email}</p>
            </div>
        </div>

            <div  className="max-w-[400px] text-[14px] font-medium  font-satoshi text-gray-700 whitespace-pre-line">{data} </div>
            
            
            
        

            </div>
       

        <div className="flex justify-between items-center">
            <span className="text-[14px] font-semibold  bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent font-sans">{date.substring(0, 10)}</span>

            <Image src="/book.png" height={40} width={40}/>
        </div>

    </div>


)


}


const Log = () => {

    const [logs,setLogs]=useState([])

    useEffect(()=>{

       const fetchLog=async()=>{

           const response = await fetch("/api/log")
           const data=await response.json()

           setLogs(data);
       }

       fetchLog();
       console.log(logs)




    },[])

  return (
    <div className='px-14 w-full'>
          <div className='py-5 flex justify-center'>
              <input type="date" placeholder='Search by Date' className='border border-gray-300  h-12 rounded-md px-4 text-[12px] w-[40rem] text-[#3f3b3b] outline-none shadow-lg' />
          </div>
          <div className=" space-y-6 columns-3 gap-2">
            
             {logs.map((log)=>(
            
                 <LogCard key={log.id} date={log.date} image={log.creator.image} data={log.log} name={log.creator.username} email={log.creator.email}/>

             ))}
          </div>
    </div>
  )
}

export default Log
