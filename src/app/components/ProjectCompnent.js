"use client"
import { useContext, useState } from "react";
import { AppContext } from "./Context";
import { FaAngleDown, FaAngleUp, FaComment, FaDownload, FaEllipsisV, FaPlus, FaUpload } from "react-icons/fa";

const Component = () => {
    const {setTitle,title,setCreateProjectshow,colors,activeProject,completes,setCompletes,setActiveProject,completeProject,completeItem} = useContext(AppContext)
    const [taskShow,setTaskShow] = useState("")
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
    return ( 
        <>
            
            {title ==="Active Project" && 
            <>
            {activeProject.length <= 0 ? (
                <div className="w-full flex items-center justify-center ">
                    <div className="">
                        <FaPlus onClick={()=>setCreateProjectshow(true)} className="cursor-pointer" size={44} />
                    </div>
                </div>
            ): (
                <div className="grid w-full relative items-center justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeProject.map((item,index)=>{
                        const tasks=item.task
                        return(
                        <div key={index} className="bg-blue-100 relative p-4 w-full flex flex-col gap-4 rounded-lg">
                            <div className="absolute top-2 w-fit right-3 ">
                                <FaEllipsisV className="cursor-pointer" onClick={()=>setOption(prev => prev === index ? null : index)} size={14} />
                            </div>
                            {option === index && <div className="absolute right-3 top-10 mt-10 bg-white p-2 text-xs rounded-sm z-20  ">
                                <p className="cursor-pointer">Archive</p>
                            </div>}
                            <h1 className="font-semibold text-2xl mb-3 ">{item.project}</h1>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <p className="">Client:</p>
                                    <p className="">{item.client}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="">Deadline :</p>
                                    <p className="">{item.deadline}</p>
                                </div>
                                <div className="w-full bg-gray-500 h-1 rounded-lg">
                                    <p className="w-3/4 bg-blue-400 h-full rounded-lg "></p>
                                </div>
                                <div onClick={()=>{
                                    setTaskShow(index)
                                    setShowCreateTask(false)
                                    setTaskArrow(prev => !prev)
                                }} className="flex cursor-pointer items-center justify-between">
                                    <p className="">Tasks</p>
                                    {taskShow === index && taskArrow ? <FaAngleUp className="cursor-pointer" /> : <FaAngleDown className="cursor-pointer" />}
                                </div>
                                <>
                                    {taskShow === index && taskArrow && (
                                        <div className="text-xs">
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
                                        </div>
                                    )}
                                </>
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">Payment: </p>
                                    <p className="font-semibold">${item.fee}</p>
                                </div>
                            </div>
                            <div className=" flex items-center justify-between p-2 gap-2 ">
                                {/* update Progress */}
                                <FaComment />
                                <FaUpload />
                            </div>
                        </div>
                    )})}
                </div>
            )}
            </>
            }
            {title === "Complete Project" && 
                <>
                    {completeProject.length <= 0 ?(
                        <div className="w-full flex items-center justify-center ">
                            <div className="">
                                <FaPlus className="cursor-pointer" size={44} />
                            </div>
                        </div>
                    ):(
                        <div className="grid w-full items-center justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {completeProject.map((item,index) =>{
                                return(
                                    <div className="" key={index}>
                                        {item.map((each,ind)=>(
                                            <div key={index} className="bg-green-100 relative p-4 w-full flex flex-col gap-4 rounded-lg" >
                                                <h1 className="font-semibold text-2xl mb-3 ">{each.project}</h1>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold">Completion Date :</p>
                                                        <p className="">Name</p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold">Client Name :</p>
                                                        <p className="">{each.client}</p>
                                                    </div>
                                                    <div className="flex flex-col ">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold flex items-center justify-start ">Completed Task</p>
                                                            {taskArrowComp ? <FaAngleUp onClick={()=>setTaskArrowComp(prev => !prev)} className="cursor-pointer" /> : <FaAngleDown onClick={()=>setTaskArrowComp(prev => !prev)} className="cursor-pointer" />}
                                                        </div>
                                                        {taskArrowComp&&<>
                                                        {each.task.map((task,inx)=>(
                                                            <div className="" key={inx}>{task.taskInput}</div>
                                                        ))}
                                                        </>
                                                        }
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="">⭐⭐⭐⭐⭐</p>
                                                    </div>
                                                </div>
                                            </div> 
                                        ))}
                                    </div>
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
                <div className="bg-red-100 p-4 flex flex-col gap-4 rounded-lg">
                    <h1 className="font-semibold  ">ProjectName</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p className="">Client Name :</p>
                            <p className="">Name</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="">Completion Date :</p>
                            <p className="">Name</p>
                        </div>
                        <div className="flex items-center justify-between">
                           <p className="">Links</p>
                        </div>
                    </div>
                    <div className="">
                        Reopen Project
                    </div>
                </div>
            }
            {completes && (
                <div className="">
                    <input type="text" value={amount} onChange={()=>setAmount(e.target.value)} />
                    <button onClick={()=>{
                        setCompletes(false)
                        setAmount()
                    }} >confirm</button>
                </div>
            )}
        </>
     );
}
 
export default Component;