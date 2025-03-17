"use client"
import { collectSegments } from "next/dist/build/segment-config/app/app-segments";
import { createContext, useState } from "react";

const AppContext = createContext()
const Context = ({children}) => {
    const [title,setTitle] = useState("Active Project")
    const [createProjectshow,setCreateProjectshow] = useState(false)
    const [activeProject,setActiveProject] = useState([])
    const [complete,setComplete] = useState(false)
    const [completeProject,setCompleteProject] = useState([])
    const colors = {
        primary: "bg-blue-600",    // Primary accent color (buttons, highlights)
        secondary: "bg-gray-700",  // Sidebar & text contrast
        background: "bg-gray-100", // Light background for a clean UI
        card: "bg-white",          // Project cards & sections
        textPrimary: "text-gray-900",  // Main text
        textSecondary: "text-gray-600", // Secondary text
        border: "border-gray-300",  // Dividers and outlines
        success: "bg-green-500",    // Completed projects, success messages
        warning: "bg-yellow-500",   // Pending projects, alerts
        danger: "bg-red-500",       // Errors or warnings
      };
    //   create project
    const createProject =async (project,client,deadline,taskInput,fee)=>{
        const todo = [];
        const input = []
        setActiveProject([...activeProject,{project,client,deadline,fee,status: "",task: [...input,{taskInput,isComplete: false}]}])
    }
    // mark item
    const completeItem = (ind,i)=>{
        const updatedProject = activeProject.map((prevItem, index) => 
            index === ind ? {
                ...prevItem, 
                task: prevItem.task.map((item, indx) => 
                    indx === i ? 
                        { ...item, isComplete: !item.isComplete } 
                        : item
                )
            } : prevItem
        );
        setActiveProject(updatedProject)
        const confirm = updatedProject.map((item,index)=>  item.task.every(complete => complete.isComplete) ? {...item, status: "completed"} :{ ...item, status: "" }  )
        if(confirm){
            const filter = confirm.filter(item =>item.status==="completed")
                setCompleteProject([...completeProject,filter])
            const time = setTimeout(() => {
                setActiveProject(confirm.filter(item => item.status !== "completed"))
            }, 5000);
        }
    }
    
    return ( 
        <AppContext.Provider value={{title,completeProject,complete,completeItem,setComplete,colors,setTitle,createProjectshow,setCreateProjectshow,createProject,activeProject,setActiveProject}}>
            {children}
        </AppContext.Provider>
     );
}
 
export {Context,AppContext};