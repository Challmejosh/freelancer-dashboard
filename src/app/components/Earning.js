'use client'
import { useContext } from "react";
import { AppContext } from "./Context";
import { AnimatePresence, motion } from "framer-motion";

const Earning = () => {
    const {completeProject,pageVariants} = useContext(AppContext)
    const totalEarning = completeProject.reduce((acct,item)=> acct + item.fee,0)
    const totalExpenses = completeProject.reduce((acct,item)=> acct + item.expenses,0)
    const netProfit = totalEarning-totalExpenses
    return ( 
        <AnimatePresence mode="wait">
            <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mx-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
                    <div className="w-full flex p-3 gap-3 px-5 shadow-sm bg-gray-200 h-[150px] items-start justify-start rounded-md ">
                        Earning {totalEarning}
                    </div>
                    <div className="w-full flex p-3 gap-3 px-5 shadow-sm bg-gray-200 h-[150px] items-start justify-start rounded-md ">
                        Expenses {totalExpenses}
                    </div>
                    <div className="w-full flex p-3 gap-3 px-5 shadow-sm bg-gray-200 h-[150px] items-start justify-start rounded-md ">
                        <p className="">Net Profit</p>
                        <p className="">{netProfit}</p>
                    </div>
                </div>
                <div className="">

                </div>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default Earning;