import React, { useEffect, useState, useMemo } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import useHomeStore from "../store/homeStore";
import { RiFileExcel2Line } from "react-icons/ri";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

function HouseDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const { panchayathName, wardNo } = location.state || {};
  const {
    houseData,
    fetchHouseData,
    searchHouseData,
    totalItems,
    loading,
    error,
  } = useHomeStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Load initial data
  useEffect(() => {
    if (panchayathName && wardNo) {
      fetchHouseData(panchayathName, wardNo, currentPage);
    }
  }, [panchayathName, wardNo, currentPage]);

  // ✅ API Search Trigger (debounced)
  useEffect(() => {
    if (!searchTerm) return;
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        searchHouseData(
          searchTerm,
          panchayathName,
          wardNo,
          currentPage,
          itemsPerPage
        );
      } else {
        fetchHouseData(panchayathName, wardNo);
      }
    }, 500); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, currentPage, panchayathName, wardNo]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      fetchHouseData(panchayathName, wardNo);
      setCurrentPage(1);
    }
  }, [searchTerm]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleOnClick = (houseId) => {
    navigate(`/basic/${houseId}`, {
      state: { panchayathName, wardNo, houseId },
    });
  };

  return (
    <div className="lg:py-[25px] sm:px-[30px] md:px-[40px] lg:px-[80px] xl:px-[100px]">
      {/* Back Button */}
      <div
        className="flex items-center gap-[10px] text-[#7181ee] cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <p>Back to Dashboard</p>
      </div>

      {/* Title */}
      <h1 className="text-[25px] lg:text-3xl font-bold mt-[15px]">
        {panchayathName} - Ward {wardNo}
      </h1>
      <div className="flex justify-between items-center">
        <p className="mt-[10px]">Manage ward information and house data</p>
        <button className="flex justify-center items-center gap-[3px] border-1 border-green-600  px-[10px] py-[3px] rounded-[5px] bg-green-600 hover:bg-green-700 hover:scale-105 transition duration-200 ease-in-out">
          <p className="text-[22px] text-white">
            <PiMicrosoftExcelLogoFill />
          </p>

          <p className=" text-white font-medium">Export</p>
        </button>
      </div>

      {/* Table Container */}
      <div className="border-0 shadow-2xl mt-[20px] rounded-2xl overflow-hidden">
        {/* Header + Search */}
        <div className="flex justify-between border-b border-gray-300 py-[25px] px-[20px]">
          <h1 className="text-[20px] font-bold pe-4">House Directory</h1>
          <div className="flex flex-1 lg:flex-none items-center border border-[#a3b0c5] text-[#a3b0c5] w-[500px] px-[10px] py-[8px] gap-[5px] rounded-[10px]">
            <CiSearch />
            <input
              className="flex-1 outline-none text-black placeholder-gray-400"
              type="text"
              placeholder="Search by House Name/ House No./ Holder Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-[#707d8f] bg-[#f9fafb]">
              <th className="px-4 py-2 text-left text-[15px]">Sl No</th>
              <th className="px-4 py-2 text-left text-[15px]">HOUSE DETAILS</th>
              <th className="px-4 py-2 text-left text-[15px]">HOUSE HOLDER</th>
              <th className="px-4 py-2 text-left text-[15px]">MEMBERS COUNT</th>
              <th className="px-4 py-2 text-left text-[15px]">
                RATIONCARD TYPE
              </th>
              <th className="px-4 py-2 text-left text-[15px]">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4 font-semibold">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            ) : houseData?.length > 0 ? (
              houseData?.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
                >
                  <td className="px-4 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{item.HouseNo}</p>
                    <p className="text-[#707d8f]">{item.HouseName}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {item.HouseholdHead}
                  </td>
                  <td className="px-4 py-3">{item.FamilymembersNO}</td>
                  <td className="px-4 py-3">{item.RationCardType}</td>
                  <td
                    className="px-4 py-3 text-[#534ae6]"
                    onClick={() => handleOnClick(item.id)}
                  >
                    View Details
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {houseData?.length > 0 && (
          <div className="flex justify-between items-center py-4 px-6 bg-[#f9fafb] border-t">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-lg ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-[#534ae6] border-[#534ae6]"
                }`}
              >
                Prev
              </button>
              <span className="px-3 py-1 text-gray-600">
                {currentPage} / {totalPages || 1}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-lg ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-[#534ae6] border-[#534ae6]"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HouseDetails;
