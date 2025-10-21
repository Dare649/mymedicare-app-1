'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import Image from "next/image";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import axiosInstance from "@/utils/axiosInstance";
import Modal from "@/components/modal/page";
import Tab from "@/components/tabs/page";
import BloodPressure from "@/components/patient/vitals/blood-pressure/page";
import BloodSugar from "@/components/patient/vitals/blood-sugar/page";
import Weight from "@/components/patient/vitals/weight/page";

const PatientDetails = () => {
    const { id } = useParams();
    const idStr = Array.isArray(id) ? id[0] : id || "";
    const dispatch = useDispatch<AppDispatch>();
  
    const [reading, setReading] = useState<string>("blood_sugar"); // default
    const [readingsData, setReadingsData] = useState<any[]>([]);
    const [patientData, setPatientsData] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const pageSize = 10;
  
    useEffect(() => {
        if (!idStr) return; // Wait until we actually have a valid id
        
        const fetchPatient = async () => {
            try {
            console.log("📡 Fetching patient details...");
            const res = await axiosInstance.get(`/api/partner/${idStr}/patient_details`);
            console.log("✅ Patient data:", res.data);
            setPatientsData(res.data.data || {});
            } catch (error: any) {
            console.error("❌ Fetch patient error:", error);
            toast.error(
                error.response?.data?.message || "Failed to fetch patient details"
            );
            }
        };

        const fetchReadings = async () => {
            try {
            console.log("📡 Fetching readings for:", reading);
            const res = await axiosInstance.get(
                `/api/partner/${idStr}/get_all_readings/${reading}`
            );

            const data = Array.isArray(res.data.data)
                ? res.data.data
                : res.data.data?.[reading] || [];

            console.log("✅ Readings data:", data);
            setReadingsData(data);
            setCurrentPage(1);
            } catch (error: any) {
            console.error("❌ Fetch readings error:", error);
            toast.error(
                error.response?.data?.message || "Failed to fetch patient readings"
            );
            }
        };

        // Run both requests in parallel
        Promise.all([fetchPatient(), fetchReadings()]);
    }, [idStr, reading]);

  
    // pagination logic
    const totalPages = Math.ceil(readingsData.length / pageSize);
    const paginatedData = readingsData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  
    // 🧠 Tab Renderer for the modal
    const renderTabContent = (tab: string) => {
      switch (tab) {
        case "Blood Sugar":
          return <BloodSugar handleClose={handleVitalsModal} id={idStr} />;
        case "Blood Pressure":
          return <BloodPressure handleClose={handleVitalsModal} id={idStr}/>;
        case "Weight":
          return <Weight handleClose={handleVitalsModal} id={idStr}/>;
        default:
          return null;
      }
    };
  
  
    const handleVitalsModal  = () => {
      setShowModal((prev) => !prev);
    }

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Remote Monitoring</h1>
        <button 
            onClick={handleVitalsModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
          Upload Vitals
        </button>
      </div>

        {/* Modal with Tabs */}
      {showModal && (
        <Modal onClose={handleVitalsModal} visible={showModal}>
          <div className="p-4 bg-white rounded-xl w-full  overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Upload Vitals</h2>
            <Tab
              titles={["Blood Sugar", "Blood Pressure", "Weight"]}
              renderContent={renderTabContent}
              onTabChange={(i, role) => console.log("Tab changed:", role)}
            />
          </div>
        </Modal>
      )}
      

      <div className="w-full flex lg:flex-row sm:flex-col gap-5 items-stretch">
        <div className="sm:w-full lg:w-[40%] lg:p-2 sm:p-1 border-1 rounded-xl">
          <div className="w-full h-full">
                {/* Profile Section */}
                <div className="rounded-xl p-2">
                  <div className="flex flex-col items-center justify-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-gray-200 shrink-0">
                      <Image
                        src={patientData.profile_picture || "/doc-re.png"}
                        alt="patient"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name */}
                    <div className="min-w-0 text-center">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 capitalize truncate">
                        {patientData.name}
                      </h2>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-center flex-wrap gap-2 mt-2">
                      {/* Call button */}
                      <button className="flex items-center gap-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 px-2.5 py-1.5 text-xs sm:text-sm font-medium transition">
                        <IoCallOutline size={14} />
                        Call
                      </button>

                      {/* Email button */}
                      <button className="flex items-center gap-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 px-2.5 py-1.5 text-xs sm:text-sm font-medium transition">
                        <MdOutlineMail size={14} />
                        Email
                      </button>
                    </div>

                    {/* Status Badge */}
                    <div className="flex justify-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm ${
                          patientData.active_status === "inactive"
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-green-50 text-green-600 border border-green-200"
                        }`}
                      >
                        {patientData.active_status === "inactive" ? "Inactive" : "Active"}
                      </span>
                    </div>
                  </div>
   
                </div>
          
          
                {/* Basic Details */}
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Basic Details</h2>
                <div className="rounded-xl divide-y">
                  <div className="p-3 text-sm flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className="w-4 h-4 relative flex-shrink-0">
                      <Image
                        src="/gender.png"
                        alt="gender"
                        fill
                        className="object-contain"
                      />
                    </div>
          
                    {/* Label + Value */}
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-gray-500">Gender</span>
                      <span className="font-medium capitalize">{patientData.sex}</span>
                    </div>
                  </div>
          
                  <div className="p-3 text-sm flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className="w-4 h-4 relative flex-shrink-0">
                      <Image
                        src="/birthday.png"
                        alt="birthday"
                        fill
                        className="object-contain"
                      />
                    </div>
          
                    {/* Label + Value */}
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-gray-500">Birth Date</span>
                      <span className="font-medium">{patientData.date_of_birth}</span>
                    </div>
                  </div>
          
          
                  <div className="p-3 text-sm flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className="w-4 h-4 relative flex-shrink-0">
                      <Image
                        src="/phone.png"
                        alt="phone"
                        fill
                        className="object-contain"
                      />
                    </div>
          
                    {/* Label + Value */}
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-gray-500">Phone number</span>
                      <span className="font-medium">{patientData.phone}</span>
                    </div>
                  </div>
          
          
                  <div className="p-3 text-sm flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className="w-4 h-4 relative flex-shrink-0">
                      <Image
                        src="/email.png"
                        alt="email"
                        fill
                        className="object-contain"
                      />
                    </div>
          
                    {/* Label + Value */}
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-gray-500">Email address</span>
                      <span className="font-medium truncate">{patientData.email}</span>
                    </div>
                  </div>
          
                  <div className="p-3 text-sm flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className="w-4 h-4 relative flex-shrink-0">
                      <Image
                        src="/uit_user-arrows.png"
                        alt="uit_user-arrows"
                        fill
                        className="object-contain"
                      />
                    </div>
          
                    {/* Label + Value */}
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-gray-500">Remote Monitoring</span>
                      <span className="font-medium text-blue-600 cursor-pointer">
                        {patientData.consultation_count} completed
                      </span>
                    </div>
                  </div>
          
          
                  <div className="p-3 text-sm flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className="w-4 h-4 relative flex-shrink-0">
                      <Image
                        src="/calendar.png"
                        alt="calendar"
                        fill
                        className="object-contain"
                      />
                    </div>
          
                    {/* Label + Value */}
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-gray-500">Date registered</span>
                      <span className="font-medium">{patientData.created_at}</span>
                    </div>
                  </div>
                </div>
          
                {/* Medical Summary */}
                <h2 className="mt-6 text-sm font-semibold text-gray-700 mb-2">Medical Summary</h2> 
                <div className="rounded-xl divide-y">
                  <div className="p-3 text-sm flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className="w-4 h-4 relative flex-shrink-0">
                      <Image
                        src="/prescription.png"
                        alt="prescription"
                        fill
                        className="object-contain"
                      />
                    </div>
          
                    {/* Label + Value */}
                    <div className="flex-1 flex justify-between items-center">
                      <span>Prescriptions</span>
                      <span className="text-primary-5 underline">View all</span>
                    </div>
                  </div>
                  <div className="p-3 text-sm flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className="w-4 h-4 relative flex-shrink-0">
                      <Image
                        src="/investigation.png"
                        alt="investigation"
                        fill
                        className="object-contain"
                      />
                    </div>
          
                    {/* Label + Value */}
                    <div className="flex-1 flex justify-between items-center">
                      <span>Investigations</span>
                      <span className="text-primary-5 underline">View all</span>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        <div className="sm:w-full lg:w-[60%] rounded-xl shadow border border-secondary-5 p-2">
          {/* Table */}
          <div className="w-full overflow-x-auto bg-white scrollbar-hide">
            {/* Filter buttons */}
            <div className="w-full flex justify-between items-center mb-3">
              <span className="font-medium whitespace-nowrap mr-2">Filters:</span>
              <div className="flex flex-wrap gap-2 w-full justify-center">
                {["blood_sugar", "blood_pressure", "weight"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setReading(type)}
                    className={`flex-1 text-center p-1 rounded-xl border transition text-sm ${
                      reading === type
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>

            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">S/N</th>
                  {/* Dynamically render headers */}
                  {paginatedData.length > 0 &&
                    Object.keys(paginatedData[0]).map((key) => {
                      if (
                        ["id", "patient_id", "name"].includes(key) || // skip common fields
                        (reading === "blood_sugar" && ["type", "unit"].includes(key)) || // skip for blood sugar
                        (reading === "blood_pressure" && ["activity", "pulse_rate"].includes(key)) // skip for blood pressure
                      )
                        return null;
                      return (
                        <th key={key} className="px-4 py-3 capitalize">
                          {key.replace(/_/g, " ")}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-6 text-center text-gray-500">
                      No {reading.replace("_", " ")} data available.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-blue-600 font-medium cursor-pointer">
                        {String(idx + 1).padStart(3, "0")}
                      </td>
                      {/* Dynamically render row values */}
                      {Object.entries(item).map(([key, value]) => {
                        if (
                          ["id", "patient_id", "name"].includes(key) || // skip common fields
                          (reading === "blood_sugar" && ["type", "unit"].includes(key)) || // skip for blood sugar
                          (reading === "blood_pressure" && ["activity", "pulse_rate"].includes(key)) // skip for blood pressure
                        )
                          return null;

                        // Style status fields
                        if (key === "status") {
                          return (
                            <td key={key} className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium
                                  ${
                                    value === "Normal" || value === "Healthy Weight"
                                      ? "bg-green-100 text-green-700"
                                      : value === "High" || value === "Risk"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : value === "Poor"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                              >
                                {String(value)}
                              </span>
                            </td>
                          );
                        }

                        return (
                          <td key={key} className="px-4 py-3">
                            {String(value) || "N/A"}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Showing data{" "}
                {Math.min((currentPage - 1) * pageSize + 1, readingsData.length)} to{" "}
                {Math.min(currentPage * pageSize, readingsData.length)} of{" "}
                {readingsData.length} entries
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>


      </div>
    </section>
  );
};

export default PatientDetails;