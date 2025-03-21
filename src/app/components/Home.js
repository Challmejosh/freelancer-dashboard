'use client'

import { useContext } from "react";
import { AppContext } from "./Context";
import { AnimatePresence,motion } from "framer-motion";
import Chart from "./chart";

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
            className="mx-5 flex flex-col gap-5 ">
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

                <div className="">
                    <table className="w-full p-3 shadow bg-blue-50 rounded-lg overflow-hidden  ">
                        <thead className="">
                            <tr className="uppercase">
                                <th className="p-3">ongoing</th>
                                <th className="p-3">completed</th>
                                <th className="p-3">archived</th>
                            </tr>
                        </thead>
                        <tbody className="" >
                            <tr>
                                <td className="px-2 py-3">{activeProject.map((item,index)=>(
                                    <span className="flex items-center justify-center" key={index}> {item.project} </span>
                                ))}</td>
                                <td className="px-2 py-3">{completeProject.map((item,index)=>(
                                    <span className="flex items-center justify-center" key={index}> {item.project} </span>
                                ))}</td>
                                <td className="px-2 py-3">{archive.map((item,index)=>(
                                    <span className="flex items-center justify-center" key={index}> {item.project} </span>
                                ))}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex my-5 w-full items-center justify-center ">
                    <div className=" w-full sm:w-[700px] max-w-4xl  flex items-center justify-center ">
                        <Chart complete={complete} active={active} archive={archiveProject} />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default HomePage;