import Sidebar from "./SideBar";

const Layout = ({children}) => {
    return ( 
        <div className={`relative flex bg-gray-100 `}>
            <Sidebar />
            {children}
        </div>
     );
}
 
export default Layout;