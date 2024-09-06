"use client"

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const page = () => {

    const [log, setLog] = useState('')
    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(false)


    const getToday = () => {

        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        let today = year + "-" + month + "-" + day;
        console.log(today)
        return today;

    }
    const [date, setDate] = useState(getToday());

    const router = useRouter();
    const { data: session } = useSession();
    console.log(session)

    const createLog = async (e) => {
        console.log(date)
        e.preventDefault();
        setLoading(true)
        try {

            const response = await fetch("/api/log/new", {
                method: "POST",
                body: JSON.stringify({
                    log: log,
                    date: date,
                    user: session?.user.id,
                    visible: visible,

                }),
            });

            console.log(response)

            if (response.ok) {
                router.push("/")
            }
            if (response.status == "409") {

                router.push("/error")

            }


        } catch (error) {
            console.log(error);

        } finally { setLoading(false) }



    }

    return (
        <section className='px-14 flex flex-col w-full flex-start gap-4'>
            <h1 className='bg-[#ff4e00] bg-gradient-to-r from-[#ff4e00] to-[#ec9f05] bg-clip-text text-transparent mt-5 text-5xl font-extrabold leading-[1.15] text-black
'>Today's Log</h1>

            <p className='max-w-2xl text-[gray]'>
                Introducing "Today's Log" – the indispensable feature within <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-xl font-serif'>Diary</span> that empowers you to capture the essence of your day, one moment at a time. Seamlessly integrated into your diary
            </p>


            <form className='border border-gray-400 rounded-lg h-full max-w-2xl p-3 flex flex-col gap-4' onSubmit={createLog}>

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
                    <button type='submit' className='px-5 bg-[#ff4e00] text-white rounded-md py-1'>{loading ? 'Saving...' : "Save"}</button>


                </div>









            </form>


        </section>
    )
}

export default page
