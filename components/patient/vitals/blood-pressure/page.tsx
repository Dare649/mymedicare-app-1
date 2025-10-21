"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import {
  MdOutlineDateRange,
  MdOutlineAccessTime,
  MdOutlineDirectionsRun,
  MdFavorite,
  MdSpeed,
} from "react-icons/md";

interface BloodPressureProps {
  handleClose?: () => void;
  id: string;
}

interface BloodPressureForm {
  date: string;
  time: string;
  activity: string;
  systolic: string;
  diastolic: string;
  pulse_rate: string;
  unit: string;
}

interface FormError {
  [key: string]: string;
}

export default function BloodPressure({ handleClose, id }: BloodPressureProps) {
  const [formData, setFormData] = useState<BloodPressureForm>({
    date: "",
    time: "",
    activity: "",
    systolic: "",
    diastolic: "",
    pulse_rate: "",
    unit: "mmHg",
  });

  const [error, setError] = useState<FormError>({});
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${date.getFullYear()}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError({});

    for (const key in formData) {
      if (!formData[key as keyof BloodPressureForm]) {
        setError(prev => ({ ...prev, [key]: `${key} is required` }));
        return;
      }
    }

    try {
      setLoading(true);
      const payload = { ...formData, date: formatDate(new Date(formData.date)) };
      const response = await axiosInstance.post(`/api/partner/rm/create_bpr/${id}`, payload);

      toast.success(response?.data?.message || "Blood pressure recorded successfully!");
      setFormData({
        date: "",
        time: "",
        activity: "",
        systolic: "",
        diastolic: "",
        pulse_rate: "",
        unit: "mmHg",
      });
      handleClose?.();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="lg:p-5 sm:p-2">

        {/* Date */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
          
        </div>

        {/* Time */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
          
        </div>

        {/* Activity */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          >
            <option value="">Select activity/posture</option>
            <option value="sitting">Sitting</option>
            <option value="standing">Standing</option>
            <option value="lying">Lying Down</option>
          </select>
          
        </div>

        {/* Systolic */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <input
            type="number"
            name="systolic"
            placeholder="Systolic (mmHg)"
            value={formData.systolic}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
          
        </div>

        {/* Diastolic */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <input
            type="number"
            name="diastolic"
            placeholder="Diastolic (mmHg)"
            value={formData.diastolic}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
          
        </div>

        {/* Pulse Rate */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-6">
          <input
            type="number"
            name="pulse_rate"
            placeholder="Pulse Rate (bpm)"
            value={formData.pulse_rate}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
          
        </div>

        <div className="w-full text-center mt-6">
          <button
            disabled={loading}
            className={`font-bold capitalize rounded-lg w-full py-3 transition ${
              loading
                ? "bg-primary-2 cursor-not-allowed"
                : "bg-primary-5 text-white hover:bg-primary-2"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
