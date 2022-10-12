import Link from "next/link";

const Menu = (props) => {
    return ( 
        <div className="h-screen md:hidden fixed w-full bg-[#1d2124] z-[500] px-2 pt-10 font-[roboto]">
            <div className="text-3xl flex justify-end" onClick={() => props.menu(false)}>X</div>

            <div className="px-5">
                <Link href="/"><div className="flex items-center py-5"><img src="/images/Home.svg" alt="" /> Home</div></Link>
                <Link href="/"><div className="flex items-center py-5"><img src="/images/playlist.svg" alt=""  className="pl-2 mr-3"/> My Collections</div></Link>
                <Link href="/"><div className="flex items-center py-5"><img src="/images/radio.svg" alt=""  className="pl-2 mr-3"/>Radio</div></Link>
                <Link href="/"><div className="flex items-center py-5"><img src="/images/videos.svg" alt="" className="pl-2 mr-3" />Music Videos</div></Link>
                <Link href="/"><div className="flex items-center py-5"><img src="/images/profile.svg" alt="" className="pl-2 mr-3" />Profile</div></Link>
                <Link href="/"><div className="flex items-center py-5"><img src="/images/Logout.svg" alt="" className="pl-2 mr-3" />Logout</div></Link>
                
                
            </div>
        </div>
     );
}
 
export default Menu;