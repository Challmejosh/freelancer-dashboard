"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
const Sidebar = () => {
    const [width,setWidth] = useState(100)
    const maxWidth = 300
    const minWidth = 100
    return ( 
        <div className="h-screen shrink-0 flex items-start justify-between border "
        style={{width}}
        // animate={{width}}
        >
            <div className="flex flex-col">
                <Link href={"/"}>Overview</Link>
                <Link href={"/"}>Projects</Link>
                <Link href={"/"}>Earning & Expenses</Link>
            </div>
            <motion.div className="w-2 h-full cursor-ew-resize"
             style={{marginLeft: -2,marginRight:-5}}
            drag="x"
            dragMomentum={0}
            dragConstraints={{left: 0,right: 0}}
            onDrag={(event,info)=>{
                let newWidth = Math.min(Math.max(width + info.delta.x, minWidth), maxWidth);
                setWidth(newWidth)   
                console.log(info)
                console.log(event)
            }}
            ></motion.div>
        </div>
     );
}
 
export default Sidebar;