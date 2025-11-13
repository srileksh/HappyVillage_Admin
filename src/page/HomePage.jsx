import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanchaytCard from "../component/Home/PanchaytCard";
import useHomeStore from "../store/homeStore";
import { FiFilter } from "react-icons/fi";

function HomePage() {
  const navigate = useNavigate();
  const { panchayathData, fetchPanchayathData, loading, error } =
    useHomeStore();

  useEffect(() => {
    fetchPanchayathData();
  }, [fetchPanchayathData]);

  const handleCardClick = (panchayathName) => {
    navigate("/ward", { state: { panchayathName } });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading Panchayath data...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div className=" lg:py-[30px]  sm:px-[50px] lg:px-[80px] xl:px-[100px]">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Manage your panchayat data and ward information</p>
      <div>
        <div>
          <div className=" bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-6 w-full lg:w-1/2  text-center border border-gray-100 mt-4">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <FiFilter className="text-blue-600 w-6 h-6" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Advanced Filter
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-gray-500 mb-5">
              Filter and export house data with custom criteria
            </p>

            {/* Button */}
            <button
              onClick={() => navigate("/demoReport")}
              className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              Open Filter
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-col-1 lg:grid-cols-2 gap-[40px] lg:gap-[40px] justify-between mt-[30px]">
        {panchayathData.map((data, index) => (
          <PanchaytCard
            key={index}
            data={data}
            onClick={() => handleCardClick(data.Panchayath)}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
