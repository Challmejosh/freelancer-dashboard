"use client"
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaFolder, FaLayerGroup, FaReceipt} from "react-icons/fa";
const Sidebar = () => {
    const [nav,setNav] = useState(false)
    const [width, setWidth] = useState(60); 
    const [maxWidth, setMaxWidth] = useState(300);
    const minWidth = 100;
    useEffect(() => {
      const updateMaxWidth = () => {
        if (window.innerWidth < 768) {
          setMaxWidth(200);
        } else {
          setMaxWidth(400);
        }
      };
  
      updateMaxWidth();
      window.addEventListener("resize", updateMaxWidth);
  
      return () => window.removeEventListener("resize", updateMaxWidth);
    }, []);
    return ( 
        <div className="z-50 shrink-0 bg-gray-700 text-white flex items-start justify-between shadow-inner "
        style={{width}}
        animate={{width}}
        >
            <div className="flex my-5 flex-col p-3 gap-5 w-full  ">
                <Link href={"/"} className="flex items-center justify-start gap-3" >
                <div className="p-3">
                <FaLayerGroup size={24} />

                </div>
                <AnimatePresence>
                    {nav && (
                        <motion.p
                        initial={{opacity: 0,scale: 1.1}}
                        animate={{opacity: 1,scale:1}}
                        transition={{duration: 0.3}}
                        exit={{opacity: 0,scale: 1.1}}
                        className="hover:bg-gray-400 w-full flex p-3 rounded-full text-md ">
                            Overview
                        </motion.p>
                    )}

                </AnimatePresence>
                </Link>
                <Link href={"/project"} className="flex items-center justify-start gap-3">
                <div className="p-3">
                <FaFolder size={24} />
                </div>
                <AnimatePresence>
                    {nav && (
                        <motion.p
                        initial={{opacity: 0,scale: 1.1}}
                        animate={{opacity: 1,scale:1}}
                        transition={{duration: 0.3}}
                        exit={{opacity: 0,scale: 1.1}}
                        className="hover:bg-gray-400 w-full flex p-3 rounded-full text-md ">
                            Projects
                        </motion.p>
                    )}

                </AnimatePresence>
                </Link>
                <Link href={"/earning"} className="flex items-center justify-start gap-3">
                <div className="p-3">
                <FaReceipt size={24} />

                </div>
                <AnimatePresence>
                    {nav && (
                        <motion.p
                        initial={{opacity: 0,scale: 1.1}}
                        animate={{opacity: 1,scale:1}}
                        transition={{duration: 0.3}}
                        exit={{opacity: 0,scale: 1.1}}
                        className="hover:bg-gray-400 w-full flex p-3 rounded-full text-md ">
                            Earning & Expenses
                        </motion.p>
                    )}

                </AnimatePresence>
                </Link>
            </div>
            <motion.div className="w-2 h-full cursor-ew-resize"
             style={{marginLeft: -2,marginRight:-5}}
            drag="x"
            dragMomentum={0}
            dragConstraints={{left: 0,right: 0}}
            onDrag={(event,info)=>{
                let newWidth = Math.min(Math.max(width + info.delta.x, minWidth), maxWidth);
                setWidth(newWidth)   
                if(width > 150){
                    setNav(true)
                }else{
                    setNav(false)
                }
            }}
            ></motion.div>
        </div>
     );
}
 
export default Sidebar;