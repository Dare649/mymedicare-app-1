'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBranchRiskPatient, getAllBranchInactivePatient } from '@/redux/slice/branch-partner/branch-patient/branch-patient';
import Card from '@/components/card/page';
import SwitchButton from '@/components/switch-button/page';
import DashboardTable from '@/components/dashboard-table/page';
import { RootState, AppDispatch } from '@/redux/store';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import { toast } from 'react-toastify';
import { getPartnerDashboard } from '@/redux/slice/dashboard/dashboard';
import { getSignedInUser } from "@/redux/slice/auth/auth";
import { useRouter } from 'next/navigation';



const BranchDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { patients, inactivePatients, dashboard, loading } = useSelector((state: RootState) => ({
    patients: Array.isArray(state.branchPartnerPatient.allBranchPatient)
      ? state.branchPartnerPatient.allBranchPatient
      : [],
    inactivePatients: Array.isArray(state.branchPartnerPatient.allBranchInactivePatient)
      ? state.branchPartnerPatient.allBranchInactivePatient
      : [],
    dashboard: state.pertnerDashboard.dashboard, 
    loading: state.loading.isLoading,
  }));
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();


  useEffect(() => {
    // Only run on first mount
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);

        const role = currentUser?.role;
        const allowedRoles = ["patient", "doctor", "sub_admin", "partner"] as const;

        if (role && allowedRoles.includes(role)) {
          dispatch(getSignedInUser(role as "patient" | "doctor" | "sub_admin" | "partner"));
        }
      }
    }
  }, [dispatch]); 


  // Redirect to settings if no contact person
  useEffect(() => {
    if (user && user?.has_contact_person === false) {
      router.push('/branch/settings');
    }
  }, [user, router]);
  

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getAllBranchRiskPatient()).unwrap();
      } catch (error: any) {
        toast.error(error?.message || 'Failed to fetch patients');
      } finally {
        dispatch(stopLoading());
      }
    };

    // fetch dashboard card
    const fetchDashboardCards = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getPartnerDashboard()).unwrap();
      } catch (error: any) {
        toast.error(error?.message || 'Failed to fetch patients');
      } finally {
        dispatch(stopLoading());
      }
    }

    // fetch inactive patient
    const fetchInactivePatients = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getAllBranchInactivePatient()).unwrap();
      } catch (error: any) {
        toast.error(error?.message || 'Failed to fetch inactive patients');
      } finally {
        dispatch(stopLoading());
      }
    }

    fetchPatients();
    fetchDashboardCards();
    fetchInactivePatients();
  }, [dispatch]);

  const getFormattedDate = () =>
    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const formatPatientList = (patientsArray: any[]) =>
    patientsArray.map((patient) => ({
      id: patient.uuid || patient.id,
      name: patient.name || 'Unknown',
      img: (
        <span className="text-sm font-bold">
          {patient.name?.charAt(0).toUpperCase() || '?'}
        </span>
      ),
      rm_tracking: Object.entries(patient.rm_tracking || {})
        .filter(([_, value]) => value === 'yes')
        .map(([key]) => ({ track: key.replace(/_/g, ' ') })),
    }));

  const formattedPatients = formatPatientList(patients);
  const formattedInactivePatients = formatPatientList(inactivePatients);



  const cards = [
    { title: 'Total Patients', figure: dashboard?.totalPatients || 0, icon: <img src="/userfour.png" alt="mymedicare" /> },
    { title: 'Remote Monitoring Patients', figure: dashboard?.totalPatientsRM || 0, icon: <img src="/userfour.png" alt="mymedicare" /> },
    { title: 'Blood Pressure Readings', figure: dashboard?.totalBloodPressureReadings || 0, icon: <img src="/bloodPressure.png" alt="mymedicare" /> },
    { title: 'Blood Sugar Readings', figure: dashboard?.totalBloodSugarReadings || 0, icon: <img src="/sugar.png" alt="mymedicare" /> },
    { title: 'Weight Readings', figure: dashboard?.totalWeightReadings || 0, icon: <img src="/weight.png" alt="mymedicare" /> },
    { title: 'Total Vital Readings', figure: dashboard?.totalVitalReadings || 0, icon: <img src="/userfour.png" alt="mymedicare" /> },
  ];

  return (
    <div className="w-full h-full overflow-auto">
      {/* Header */}
      <div className="lg:py-[12px] lg:px-[24px] sm:p-3 border-[1.5px] border-[#CBD5E1] rounded-lg flex lg:flex-row sm:flex-col gap-y-5 items-center justify-between">
        <div>
          <h2 className="text-[#1E293B] font-[500] text-[20px] capitalize">latest report</h2>
          <h2 className="text-[#1E293B] font-[400] text-[14px] flex items-center gap-x-1">
            <span>today</span>
            <span>.</span>
            <span>{getFormattedDate()}</span>
          </h2>
        </div>
        <div className="flex items-center gap-x-3">
          <SwitchButton />
          <h2 className="text-[#1E293B] font-[500] text-[16px] capitalize">timeframe</h2>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:gap-[16px] sm:gap-y-10 my-10">
        {cards.map((item, id) => (
          <div key={id} className="h-[172px]">
            <Card className="rounded-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-[#647488] capitalize text-[12px] font-[500]">{item.title}</h2>
                <h2 className="text-[#1E293B]">{item.icon}</h2>
              </div>
              <div className="flex flex-col mt-2">
                <h2 className="text-[#1E293B] font-[600] text-[20px] capitalize">{item.figure}</h2>
                <p className="text-[10px] font-[400] text-[#647488]">vs last month</p>
              </div>
              <div className="mt-2 w-full">
                <button className="bg-[#0058E6] w-full rounded-xl text-center md:px-[24px] md:py-[8px] sm:p-3 cursor-pointer first-letter:capitalize">
                  view patients
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>


      {/* Remote Monitoring Summary */}
      <div className="lg:py-[12px] lg:px-[24px] sm:p-3 border-[1.5px] border-[#CBD5E1] rounded-lg flex lg:flex-row sm:flex-col gap-y-5 items-center justify-between">
        <h2 className="text-[#1E293B] font-[500] text-[20px] capitalize">remote monitoring summary</h2>
        <div className="flex items-center gap-x-3">
          <SwitchButton />
          <h2 className="text-[#1E293B] font-[500] text-[16px] capitalize">timeframe</h2>
        </div>
      </div>

      {/* Risky Patients Table 8*/}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <DashboardTable
          header="patient at risk"
          text="patients with the most critical vital signs recently"
          data={formattedPatients}
          link="/branch/patients"
          headerColor='text-[#D42620]'
          arrow={true}
        />
        <DashboardTable
          header="inactive patients"
          text="patients with no logs in the last 5 days"
          data={formattedInactivePatients}
          link="/branch/patients"
          headerColor='text-[#F59E08]'
          arrow={false}
        />
      </div>
    </div>
  );
};

export default BranchDashboard;
