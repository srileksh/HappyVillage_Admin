import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import useHomeStore from "../store/homeStore";

function BasicDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { houseId } = useParams();

  console.log(houseId, "house id");

  const { panchayathName, wardNo } = location.state || {};

  console.log(location.state);

  const { singleHouse, familyData, fetchIndividualHouseDetails, loading } =
    useHomeStore();

  console.log(singleHouse);

  useEffect(() => {
    if (houseId) fetchIndividualHouseDetails(houseId, wardNo);
  }, [houseId]);

  function handleClick(personalId, name, age, userid) {
    navigate(`/member/${personalId}`, { state: { name, age, userid } });
  }

  if (loading || !singleHouse) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-blue-600">
        Loading house details...
      </div>
    );
  }

  return (
    <div className="py-[25px] sm:px-[30px] md:px-[40px] lg:px-[80px] xl:px-[100px]">
      {/* 🔹 Back Button */}
      <div className="flex items-center gap-[10px] text-[#7181ee] cursor-pointer">
        <p>
          <FaArrowLeft />
        </p>
        <p onClick={() => navigate(-1)}>Back to Dashboard</p>
      </div>

      {/* 🔹 Title */}
      <h1 className="text-[25px] lg:text-3xl font-bold mt-[15px]">
        House Details - {singleHouse?.HouseNo}
      </h1>
      <p className="mt-[10px] font-semibold">
        {panchayathName} - Ward {wardNo}
      </p>

      <div className="flex flex-col md:flex-row gap-[25px]">
        {/* ✅ Left Section - Basic Info */}
        <div className="md:w-[60%]">
          <div className="border-0 shadow-2xl mt-[20px] py-[30px] px-[20px] rounded-2xl">
            <h1 className="text-[20px] lg:text-[25px] font-bold">
              Basic Information
            </h1>
            <div className="grid grid-cols-2">
              {[
                ["House Number", singleHouse.HouseNo],
                ["Owner Name", singleHouse.HouseholdHead],
                ["Address", singleHouse.HouseName],
                ["Post Office", singleHouse.PostOffice],
                ["Pincode", singleHouse.Pincode],
                ["No. of Family Members", singleHouse.FamilymembersNO],
                ["Ration Card Type", singleHouse.RationCardType],
                ["Type of House", singleHouse.TypeofHouse],
                ["Area of House", singleHouse.AreaofHouse],
                ["Number of Vehicles", singleHouse.NoofVehicles || "null"],
                [
                  "Area of Land_Paddyland",
                  singleHouse.AreaofLand_Paddyland || "null",
                ],
                [
                  "Area of Land_Dryland",
                  singleHouse.AreaofLand_Dryland || "null",
                ],
                [
                  "Current Cultivation Details",
                  singleHouse.CurrentCultivationDetails,
                ],
              ].map(([label, value], index) => (
                <div className="py-5" key={index}>
                  <p>{label}</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Right Section - Tax + Utilities */}
        <div className="md:w-[40%]">
          {/* Tax Info */}
          <div className="border-0 shadow-2xl mt-[20px] py-[30px] px-[20px] rounded-2xl">
            <h1 className="text-[20px] lg:text-[25px] font-bold">
              Income Information
            </h1>
            <div className="mt-[15px]">
              <p className="mb-[10px]">Monthly Household Income</p>
              <span className="bg-[#dcfce7] px-[10px] py-[5px] rounded-2xl text-[#306534] font-semibold ">
                {singleHouse.MonthlyHouseholdIncome}
              </span>
            </div>
          </div>

          {/* Utility Info */}
          <div className="border-0 shadow-2xl mt-[20px] py-[30px] px-[20px] rounded-2xl">
            <h1 className="text-[20px] lg:text-[25px] font-bold">
              Utility Connections
            </h1>
            {[
              [
                "Availability of Clean Water",
                singleHouse.AvailabilityofCleanWater,
              ],
              ["Electricity", singleHouse.Electricity ? "Yes" : "No"],
              ["Solar", singleHouse.Solar ? "Yes" : "No"],
              ["Gas Connection", singleHouse.GasConnection ? "Yes" : "No"],
              ["Wood Stove", singleHouse.WoodStove ? "Yes" : "No"],
              ["Type of Wood Stove", singleHouse.TypeofWoodStove || "null"],
              ["Toilet Facility", singleHouse.ToiletFacilities ? "Yes" : "No"],
              [
                "Organic Waste Management Method",
                singleHouse.OrganicWasteManagementMethod || "null",
              ],
              [
                "Inorganic Waste Management Method",
                singleHouse.InorganicWasteManagementMethod || "null",
              ],
            ].map(([label, value], index) => (
              <div className="mt-[15px] flex justify-between" key={index}>
                <p>{label}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Family Members Table */}
      <div className="w-full border-0 shadow-2xl mt-[20px] py-[30px] px-[20px] rounded-2xl">
        <h1 className="text-[20px] lg:text-[25px] font-bold">Family Members</h1>
        <table className="w-full mt-[20px] border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-[#707d8f] bg-[#f9fafb]">
              <th className="px-4 py-3 text-left text-[15px]">Sl No</th>
              <th className="px-4 py-3 text-left text-[15px]">NAME</th>
              <th className="px-4 py-3 text-left text-[15px]">AGE</th>
              <th className="px-4 py-3 text-left text-[15px]">GENDER</th>
              <th className="px-4 py-3 text-left text-[15px]">RELATION</th>
              <th className="px-4 py-3 text-left text-[15px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {familyData.length > 0 ? (
              familyData.map((member, index) => (
                <tr key={member._id} className="hover:bg-gray-50 border-b">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-semibold">{member.Name}</td>
                  <td className="p-4 font-semibold">{member.Age}</td>
                  <td className="p-4">{member.Gender}</td>
                  <td className="p-4">{member.Relation}</td>
                  <td className="p-4 text-[#534ae6] cursor-pointer">
                    <button
                      onClick={() =>
                        handleClick(
                          member._id,
                          member.Name,
                          member.Age,
                          member.Userid
                        )
                      }
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No family members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BasicDetails;
