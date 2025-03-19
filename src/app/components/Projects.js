"use client"
import { useContext, useState } from "react";
import { AppContext } from "./Context";
import CreateProject from "./Forms/createProject";
import Component from "./ProjectCompnent";
import { AnimatePresence , motion } from "framer-motion";

const Projects = () => {
    const {colors,setTitle,pageVariants,setCreateProjectshow,title,createProjectshow,expensesCond,setExpensesCond,expenses,setExpenses} = useContext(AppContext)
    const [eachPage,setPage] = useState("Active Project")
    const projectPage = [
        "Active Project",
        "Complete Project",
        "Archived Project"
    ]
    return ( 
        <AnimatePresence mode="wait">
            <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col mx-5 items-center justify-center gap-5">
                <div className="flex items-center justify-end w-full">
                    <button onClick={()=>setCreateProjectshow(true)} className={`${colors.primary} hover:bg-blue-700 p-1 md:p-3 rounded-md cursor-pointer text-white px-2 md:px-5 `}>Create Project</button>
                </div>
                <div className={`flex w-full items-center justify-between rounded-lg [&::-webkit-scrollbar]:hidden scrollbar overflow-auto ${colors.card} `}>
                    {projectPage.map((page, index) => (
                        <div onClick={()=>{
                            setPage(page)
                            setTitle(page)
                            }} key={index} className={` ${eachPage === page && colors.primary} p-2 sm:p-4 cursor-pointer hover:bg-blue-200 `}>
                            <h1 className=" text-xs sm:text-sm font-semibold">{page}</h1>
                        </div>
                    ))}
                </div>
                <Component />
                <AnimatePresence>
                    {createProjectshow && <CreateProject />}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default Projects;