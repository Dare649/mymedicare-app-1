'use client';

import { useEffect } from "react";
import { getPatient } from "@/redux/slice/admin/patient/patient";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import { MdOutlineMail, MdOutlineCalendarMonth } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";


interface UserDetailsProps {
  uuid: string;
  close: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ uuid, close }) => {
  const dispatch = useDispatch<AppDispatch>();
  const patient = useSelector((state: RootState) => state.adminPatient.patient);

  useEffect(() => {
    if (uuid) {
      dispatch(getPatient(uuid));
    }
  }, [dispatch, uuid]);

  if (!patient) return <p>No details available.</p>;

  return (
    <div className="w-full h-full lg:p-5 sm:p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary-5">Patient’s Details</h2>
        <div onClick={close}>
          <IoIosClose size={30} className="cursor-pointer" />
        </div>
      </div>

      {/* Patient ID */}
      <p className="mt-2 text-sm text-gray-600">
        ID:{" "}
        <span className="text-tertiary-1 text-base font-bold">#{patient.id}</span>
      </p>

      {/* Profile Section */}
      <div className="border rounded-xl my-5 p-4 sm:p-6 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Left: Profile + Name + Actions */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Avatar */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-gray-200 shrink-0">
              <Image
                src={patient.profile_picture || "/doc-re.png"}
                alt="patient"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name + Action buttons */}
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 capitalize truncate">
                {patient.name}
              </h2>
            </div>
          </div>

          {/* Right: Active Status Badge */}
          <div className="sm:self-start">
            <span
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm ${
                patient.active_status === "inactive"
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-green-50 text-green-600 border border-green-200"
              }`}
            >
              {patient.active_status === "inactive" ? "Inactive" : "Active"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {/* Appointment button */}
          <button className="flex items-center gap-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 px-2.5 py-1.5 text-xs sm:text-sm font-medium transition">
            <MdOutlineCalendarMonth size={14} />
            Schedule
          </button>

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
      </div>


      {/* Basic Details */}
      <h2 className="text-sm font-semibold text-gray-700 mb-2">Basic Details</h2>
      <div className="border rounded-xl divide-y">
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
            <span className="font-medium capitalize">{patient.sex}</span>
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
            <span className="font-medium">{patient.date_of_birth}</span>
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
            <span className="font-medium">{patient.phone}</span>
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
            <span className="font-medium truncate">{patient.email}</span>
          </div>
        </div>

        {/* <div className="p-3 text-sm flex justify-between">
          <span className="text-gray-500">Home address</span>
          <span className="font-medium">{patient.address}</span>
        </div> */}
        {/* <div className="p-3 text-sm flex justify-between">
          <span className="text-gray-500">Nationality</span>
          <span className="font-medium">{patient.}</span>
        </div> */}

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
              {patient.consultation_count} completed
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
            <span className="font-medium">{patient.created_at}</span>
          </div>
        </div>
      </div>

      {/* Medical Summary */}
      <h2 className="mt-6 text-sm font-semibold text-gray-700 mb-2">Medical Summary</h2> 
      <div className="border rounded-xl divide-y">
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

      {/* Account Status */}
      {/* <h2 className="mt-6 text-sm font-semibold text-gray-700 mb-2">Account status</h2>
      <div className="flex items-center justify-between border rounded-xl p-3">
        <span
          className={`px-3 py-1 rounded-lg text-xs font-medium ${
            patient.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {patient.status}
        </span>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">
          Modify account status
        </button>
      </div> */}
    </div>
  );
};

export default UserDetails;
