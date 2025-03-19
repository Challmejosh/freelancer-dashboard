'use client'
import { AnimatePresence,motion } from "framer-motion";
import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowDown, FaUserAlt } from "react-icons/fa";

const Navbar = () => {
    const [showPro,setShowPro] = useState(false)
    return ( 
        <div className="bg-slate-300 z-50 sticky p-2 flex flex-col items-end justify-center w-full ">
            <div className="border flex p-1 gap-2 px-2 justify-between items-center w-fit rounded-full  ">
                <div className="bg-black/70 flex items-center justify-center rounded-full w-[50px] h-[50px] ">
                    <FaUserAlt size={24} />
                </div>
                 {showPro ? <FaAngleUp onClick={()=>setShowPro(prev => !prev)} size={24} className="cursor-pointer"  /> : <FaAngleDown onClick={()=>setShowPro(prev => !prev)} size={24}  className="cursor-pointer" />}
            </div>
            <AnimatePresence>
                {showPro&&(
                    <motion.div
                    initial={{opacity: 0,scale: 1.1}}
                    animate={{opacity: 1,scale:1}}
                    transition={{duration: 1}}
                    exit={{opacity: 0,scale: 1.1}}
                    className="absolute top-18 z-50 shadow-inner right-3 p-3 bg-white ">
                        <p className="">Aynonmous</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
     );
}
 
export default Navbar;