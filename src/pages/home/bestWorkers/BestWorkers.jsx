import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";

const BestWorkers = () => {
  const axiosUse = useAxios();
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: workers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workers"],
    queryFn: async () => {
      const res = await axiosUse.get("/topWorkers");
      return res.data;
    },
  });

  useEffect(() => {
    if (workers.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % workers.length);
    }, 5000); // slower rotation for smoother feel

    return () => clearInterval(interval);
  }, [workers]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Failed to fetch data</div>;

  const getWorker = (offset) => {
    const index = (currentIndex + offset + workers.length) % workers.length;
    return workers[index];
  };

  const transition = {
    duration: 4,
    ease: "easeInOut",
  };

  return (
    <div className="py-8 px-4 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">🚀 Top Worker Spotlight</h2>

      <div className="flex items-center justify-center space-x-6 overflow-hidden relative">
        {/* Previous Worker (dimmed) */}
        <motion.div
          key={`prev-${getWorker(-1)?._id?.$oid}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 0.9 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={transition}
          className="w-[180px] max-md:h-[180px] h-[220px] flex flex-col items-center justify-center bg-gray-200 rounded-xl shadow-sm"
        >
          <img
            src={getWorker(-1)?.image}
            alt="Previous"
            className="w-20 h-20 rounded-full object-cover border border-gray-300 mb-2"
          />
          <p className="text-sm text-gray-500 font-medium">Coin: {getWorker(-1)?.coin}</p>
        </motion.div>

        {/* Current Worker (highlighted) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`current-${getWorker(0)?._id?.$oid}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={transition}
            className="w-[220px] h-[250px] max-md:h-[200px] flex flex-col items-center justify-center bg-white shadow-lg rounded-xl border border-gray-300 z-10"
          >
            <img
              src={getWorker(0)?.image}
              alt="Current"
              className="w-24 h-24 max-md:h-20 max-md:w-20 max-md:m-2 rounded-full object-cover border-2 border-blue-500 mb-3"
            />
            <p className="text-lg font-semibold text-gray-700">{getWorker(0)?.email}</p>
            <p className="text-sm text-gray-500">
              Coin: <span className="font-bold text-blue-600">{getWorker(0)?.coin}</span>
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Next Worker (dimmed) */}
        <motion.div
          key={`next-${getWorker(1)?._id?.$oid}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 0.9 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={transition}
          className="w-[180px]  max-md:h-[180px] h-[220px] flex flex-col items-center justify-center bg-gray-200 rounded-xl shadow-sm"
        >
          <img
            src={getWorker(1)?.image}
            alt="Next"
            className="w-20 h-20 rounded-full object-cover border border-gray-300 mb-2"
          />
          <p className="text-sm text-gray-500 font-medium">Coin: {getWorker(1)?.coin}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default BestWorkers;