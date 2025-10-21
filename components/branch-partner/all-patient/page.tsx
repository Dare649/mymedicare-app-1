'use client';

import { useEffect } from 'react';
import Table from '@/components/table/page';
import { getAllBranchPatient } from '@/redux/slice/branch-partner/branch-patient/branch-patient';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";




const AllPatients = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allBranchPatient = useSelector((state: RootState) => Array.isArray(state.branchPartnerPatient.allBranchPatient) ? state.branchPartnerPatient.allBranchPatient : []);

  // fetch partners list
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getAllBranchPatient()).unwrap();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchPartners();
  }, [dispatch]);


  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "PATIENT NAME" },
    { key: "phone", label: "PHONE NUMBER" },
    { key: "email", label: "EMAIL ADDRESS" },
    {
      key: 'sex',
      label: 'GENDER',
      render: (row: any) => row.sex || 'N/A',
    },
    {
      key: 'dob',
      label: 'DATE OF BIRTH',
      render: (row: any) => row.dob || 'N/A',
    },
    {
      key: 'status',
      label: 'STATUS',
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            row?.status === 'active'
              ? 'bg-green-100 text-green-800'
              : row?.status === 'inactive'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {row?.status || 'N/A'}
        </span>
      ),
    },
  ];

  return (
    <section className="p-4 space-y-4">
      <Table 
        columns={columns}
        data={allBranchPatient}
      />
    </section>
  );
};

export default AllPatients;


