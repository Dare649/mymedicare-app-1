'use client';

import { useState, useEffect } from 'react';
import Table from '@/components/table/page';
import { getAllPatient } from '@/redux/slice/admin/patient/patient';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import Modal from '@/components/modal/page';
import UserDetails from '@/components/patient/user-details/page';

const Users = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const allPatient = useSelector((state: RootState) =>
    Array.isArray(state.adminPatient.allPatient)
      ? state.adminPatient.allPatient
      : []
  );

  // fetch patients
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getAllPatient()).unwrap();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchPatient();
  }, [dispatch]);

  

  // keep the full row object instead of just uuid
  const handleOpenDetails = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
  };



  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  // helper to capitalize first letter
  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "N/A";

  const columns = [
    { key: "id", label: "ID", render: (row: any) => row.id },
    { key: "name", label: "Patient Name", render: (row: any) => capitalize(row.name) },
    { key: "phone", label: "Phone Number", render: (row: any) => row.phone || "N/A" },
    { key: "email", label: "Email Address", render: (row: any) => row.email?.toLowerCase() || "N/A" },
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
        <h2 className="text-xl font-bold">Users</h2>
      </div>
      <Table 
        columns={columns} 
        data={allPatient} 
        handleView={(row) => handleOpenDetails(row)}
    />

      {/* Modal for User Details */}
      <Modal visible={open} onClose={handleClose}>
        {selectedRow && <UserDetails uuid={selectedRow.uuid} close={handleClose}/>}
      </Modal>

    </section>
  );
};

export default Users;
