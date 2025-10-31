'use client';

import { useState, useEffect } from 'react';
import Table from '@/components/table/page';
import { getHqBranches } from '@/redux/slice/hq-partner/hq-branch/hq-branches';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { useRouter } from "next/navigation";


const HqBranches = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const allHqBranches = useSelector((state: RootState) =>
    Array.isArray(state.hqBranches.allHqBranches)
      ? state.hqBranches.allHqBranches
      : []
  );

  // fetch branches list
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getHqBranches()).unwrap();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchPartners();
  }, [dispatch]);

  // Navigate to individual patient page
  // const handleOpenDetails = (row: any) => {
  //   router.push(`/partner/patients/${row.uuid}`);
  // };


  // helper to capitalize first letter
  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "N/A";

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (row: any) => row.user_id,
    },
    {
      key: "name",
      label: "Branch Name",
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
      key: "balance",
      label: "Balance",
      render: (row: any) => capitalize(row.balance),
    },
    {
      key: "patient_count",
      label: "Total Patient",
      render: (row: any) => capitalize(row.patient_count),
    },
    
  ];

  return (
    <section className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Partners Branches</h2>
      
      <Table
        columns={columns}
        data={allHqBranches}
        showView={false}
      />
    </section>
  );
};

export default HqBranches;
