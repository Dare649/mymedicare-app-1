'use client';

import { useState, useEffect } from 'react';
import Table from '@/components/table/page';
import Modal from '@/components/modal/page';
import CreatePartner from '@/components/admin/partner/create-partner/page';
import { getAllPartners, getPartner } from '@/redux/slice/admin/partner/partner';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { useRouter } from "next/navigation";



const PatientSchedule = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const allPartner = useSelector((state: RootState) => Array.isArray(state.adminPartner.allPartner) ? state.adminPartner.allPartner : []);

  // fetch partners list
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getAllPartners()).unwrap();
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchPartners();
  }, [dispatch]);


  // Toggle modal
  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Company Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (status: string) => {
        let color = "";

        switch (status) {
          case "verified":
            color = "text-green-600";
            break;
          case "Rejected":
            color = "text-red-600";
            break;
          default:
            color = "text-[#334155]";
        }

        return <span className={`capitalize font-medium ${color}`}>{status}</span>;
      }
    }
  ];

  return (
    <section className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Partners</h2>
        <button
          onClick={handleModal}
          className="px-4 py-2 bg-primary-5 text-white rounded-md hover:bg-primary/90 transition cursor-pointer"
        >
          New Partner
        </button>
      </div>
      <Table 
        columns={columns}
        data={allPartner}
      />

      {
        open && (
          <Modal
            onClose={handleModal}
            visible={open}
          >
            <CreatePartner
              close={handleModal}
            />
          </Modal>
        )
      }
    </section>
  );
};

export default PatientSchedule;


