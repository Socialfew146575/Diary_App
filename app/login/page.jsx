"use client"

import { signIn,useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from "react";

const page = () => {

  const session=useSession();

  const router=useRouter()

  const [showPass,setShowPass]=useState(false)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')



console.log(session.status)

if(session.status==="authenticated") router.push("/")

if(session.status==="loading") {

  return (

    <div className="flex items-center justify-center h-[100vh]">

      <Image src="/loading.gif" width={100} height={100} alt="Loading..."/>



    </div>

  )

}





  return (
    <div className='px-14 pt-10 bg-black flex text-white justify-between'>
     <div className="flex flex-col gap-5">

              <p className='text-[50px] font-bold'>Write stories <br /> that helped you <br /> <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>learn</span></p>



       

      

        <div className="items-center flex gap-2 border bg-white rounded-lg w-[200px]" onClick={()=>signIn("google")}>
          <Image src="/google.png" width={50} height={50} className="self-center" />
          <span className="text-[12px] text-black">Login with Google</span>
        </div> 
         <div className="items-center flex gap-2 border bg-white rounded-lg w-[200px]" onClick={()=>signIn("github")}>
          <Image src="/github.png" width={50} height={50} className="self-center" />
          <span className="text-[12px] text-black">Login with Github</span>
        </div>



     </div>
     <Image src="/login-pic.png" width={600} height={600}/>
    </div>
  )
}

export default page
