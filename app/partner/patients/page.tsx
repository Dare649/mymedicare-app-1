'use client';

import { useState, useEffect } from 'react';
import Table from '@/components/table/page';
import Modal from '@/components/modal/page';
import CreatePatient from '@/components/partner/create-patient/page';
import { getAllHqPatient } from '@/redux/slice/hq-partner/hq-patient/hq-patient';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { useRouter } from "next/navigation";


const PatientSchedule = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const allPartnerPatient = useSelector((state: RootState) =>
    Array.isArray(state.hqPatient.allPartnerPatient)
      ? state.hqPatient.allPartnerPatient
      : []
  );

  // fetch patients list
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getAllHqPatient()).unwrap();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchPartners();
  }, [dispatch]);

  // Navigate to individual patient page
  const handleOpenDetails = (row: any) => {
    router.push(`/partner/patients/${row.uuid}`);
  };

  // Toggle modal for CreatePatient
  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  // helper to capitalize first letter
  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "N/A";

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (row: any) => row.id,
    },
    {
      key: "name",
      label: "Patient Name",
      render: (row: any) => capitalize(row.name),
    },
    {
      key: "phone",
      label: "Phone Number",
      render: (row: any) => row.phone || "N/A",
    },
    {
      key: "email",
      label: "Email Address",
      render: (row: any) => row.email?.toLowerCase() || "N/A",
    },
    {
      key: "mobile_app_patient",
      label: "Mobile App",
      render: (row: any) => capitalize(row.mobile_app_patient),
    },
    {
      key: "status",
      label: "Status",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            row?.status === "active"
              ? "bg-green-100 text-green-800"
              : row?.status === "inactive"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {capitalize(row?.status)}
        </span>
      ),
    },
  ];

  return (
    <section className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Patients</h2>
        <button
          onClick={handleModal}
          className="px-4 py-2 bg-primary-5 text-white rounded-md hover:bg-primary/90 transition cursor-pointer"
        >
          Add Patient
        </button>
      </div>

      <Table
        columns={columns}
        data={allPartnerPatient}
        handleView={(row) => handleOpenDetails(row)}
      />

      {/* Modal only for creating patient */}
      {open && (
        <Modal onClose={handleModal} visible={open}>
          <CreatePatient close={handleModal} />
        </Modal>
      )}
    </section>
  );
};

export default PatientSchedule;
