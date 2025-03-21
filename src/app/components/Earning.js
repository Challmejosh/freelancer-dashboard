'use client'
import { useContext } from "react";
import { AppContext } from "./Context";
import { AnimatePresence, motion } from "framer-motion";
import PieChart from "./PieChart";

const Earning = () => {
    const {completeProject,pageVariants,totalEarning,totalExpenses,netProfit} = useContext(AppContext)

    return ( 
        <AnimatePresence mode="wait">
            <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mx-5 flex flex-col gap-5 ">
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
                <div className="w-full flex items-center justify-center">
                <div className=" w-full sm:w-[700px] max-w-4xl  flex items-center justify-center ">
                    <PieChart />
                </div>
                </div>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default Earning;