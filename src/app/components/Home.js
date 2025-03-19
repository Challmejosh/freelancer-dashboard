'use client'

import { useContext } from "react";
import { AppContext } from "./Context";
import { AnimatePresence,motion } from "framer-motion";

const HomePage = () => {
    const {activeProject,pageVariants,completeProject,archive} = useContext(AppContext)
    const complete = completeProject.length
    const active = activeProject.length
    const archiveProject = archive.length
    return ( 
        <AnimatePresence mode="wait">
            <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mx-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
                    <div className="w-full text-lg flex p-3 gap-3 px-5 shadow-sm bg-gray-200 h-[150px] items-start justify-start rounded-md ">
                        <p className="">Active Projects</p>
                        <p className="">{active}</p>
                    </div>
                    <div className="w-full text-lg flex p-3 gap-3 px-5 shadow-sm bg-gray-200 h-[150px] items-start justify-start rounded-md ">
                        <p className="">Completed Projects</p>
                        <p className="">{complete}</p>
                    </div>
                    <div className="w-full text-lg flex p-3 gap-3 px-5 shadow-sm bg-gray-200 h-[150px] items-start justify-start rounded-md ">
                        <p className="">Archive Projects</p>
                        <p className="">{archiveProject}</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default HomePage;