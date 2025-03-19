"use client"

import { useContext, useState } from "react";
import { AppContext } from "../Context";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const CreateProject = () => {
    const {colors,setCreateProjectshow,createProject} = useContext(AppContext)
    const [projectName,setProjectName] = useState("")
    const [clientName,setClientName] = useState("") 
    const [deadline,setDeadline] = useState("")
    const [task,setTask] = useState("")
    const [fee,setFee] = useState(0)
    const handleSubmit= (e,projectName,clientName,deadline,task,fee)=>{
        e.preventDefault();
        createProject(projectName,clientName,deadline,task,fee)
        setCreateProjectshow(false)
    }
    return ( 
        <motion.form
        initial={{opacity: 0,scale: 1.1}}
        animate={{opacity: 1,scale:1}}
        transition={{duration: 1}}
        exit={{opacity: 0,scale: 1.1}}
        onSubmit={(e)=>{
            handleSubmit(e,projectName,clientName,deadline,task,fee)
        }} action="" className=" bg-white p-3 text-xs sm:text-sm absolute top-10 rounded-lg shadow-lg gap-2 z-50 flex flex-col overflow-auto w-[300px] sm:w-[400px] min-w-fit max-w-[600px] md:w-[400px]">
            <div className="flex w-full justify-end">
                <FaTimes className="cursor-pointer" onClick={()=>setCreateProjectshow(false)} />
            </div>
            <div className="flex gap-3">
                <div className="flex flex-col gap-3  ">
                    <label htmlFor="projectName" className="">Project Name</label>
                    <input value={projectName} onChange={(e)=>setProjectName(e.target.value)} required placeholder="project name" type="text" id="projectName" className="flex w-full shadow-inner p-3 px-5 bg-slate-200  rounded-md " />
                </div>
                <div className="flex flex-col gap-3  "> 
                    <label htmlFor="clientName" className="">Client Name</label>
                    <input value={clientName} onChange={(e)=>setClientName(e.target.value)} required placeholder="client" type="text" id="clientName" className="flex w-full shadow-inner p-3 px-5 bg-slate-200  rounded-md " />
                </div>
            </div>
            <div className="flex justify-between gap-3">
                <div className="flex flex-col w-full gap-3  ">
                    <label htmlFor="deadlineDate" className="">Deadline Date</label>
                    <input value={deadline} onChange={(e)=>setDeadline(e.target.value)} required type="date" id="deadlineDate" className="flex w-full shadow-inner p-3 px-5 bg-slate-200  rounded-md " />
                </div>
                <div className="flex flex-col w-full gap-3 ">
                    <label htmlFor="task" className="" >Add one task</label>
                    <input placeholder="enter one task" required value={task} onChange={(e)=>setTask(e.target.value)} type="text" className="flex w-full shadow-inner p-3 px-5 bg-slate-200  rounded-md " id="task" />
                </div>
            </div>
            <div className="flex flex-col gap-3 ">
                <label htmlFor="fee" className="" >Fee</label>
                <>
                <input placeholder="enter one amount to be paid" required value={fee} onChange={(e)=>setFee(e.target.value)} type="number" className="flex w-full shadow-inner p-3 px-5 bg-slate-200  rounded-md " id="fee" />
                </>
            </div>
            {projectName && clientName && deadline  && task && <div className="flex my-3 items-center justify-end">
                <button className={` ${colors.primary} p-3 px-5 text-white rounded-md cursor-pointer `} type="submit">create project</button>
            </div>}
        </motion.form>
     );
}
 
export default CreateProject;