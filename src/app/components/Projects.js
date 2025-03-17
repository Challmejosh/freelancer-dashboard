"use client"
import { useContext, useState } from "react";
import { AppContext } from "./Context";
import CreateProject from "./Forms/createProject";
import Component from "./ProjectCompnent";

const Projects = () => {
    const {colors,setTitle,setCreateProjectshow,title,createProjectshow} = useContext(AppContext)
    const [eachPage,setPage] = useState("Active Project")
    const projectPage = [
        "Active Project",
        "Complete Project",
        "Pending Project",
        "Archived Project"
    ]
    return ( 
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-end w-full animate-pulse">
                <button onClick={()=>setCreateProjectshow(true)} className={`${colors.primary} hover:bg-blue-700 p-3 rounded-md cursor-pointer text-white px-5 `}>Create Project</button>
            </div>
            <div className={`flex w-full items-center justify-between ${colors.card} `}>
                {projectPage.map((page, index) => (
                    <div onClick={()=>{
                        setPage(page)
                        setTitle(page)
                        }} key={index} className={` ${eachPage === page && colors.primary} p-4 cursor-pointer hover:bg-blue-200 `}>
                        <h1 className="font-semibold">{page}</h1>
                    </div>
                ))}
            </div>
            <Component />
            {createProjectshow && <CreateProject />}
        </div>
     );
}
 
export default Projects;