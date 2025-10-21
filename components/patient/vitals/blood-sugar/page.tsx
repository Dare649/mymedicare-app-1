"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { MdOutlineAccessTime, MdOutlineDateRange, MdBloodtype, MdNumbers } from "react-icons/md";

interface BloodSugarProps {
  handleClose?: () => void;
  id: string;
}

interface BloodSugarForm {
  date: string;
  time: string;
  type: string;
  reading: string;
  unit: string;
}

export default function BloodSugar({ handleClose, id }: BloodSugarProps) {
  const [formData, setFormData] = useState<BloodSugarForm>({
    date: "",
    time: "",
    type: "",
    reading: "",
    unit: "",
  });
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${date.getFullYear()}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.type || !formData.reading) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const payload = { ...formData, date: formatDate(new Date(formData.date)) };
      const res = await axiosInstance.post(`/api/partner/rm/create_bsr/${id}`, payload);
      toast.success(res?.data?.message || "Blood sugar recorded successfully!");
      setFormData({ date: "", time: "", type: "", reading: "", unit: "" });
      handleClose?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error submitting blood sugar data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="lg:p-5 sm:p-2">

        {/* Date Field */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
    
        </div>

        {/* Time Field */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
          
        </div>

        {/* Test Type Field */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          >
            <option value="">Select test type</option>
            <option value="fasting">Fasting</option>
            <option value="random">Random</option>
          </select>
          
        </div>
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          >
            <option value="">Please select unit</option>
            <option value="mmol/l">mmol/l</option>
            <option value="mg/dl">mg/dl</option>
          </select>
          
        </div>

        {/* reading Level Field */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <input
            type="number"
            name="reading"
            placeholder="Enter blood sugar level"
            value={formData.reading}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
          
        </div>

        {/* Submit Button */}
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
