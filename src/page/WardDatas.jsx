import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import WardCard from "../component/Wards/WardCard";
import useHomeStore from "../store/homeStore";

function WardDatas() {
  const navigate = useNavigate();
  const location = useLocation();
  const { panchayathName } = location.state || {};

  const { wardData, fetchWardData, loading, error } = useHomeStore();

  useEffect(() => {
    if (panchayathName) {
      fetchWardData(panchayathName);
    }
  }, [panchayathName, fetchWardData]);

  const handleCardClick = (wardNo) => {
    navigate("/house", { state: { panchayathName, wardNo } });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading ward data...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="py-[10px] md:py-[25px] sm:px-[30px] md:px-[40px] lg:px-[80px] xl:px-[100px]">
      <div>
        <div
          className="flex items-center gap-[10px] text-[#7181ee] cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <p>Back to Dashboard</p>
        </div>

        <h1 className="text-[25px] lg:text-3xl font-bold mt-[15px]">
          {panchayathName} - Ward
        </h1>
        <p className="mt-[10px]">Manage ward information and house data</p>

        <div className="grid sm:grid-cols-2 gap-[15px] 2xl:gap-[20px] lg:grid-cols-3 xl:grid-cols-4 mt-[30px]">
          {wardData.map((data) => (
            <WardCard
              key={data.WardNo}
              data={data}
              onCardClick={() => handleCardClick(data.WardNo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WardDatas;
