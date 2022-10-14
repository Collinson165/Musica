/* eslint-disable @next/next/no-img-element */
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Menu from "./SideMenu";

const Header = () => {

  const [mobileMenu, setMobileMenu] = useState(false)

    return ( 
      <div>
        {mobileMenu && <Menu menu={setMobileMenu} />}
        <nav className='px-4 py-4 flex justify-between lg:justify-start'>
          <div>
            <img src="/images/logo.svg" alt="" />
          </div>
          <div className='mx-10 hidden md:flex'>
            <MagnifyingGlassIcon className='h-4 w-4 m-2' />
            <input type="search" name="search" id="" placeholder='search' className='bg-transparent' />
          </div>
          <div className="md:hidden text-3xl" onClick={() => setMobileMenu(prev => !prev)}>
            <Bars2Icon className="h-10" />
          </div>
        </nav>
        
      </div>
        
     );
}
 
export default Header;



