"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { MdOutlineDateRange, MdOutlineAccessTime, MdOutlineScale } from "react-icons/md";

interface WeightProps {
  handleClose?: () => void;
  id: string;
}

interface WeightForm {
  date: string;
  reading: string;
  unit: string;
}

export default function Weight({ handleClose, id }: WeightProps) {
  const [formData, setFormData] = useState<WeightForm>({
    date: "",
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
    if (!formData.date ||  !formData.reading) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const payload = { ...formData, date: formatDate(new Date(formData.date)) };
      const res = await axiosInstance.post(`/api/partner/rm/create_wr/${id}`, payload);
      toast.success(res?.data?.message || "Weight recorded successfully!");
      setFormData({ date: "",  reading: "", unit: "" });
      handleClose?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error submitting weight data");
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

        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          >
            <option value="">Please select unit</option>
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
          
        </div>

        {/* Weight */}
        <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-6">
          <input
            type="number"
            name="reading"
            placeholder="Enter your weight"
            value={formData.reading}
            onChange={handleChange}
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
          <MdOutlineScale size={25} className="text-tertiary-1 font-bold" />
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
