"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useSearchParams } from "next/navigation";

const EditLog = () => {

    const [log, setLog] = useState('')
    const [visible, setVisible] = useState(true)
    const [date, setDate] = useState(null);
    const [submitting,setSubmitting] = useState(false)

    const router = useRouter()

    const [logId, setLogId] = useState(null); // Initialize with null

    const searchParams = useSearchParams()
    const logIdParam = searchParams.get('logId')


    // console.log(logIdParam)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if(!logId) return alert("Log Id not Found!!");

        try {
           const response =  await fetch(`/api/log/${logId}`, {
                method: "PATCH",
                body: JSON.stringify({

                    log: log,
                    date: date,
                    visible: visible


                })
            })

            if (response.ok) router.push('/')

        } catch (error) {

            console.log(error)
            
        }finally{
            setSubmitting(false)
        }






    }

    useEffect(() => {
        if (logIdParam) {
            setLogId(logIdParam); // Update the logId state with the retrieved value
        }
    }, [logIdParam]);

    console.log("Update-log", logId);







    useEffect(() => {


        const fetchLog = async () => {

            const response = await fetch(`/api/log/${logId}`)
            const data = await response.json();

            setLog(data.log);
            setVisible(data.visible)
            // Convert the fetched date to "YYYY-MM-DD" format
            const formattedDate = data.date ? new Date(data.date).toISOString().split('T')[0] : null;
            setDate(formattedDate);


            console.log(data)



        }
        fetchLog();


    }, [logId])

    return (
        <section className='px-14 flex flex-col w-full flex-start gap-4'>
            <h1 className='bg-[#ff4e00] bg-gradient-to-r from-[#ff4e00] to-[#ec9f05] bg-clip-text text-transparent mt-5 text-5xl font-extrabold leading-[1.15] text-black
'>Update Log</h1>

            <p className='max-w-2xl text-[gray]'>
                Introducing "Update Log" –   Life is dynamic, and so are your thoughts and experiences. Our <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-xl font-serif'>Diary</span> app's Update Log feature empowers you to revisit, revise, and refine your entries, ensuring that your personal narrative remains a true reflection of your journey
            </p>


            <form className='border border-gray-400 rounded-lg h-full max-w-2xl p-3 flex flex-col gap-4' onSubmit={handleSubmit} method="POST" >

                <div className="flex justify-between"> <label htmlFor="log"><span className='font-satoshi font-semibold text-base text-black'>Diary Log</span>&nbsp;&nbsp;<span className="text-[12px] font-light text-[gray]">
                    {visible ? "(Public)" : "(Private)"}
                </span></label>

                    <div className="flex items-center mr-4">
                        {visible ? <VisibilityIcon sx={{
                            fontSize: 18
                        }} onClick={() => setVisible((prev) => prev = !prev)} /> :
                            <VisibilityOffIcon sx={{
                                fontSize: 18
                            }} onClick={() => setVisible((prev) => prev = !prev)} />}
                    </div>

                </div>

                <textarea name="log" id="" cols="10" rows="10" className='border border-gray-400 rounded-md outline-none shadow-md font-satoshi text-[14px] p-2 ' placeholder={`Write your log here...`} required value={log} onChange={(e) => setLog(e.target.value)}></textarea>

                <label htmlFor=""> <span className='font-satoshi font-semibold text-base text-black'>Date</span></label>

                <input type="date" className='border border-gray-400 rounded-md outline-none shadow-md font-satoshi text-[14px] p-2' value={date} onChange={(e) => setDate(e.target.value)} />


                <div className='self-end flex gap-5'>

                    <Link href="/" className='font-satoshi self-center text-[grey]'>Cancel</Link >
                    <button type='submit' className='px-5 bg-[#ff4e00] text-white rounded-md py-1'>{submitting?"Editing..." : "Edit"}</button>


                </div>









            </form>


        </section>
    )
}

export default EditLog
