/* eslint-disable @next/next/no-img-element */
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import Menu from "./SideMenu";

const Header = () => {

  const [mobileMenu, setMobileMenu] = useState(false)
  const [search, setSearch] = useState('')

    return ( 
      <div>
        {mobileMenu && <Menu menu={setMobileMenu} />}
        <nav className='px-4 py-4 flex justify-between lg:justify-start'>
          <div>
            <Link href="/"><img src="/images/logo.svg" alt="" /></Link>
          </div>
          <div className='mx-10 hidden md:flex'>
            <MagnifyingGlassIcon className='h-4 w-4 m-2' />
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} name="search" id="" placeholder='search' className='bg-transparent' />
          </div>
          <div className="md:hidden text-3xl" onClick={() => setMobileMenu(prev => !prev)}>
            <Bars2Icon className="h-10" />
          </div>
        </nav>
        
      </div>
        
     );
}
 
export default Header;



