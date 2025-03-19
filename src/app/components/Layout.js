import Navbar from "./Navbar";
import Sidebar from "./SideBar";

const Layout = ({children}) => {
    return ( 
        <div className={`relative w-full flex text-xs sm:text-sm bg-gray-100  `}>
            <Sidebar />
            <div className="flex flex-col h-screen overflow-y-scroll w-full [&::-webkit-scrollbar]:hidden scrollbar  gap-3 ">
            <Navbar />
            {children}
            </div>
        </div>
     );
}
 
export default Layout;