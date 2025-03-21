"use client"
import { createContext, useState, useEffect } from "react";

const AppContext = createContext()
const Context = ({children}) => {
    const [title, setTitle] = useState("Active Project")
    const [createProjectshow, setCreateProjectshow] = useState(false)
    const [activeProject, setActiveProject] = useState([])
    const [complete, setComplete] = useState(false)
    const [completeProject, setCompleteProject] = useState([])
    const [archive, setArchive] = useState([])
    const pageVariants = {
        initial: {
            x: "-100vw"
        },
        animate: {
            x: 0,
            transition: {
                duration: 1,
                stiffness: 30
            }
        },
        exit: {
            x: "-100vw"
        }
    }
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
    const createProject = (project, client, deadline, taskInput, fee) => {
        const newProject = {
            project,
            client,
            deadline,
            expenses: 0,
            payment: "",
            fee: parseFloat(fee),
            status: "",
            task: [{ taskInput, isComplete: false }],
        };

        setActiveProject((prevProjects) => {
            const updatedProjects = [...prevProjects, newProject];
            localStorage.setItem("activeProject", JSON.stringify(updatedProjects));
            return updatedProjects;
        });
    };
    const getItem = (key, set) => {
        if (typeof window !== "undefined") {
            const storedProject = localStorage.getItem(key);
            if (storedProject) {
                set(JSON.parse(storedProject));
            }
        }
    }
    const setItem = (value, key) => {
        if (value.length > 0) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
    // To set Arrays to localStorage
    useEffect(() => {
        setItem(activeProject, "activeProject")
    }, [activeProject]);

    useEffect(() => {
        setItem(completeProject, "completeProject")
    }, [completeProject]);

    useEffect(() => {
        setItem(archive, "archive")
    }, [archive]);
    //  get Array from localStorage
    useEffect(() => {
        getItem("activeProject", setActiveProject)
    }, []);
    useEffect(() => {
        getItem("completeProject", setCompleteProject)
    }, []);
    useEffect(() => {
        getItem("archive", setArchive)
    }, []);

    // mark item
    const completeItem = (ind, i) => {
        const updatedProject = activeProject.map((prevItem, index) =>
            index === ind ? {
                ...prevItem,
                task: prevItem.task.map((item, indx) =>
                    indx === i ?
                        { ...item, isComplete: !item.isComplete }
                        : item
                ), payment: "paid",completion: new Date().toLocaleString()
            } : prevItem
        );
        setActiveProject(updatedProject)
        const confirm = updatedProject.map((item, index) =>
            item.task.every(complete => complete.isComplete) ?
                { ...item, status: "completed" } :
                { ...item, status: "" }
        );
        const yes = confirm.find(item => item.status === "completed");
        if (yes) {
            const filter = confirm.filter(item => item.status === "completed");
            const checkIn = completeProject.find(item => item === yes);
            if (checkIn) {
                console.log("completed already");
            } else {
                setCompleteProject([...completeProject, yes]);
            }
            const time = setTimeout(() => {
                setActiveProject(confirm.filter(item => item !== yes));
                localStorage.setItem("activeProject",JSON.stringify(confirm.filter(item => item !== yes)))
                clearTimeout(time);
            }, 50);
        }
    }
    // Add to Archive
    const addArchive = (item, arr, set) => {
        const check = arr.find(itm => itm === item)
        if (check) {
            const confirm = archive.find(itm => itm === check)
            if (confirm) {
                alert("already in archive")
                set(prev => prev.filter(item => item !== check))
            } else {
                setArchive(prev => {
                    const update = [...archive, check]
                    return update
                })
                set(prev => {
                    const update = prev.filter(item => item !== check)
                    localStorage.setItem("activeProject",JSON.stringify(update))
                    return update
                })
            }
        }
    }
    // Add to Active Project
    const addProject = (item, array, set) => {
        const check = array.find(itm => itm === item)
        if (check) {
            check.task.every(itm => itm.isComplete = false)
            setActiveProject(() => {
                const update = [...activeProject, check]
                localStorage.setItem("activeProject", JSON.stringify(update))
                return update
            })
            if (set === "setCompleteProject") {
                setCompleteProject(
                    prev => {
                        const update = prev.filter(itm => itm !== check)
                        localStorage.setItem("completeProject", JSON.stringify(update))
                        return update
                    }
                )
            } else if (set === "setArchive") {
                setArchive(prev => {
                    const update = prev.filter(itm => itm !== check)
                    localStorage.setItem("archive", JSON.stringify(update))
                    return update
                })
            } else {
                return console.error("not recognized")
            }
        }
    }
    const totalEarning = completeProject.reduce((acct, item) => acct + item.fee, 0)
    const totalExpenses = completeProject.reduce((acct, item) => acct + item.expenses, 0)
    const netProfit = totalEarning - totalExpenses
    return (
        <AppContext.Provider value={{ title, totalEarning, totalExpenses, netProfit, pageVariants, archive, addProject, setArchive, addArchive, completeProject, setCompleteProject, complete, completeItem, setComplete, colors, setTitle, createProjectshow, setCreateProjectshow, createProject, activeProject, setActiveProject }}>
            {children}
        </AppContext.Provider>
    );
}

export { Context, AppContext };



