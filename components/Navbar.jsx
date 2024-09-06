"use client"

import Image from "next/image"
import Link from "next/link"
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import { signIn, signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation";



const Navbar = () => {
  const pathname = usePathname();



  const { data: session } = useSession();
  console.log(session)

  return (
    <nav className={`px-14 py-5 flex justify-between ${pathname === "/login" && 'bg-black'}`}>


      <Link href="/"> <Image src="/diary-logo.png" width={100} height={30} alt="Diary" /></Link>







      {session?.user ? <>

        <div className="flex items-center gap-10">
          <Link href="/create-log">          <button className="text-[grey] text-[14px]"><DriveFileRenameOutlineOutlinedIcon />&nbsp;&nbsp;<span className="text-black">Write</span></button>
          </Link>


          <button className="px-3 text-black bg-white h-8 rounded-2xl border border-black hover:bg-black hover:text-white self-center"
            onClick={() => signOut()}
          >
            Sign Out
          </button>

          <>
            {session?.user?.image && <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link> 
            
            
            
            }
          </>


        </div>



      </> :
        <>
          {pathname !== "/login" && <Link href="/login" className="self-center">
            <button className="px-5 text-white bg-black h-8 rounded-2xl border border-black hover:bg-white hover:text-black">
              Sign In
            </button>
          </Link>}



        </>

      }








    </nav>
  )
}

export default Navbar
