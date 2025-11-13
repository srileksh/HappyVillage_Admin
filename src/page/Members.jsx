import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import useHomeStore from "../store/homeStore";

function Members() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const { personalId } = params;
  const { name, age, userid } = location.state || {};

  const { personalData, loading, error, fetchPersonalData } = useHomeStore();

  useEffect(() => {
    if (name && age && userid) {
      fetchPersonalData(name, age, userid);
    }
  }, [name, age, userid, fetchPersonalData]);

  // 🔹 Loading
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-blue-600">
        Loading member data...
      </div>
    );

  // 🔹 Error
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">
        Error: {error}
      </div>
    );

  // 🔹 If API says “No personal details found”
  if (personalData?.message?.includes("No personal details found")) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-[#f9fafb]">
        <h1 className="text-3xl font-bold text-gray-700 mb-3">No Data Found</h1>
        <p className="text-gray-500 mb-6">
          No personal details were found for this member.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-[#4f46e5] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#4338ca] transition-all"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>
    );
  }

  // 🔹 If no data object
  if (!personalData || Object.keys(personalData).length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-[#f9fafb]">
        <h1 className="text-3xl font-bold text-gray-700 mb-3">
          No Data Available
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-[#4f46e5] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#4338ca] transition-all"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>
    );
  }

  // ✅ Normal Card View (only when data exists)
  return (
    <div className="lg:py-[25px] sm:px-[30px] md:px-[40px] lg:px-[80px] xl:px-[100px] bg-[#f9fafb] min-h-screen">
      {/* Back Button */}
      <div
        className="flex items-center gap-[10px] text-[#7181ee] cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <p>Back to Dashboard</p>
      </div>

      <h1 className="text-[25px] lg:text-3xl font-bold mt-[15px]">
        Member Details - {personalData?.Name || "N/A"}
      </h1>
      <p className="mt-[10px] text-gray-600">
        Detailed personal and family information
      </p>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white shadow-2xl rounded-2xl p-6">
          <h2 className="text-[20px] font-bold mb-4 border-b pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-y-4">
            <Info label="Name" value={personalData.Name} />
            <Info label="Date of Birth" value={personalData.Dob} />
            <Info label="Blood Group" value={personalData.BloodGroup} />
            <Info label="Father" value={personalData.Father} />
            <Info label="Mother" value={personalData.Mother} />
            <Info
              label="Artistic / Athletic Aptitude"
              value={personalData.ArtisticorAthleticAptitude}
            />
            <Info
              label="Rewards or Prizes"
              value={personalData.RewardsorPrizes}
            />
          </div>
        </div>

        {/* Education & Employment */}
        <div className="bg-white shadow-2xl rounded-2xl p-6">
          <h2 className="text-[20px] font-bold mb-4 border-b pb-2">
            Education & Employment
          </h2>
          <div className="grid grid-cols-2 gap-y-4">
            <Info
              label="Educational Qualification"
              value={personalData.EducationalQualification}
            />
            <Info
              label="Currently Studying"
              value={personalData.CurrentlyStudying}
            />
            <Info
              label="Main Subject"
              value={personalData.EducationMainSubject}
            />
            <Info
              label="Currently Working"
              value={personalData.CurrentlyWorking ? "Yes" : "No"}
            />
            <Info label="Occupation" value={personalData.CurrentOccupation} />
            <Info
              label="Institution Name"
              value={personalData.InstitutionName}
            />
            <Info
              label="Monthly Income"
              value={personalData.AvgPersonalIncomeperMonth}
            />
          </div>
        </div>

        {/* Health */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-[20px] font-bold mb-4 border-b pb-2">
            Health & Other Details
          </h2>
          <div className="grid grid-cols-3 gap-y-4">
            <Info
              label="Physical Challenges"
              value={personalData.PhysicalChallenges ? "Yes" : "No"}
            />
            <Info
              label="Mental Challenges"
              value={personalData.MentalChallenges ? "Yes" : "No"}
            />
            <Info
              label="Exam Stress"
              value={personalData.ExamTensionsorStress ? "Yes" : "No"}
            />
            <Info
              label="Lifestyle Disease"
              value={personalData.LifestyleDisease ? "Yes" : "No"}
            />
            <Info
              label="Disease Type"
              value={personalData.LifestyleDiseaseType || "None"}
            />
            <Info
              label="Getting Pension"
              value={personalData.GettingPension ? "Yes" : "No"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-[14px]">{label}</p>
    <p className="text-[16px] font-semibold text-gray-800">{value || "N/A"}</p>
  </div>
);

export default Members;
