"use client"
import { useContext, useState } from "react";
import { AppContext } from "./Context";
import { FaAngleDown, FaAngleUp, FaComment, FaDownload, FaEllipsisV, FaPlus, FaUpload } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Component = () => {
    const {setTitle,title,delItem,archive,setArchive,addProject,setCreateProjectshow,addArchive,colors,activeProject,setActiveProject,completeProject,setCompleteProject,completeItem} = useContext(AppContext)
    const [taskShow,setTaskShow] = useState("")
    const [taskShows,setTaskShows] = useState("")
    const [showCreateTask,setShowCreateTask] = useState(false)
    const [taskArrow,setTaskArrow] = useState(false)
    const [taskArrowComp,setTaskArrowComp] = useState(false)
    const [task,setTask] = useState([])
    const [taskInput,setTaskInput] = useState("")
    const [amount,setAmount] = useState(0)
    const [option,setOption] = useState()
    const handleSubmit = (e,item)=>{
        e.preventDefault()
        item.task = [...task,taskInput]
        setShowCreateTask(false)
        setTaskInput("")
    }
    const handleAmountChange = (id, newAmount) => {
        setActiveProject((prevItems) =>
          prevItems.map((item,index) =>
            index === id ? { ...item, expenses: newAmount } : item
          )
        );
      };
    // TODO: Income and expense in project
    return ( 
        <>
            
            {title ==="Active Project" && 
            <>
            {activeProject.length <= 0 ? (
                <div className="w-full flex items-center justify-center h-screen ">
                    <div className="">
                        <FaPlus onClick={()=>setCreateProjectshow(true)} className="cursor-pointer" size={44} />
                    </div>
                </div>
            ): (
                <div className="grid w-full relative items-center justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeProject.map((item,index)=>{
                        const tasks=item.task
                        return(
                            <AnimatePresence key={index}>
                                <motion.div
                                initial={{opacity: 0,scale: 1.1}}
                                animate={{opacity: 1,scale:1}}
                                transition={{duration: 1}}
                                exit={{opacity: 0,scale: 1.1}}
                                key={index} className="bg-blue-100 [&::-webkit-scrollbar]:hidden scrollbar overflow-auto relative p-4 w-full flex flex-col gap-4 rounded-lg">
                                    <div className="absolute top-2 w-fit right-3 ">
                                        <FaEllipsisV className="cursor-pointer" onClick={()=>setOption(prev => prev === index ? null : index)} size={14} />
                                    </div>
                                    <AnimatePresence>
                                        {option === index && <motion.div 
                                        initial={{opacity: 0,scale: 1.1}}
                                        animate={{opacity: 1,scale:1}}
                                        transition={{duration: 1}}
                                        exit={{opacity: 0,scale: 1.1}}
                                        className="absolute right-3 gap-5 top-8 bg-white p-2 text-xs rounded-sm z-20  ">
                                            <p onClick={()=>delItem(item,activeProject,setActiveProject,"activeProject")} className="cursor-pointer text-red-600 ">delete project</p>
                                            <p onClick={()=>addArchive(item,activeProject,setActiveProject)} className="cursor-pointer">Archive</p>
                                        </motion.div>}
                                    </AnimatePresence>
                                    <h1 className="font-semibold text-2xl mb-3 ">{item.project}</h1>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3 justify-between">
                                            <p className="font-semibold">Client:</p>
                                            <p className="">{item.client}</p>
                                        </div>
                                        <div className="flex items-center gap-3 justify-between">
                                            <p className="font-semibold">Deadline :</p>
                                            <p className="">{item.deadline}</p>
                                        </div>
                                        <div className="w-full flex items-center justify-between gap-3  ">
                                            <p className="font-semibold">Progess</p>
                                            <p> {item.task.filter(itm => itm.isComplete).length} / {item.task.map(itm =>itm).length}</p>
                                        </div>
                                        <div onClick={()=>{
                                            setTaskShow(index)
                                            setShowCreateTask(false)
                                            setTaskArrow(prev => !prev)
                                        }} className="flex cursor-pointer items-center gap-3 justify-between">
                                            <p className="font-semibold">Tasks</p>
                                            {taskShow === index && taskArrow ? <FaAngleUp className="cursor-pointer" /> : <FaAngleDown className="cursor-pointer" />}
                                        </div>
                                        <>
                                            <AnimatePresence>
                                                {taskShow === index && taskArrow && (
                                                    <motion.div
                                                    initial={{opacity: 0,scale: 1.1,originX: 0}}
                                                    animate={{opacity: 1,scale:1,originX:0}}
                                                    transition={{duration: 1}}
                                                    exit={{opacity: 0,scale: 1.1,originX: 0}}
                                                    className="text-xs">
                                                        {item.task.length <= 0 ? (
                                                            <div className="flex items-center justify-center ">No Task Added</div>
                                                        ):
                                                        (
                                                            <>
                                                                {tasks.map((eachTask,indx) => (
                                                                <div onClick={()=>{
                                                                    completeItem(index,indx)
                                                                }} key={indx} className={`cursor-pointer ${eachTask.isComplete ? "line-through": ""} `}>
                                                                    {eachTask.taskInput}
                                                                </div>
                                                            ))}
                                                            </>
                                                        )}
                                                        <div className="flex items-center justify-end">
                                                            {!showCreateTask && <button onClick={()=>setShowCreateTask(true)} className={` ${colors.primary} text-white px-2 rounded-sm cursor-pointer p-1 `}  >create task</button>}
                                                        </div>
                                                        {showCreateTask && (
                                                            <form onSubmit={(e,)=>{
                                                                setActiveProject(prevProjects => 
                                                                    prevProjects.map((project,ind)=> 
                                                                        ind === index ? { ...project, task: [...project.task, {taskInput,isComplete:false}] } : project
                                                                    ))
                                                                    setTaskInput("")
                                                                    setShowCreateTask(false)
                                                            }} className="bg-white text-xs w-full rounded-md p-2 flex items-center gap-2 absolue right-10 top-0 ">
                                                                <input placeholder="create a task" required className="flex w-full p-2 px-3" value={taskInput} onChange={(e)=>setTaskInput(e.target.value)} type="text" />
                                                                {taskInput && <button type="submit" className={`text-xs text-white p-1 px-2 rounded-sm ${colors.primary} `} >add task</button>}
                                                            </form>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                        <div className="flex items-center gap-3 justify-between">
                                            <p className="font-semibold">Payment: </p>
                                            <p className="font-semibold">${item.fee}</p>
                                        </div>
                                        <input
                                            inputMode="numeric"
                                            placeholder="enter expenses amount"
                                            type="number"
                                            value={item.expenses || ""}
                                            onChange={(e) =>
                                            handleAmountChange(index, e.target.value ? Number(e.target.value) : 0)
                                            }
                                            className="shadow-inner bg-[#F6F7F9] p-3 px-5 rounded-md "
                                        />

                                    </div>
                                    
                                </motion.div>
                            </AnimatePresence>
                    )})}
                </div>
            )}
            </>
            }
            {title === "Complete Project" && 
                <>
                    {completeProject.length <= 0 ?(
                        <div className="w-full flex items-center justify-center h-screen ">
                            <div className="">
                                <FaPlus className="cursor-pointer" size={44} />
                            </div>
                        </div>
                    ):(
                        <div className="grid w-full items-center justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {completeProject.map((item,index) =>{
                                return(
                                    <AnimatePresence key={index} >
                                            <motion.div
                                            initial={{opacity: 0,scale: 1.1}}
                                            animate={{opacity: 1,scale:1}}
                                            transition={{duration: 1}}
                                            exit={{opacity: 0,scale: 1.1}}
                                            key={index} className="bg-green-100 [&::-webkit-scrollbar]:hidden scrollbar overflow-auto relative p-4 w-full flex flex-col gap-4 rounded-lg" >
                                                <h1 className="font-semibold text-2xl mb-3 ">{item.project}</h1>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-3 justify-between">
                                                        <p className="font-semibold">Completion Date :</p>
                                                        <p className="">{item.completion}</p>
                                                    </div>
                                                    <div className="flex items-centergap-3 justify-between">
                                                        <p className="font-semibold">Client Name :</p>
                                                        <p className="">{item.client}</p>
                                                    </div>
                                                    <div className="flex gap-3  items-center justify-between">
                                                        <p className="font-semibold">Expenses :</p>
                                                        <p className="">{item.expenses}</p>
                                                    </div>
                                                    <div className="flex flex-col ">
                                                        <div className="flex items-center gap-3 justify-between">
                                                            <p className="font-semibold flex items-center justify-start ">Completed Task</p>
                                                            {taskArrowComp && taskShows === index ? <FaAngleUp onClick={()=>{
                                                            setTaskShows(index)
                                                            setShowCreateTask(false)
                                                            setTaskArrowComp(prev => !prev)
                                                            }} className="cursor-pointer" /> : <FaAngleDown onClick={()=>{
                                                            setTaskShows(index)
                                                            setShowCreateTask(false)
                                                            setTaskArrowComp(prev => !prev)
                                                            }} className="cursor-pointer" />}
                                                        </div>
                                                        <AnimatePresence>
                                                            {taskArrowComp && taskShows === index &&<motion.div 
                                                            initial={{opacity: 0,scale: 1.1,originX: 0}}
                                                            animate={{opacity: 1,scale:1,originX:0}}
                                                            transition={{duration: 1}}
                                                            exit={{opacity: 0,scale: 1.1,originX: 0}}>
                                                            {item.task.map((task,inx)=>(
                                                                <div className="" key={inx}>{task.taskInput} hello</div>
                                                            ))}
                                                            </motion.div>
                                                            }
                                                        </AnimatePresence>
                                                    </div>
                                                    <div onClick={()=>addProject(item,completeProject,"setCompleteProject")} className=" flex items-center justify-start w-full  ">
                                                        <span className=" bg-blue-600 py-3 px-5 rounded-md text-white cursor-pointer ">Reopen Project</span>
                                                    </div>
                                                </div>
                                            </motion.div> 
                                    </AnimatePresence>
                                )
                            })}
                        </div>
                    )}

                </>
            }
            {title === "Pending Project" &&
                <div className="bg-red-100 p-4 flex flex-col gap-4 rounded-lg">
                    <h1 className="font-semibold  ">ProjectName</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p className="">Client Name :</p>
                            <p className="">Name</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="">Status: </p>
                            <p className="">Status says</p>
                        </div>
                    </div>
                    <div className="">
                        Resend Reminder 
                        Follow Up Message
                    </div>
                </div>
            }
            {title === "Archived Project" && 
                <>
                    {archive.length <= 0 ? (
                         <div className="w-full flex items-center justify-center h-screen ">
                            <div className="">
                                <FaPlus className="cursor-pointer" size={44} />
                            </div>
                        </div>
                    ):(
                        <div className="grid w-full relative items-center justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {archive.map((item,index)=>(
                                <AnimatePresence key={index}>
                                    <motion.div 
                                    initial={{opacity: 0,scale: 1.1}}
                                    animate={{opacity: 1,scale:1}}
                                    transition={{duration: 1}}
                                    exit={{opacity: 0,scale: 1.1}}
                                    className="bg-white [&::-webkit-scrollbar]:hidden scrollbar overflow-auto shadow-inner p-4 flex flex-col gap-4 rounded-lg" key={index}>
                                        <h1 className="font-semibold text-2xl mb-3 ">{item.project}</h1>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3 justify-between">
                                                <p className="font-semibold">Client Name :</p>
                                                <p className="">{item.client}</p>
                                            </div>
                                            <div className="flex items-center gap-3 justify-between">
                                                <p className="font-semibold">Completion Date :</p>
                                                <p className="font-semibold">Name</p>
                                            </div>
                                            <div className="flex flex-col ">
                                                <div className="flex items-center gap-3 justify-between">
                                                    <p className="font-semibold flex items-center justify-start ">Completed Task</p>
                                                    {taskArrowComp && taskShows === index ? <FaAngleUp onClick={()=>{
                                                            setTaskShows(index)
                                                            setShowCreateTask(false)
                                                            setTaskArrowComp(prev => !prev)
                                                    }} className="cursor-pointer" /> : <FaAngleDown onClick={()=>{
                                                        setTaskShows(index)
                                                        setShowCreateTask(false)
                                                        setTaskArrowComp(prev => !prev)
                                                    }} className="cursor-pointer" />}
                                                </div>
                                                <AnimatePresence>
                                                    {taskArrowComp && taskShows === index &&<motion.div
                                                    initial={{opacity: 0,scale: 1.1,originX: 0}}
                                                    animate={{opacity: 1,scale:1,originX:0}}
                                                    transition={{duration: 1}}
                                                    exit={{opacity: 0,scale: 1.1,originX: 0}}
                                                    >
                                                    {item.task.map((task,inx)=>(
                                                        <div className="" key={inx}>{task.taskInput}</div>
                                                    ))}
                                                    </motion.div>
                                                    }
                                                </AnimatePresence>
                                            </div>
                                            <div className="flex items-center gap-3 justify-between">
                                            <p className="font-semibold">Payment</p>
                                            <p className="font-semibold">{item.fee}</p>
                                            </div>
                                        </div>
                                        <div onClick={()=>addProject(item,archive,"setArchive")} className=" flex items-center justify-start w-full  ">
                                            <span className=" bg-blue-600 py-3 px-5 rounded-md text-white cursor-pointer ">Reopen Project</span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                    )}
                </>
            }

        </>
     );
}
 
export default Component;