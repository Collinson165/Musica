/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Navigations = () => {
    return ( 
        <div>
            <div className='bg-[#1a1e1f] rounded-full w-10 my-5 py-2'>

            <Link href="/"><img src="/images/Home.svg" alt="" className="" /></Link>
            <Link href="/Collections"><img src="/images/playlist.svg" alt="" className="pl-2 py-1 " /></Link>
            <img src="/images/radio.svg" alt=""  className="pl-2 py-2"/>
            <img src="/images/videos.svg" alt=""  className="pl-2 py-2"/>
            </div>
            <div className='bg-[#1a1e1f] rounded-full w-10 my-5 py-2' >
            <img src="/images/profile.svg" alt=""  className="pl-2 py-2"/>
            <img src="/images/Logout.svg" alt=""  className="pl-2 py-2"/>
            </div>
        </div>
     );
}
 
export default Navigations;
