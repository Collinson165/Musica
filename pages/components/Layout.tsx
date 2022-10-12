import Header from "./Header";
import Navigations from "./Navigations";

const Layout = ({children}) => {
    return ( 
        <div>
            <Header />
            <div className='hidden md:block fixed px-4'>
                <Navigations />
            </div>
            {children}
        </div>
    );
}
 
export default Layout;