import React, { useEffect, useState } from "react";
import { useDemoReportStore } from "../store/demoReportStore";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function DemoReport() {
  const navigate = useNavigate();

  const {
    filters,
    panchayaths,
    wards,
    filterValues,
    report,
    total,
    loading,
    fetchFilters,
    fetchPanchayaths,
    fetchWards,
    fetchFilterValues,
    fetchReport,
  } = useDemoReportStore();

  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedPanchayath, setSelectedPanchayath] = useState("All");
  const [selectedWard, setSelectedWard] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 50;

  useEffect(() => {
    fetchFilters();
    fetchPanchayaths();
    fetchWards();
  }, []);

  useEffect(() => {
    if (selectedFilter) {
      fetchFilterValues(selectedFilter);
      setSelectedValue("");
    }
  }, [selectedFilter]);

  const handleFetch = (newPage = 1) => {
    fetchReport({
      filter: selectedFilter,
      value: selectedValue || undefined,
      panchayath: selectedPanchayath,
      ward: selectedWard,
      page: newPage,
      limit,
    });
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
        >
          <IoArrowBack className="text-xl" />
          <span className="font-medium">Back</span>
        </button>

        <h2 className="text-2xl font-bold text-gray-800">
          Demo Report Generator
        </h2>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Filter Options
        </h3>

        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Panchayath Dropdown */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Panchayath
              </label>
              <select
                className="border border-gray-300 p-2.5 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={selectedPanchayath}
                onChange={(e) => setSelectedPanchayath(e.target.value)}
              >
                {panchayaths.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Ward Dropdown */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Ward</label>
              <select
                className="border border-gray-300 p-2.5 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
              >
                {wards.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <select
              className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="">Select Filter</option>
              {filters.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <select
              className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              disabled={!filterValues.length}
            >
              <option value="">All Values</option>
              {filterValues.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => handleFetch(1)}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading || !selectedFilter}
          >
            {loading ? "Loading..." : "Generate Report"}
          </button>
        </div>
      </div>

      {/* Table Section */}
      {report.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Report</h3>
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {Object.keys(report[0]).map((col) => (
                  <th key={col} className="border px-3 py-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {report.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition border-b border-gray-100"
                >
                  {Object.keys(row).map((col) => (
                    <td key={col} className="px-3 py-2">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-gray-700">
            <span className="text-sm">
              Showing {report.length} of {total} records
            </span>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                disabled={page === 1}
                onClick={() => handleFetch(page - 1)}
              >
                Prev
              </button>
              <span className="font-medium">
                Page {page} of {totalPages || 1}
              </span>
              <button
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => handleFetch(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {report.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-10">
          No report data to display. Please apply filters and generate.
        </p>
      )}
    </div>
  );
}
