'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/card/page';
import { adminDashboardAnalytics } from '@/data/dummy';
import { adminDashboardSummary } from '@/data/dummy';
import SwitchButton from '@/components/switch-button/page';
import DashboardTable from '@/components/dashboard-table/page';
import { getAllAdminInactivePatient, getAllAdminRiskPatient } from '@/redux/slice/admin/patient/patient';
import { RootState, AppDispatch } from '@/redux/store';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import { toast } from 'react-toastify';


const AdminDashboard = () => {
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


  function getFormattedDate(): string {
    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  }


  useEffect(() => {
      const fetchPatients = async () => {
        try {
          dispatch(startLoading());
          await dispatch(getAllAdminRiskPatient()).unwrap();
        } catch (error: any) {
          toast.error(error?.message || 'Failed to fetch patients');
        } finally {
          dispatch(stopLoading());
        }
      };
  
      // // fetch dashboard card
      // const fetchDashboardCards = async () => {
      //   try {
      //     dispatch(startLoading());
      //     await dispatch(getPartnerDashboard()).unwrap();
      //   } catch (error: any) {
      //     toast.error(error?.message || 'Failed to fetch patients');
      //   } finally {
      //     dispatch(stopLoading());
      //   }
      // }
  
      // fetch inactive patient
      const fetchInactivePatients = async () => {
        try {
          dispatch(startLoading());
          await dispatch(getAllAdminInactivePatient()).unwrap();
        } catch (error: any) {
          toast.error(error?.message || 'Failed to fetch inactive patients');
        } finally {
          dispatch(stopLoading());
        }
      }
  
      fetchPatients();
      //fetchDashboardCards();
      fetchInactivePatients();
    }, [dispatch]);
  
    // const getFormattedDate = () =>
    //   new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
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

  return (
    <div className='w-full h-full overflow-auto'>
       <div className='lg:py-[12px] lg:px-[24px] sm:p-3 border-[1.5px] border-[#CBD5E1] rounded-lg flex lg:flex-row sm:flex-col gap-y-5 items-center justify-between'>
        <div>
          <h2 className='text-[#1E293B] capitalize font-[500] text-[20px]'>latest report</h2>
          <h2 className='text-[#1E293B] capitalize font-[400] text-[14px] flex items-center gap-x-1'><span>today</span><span>.</span><span>{getFormattedDate()}</span></h2>
        </div>
        <div className='flex items-center gap-x-3'>
          <SwitchButton/>
          <h2 className='text-[#1E293B] font-[500] text-[16px] capitalize'>timeframe</h2>
        </div>
       </div>

       <div className='w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 lg:gap-[16px] sm:gap-y-10 my-10'>
        {
          adminDashboardAnalytics.map((item, id) => (
            <div 
              key={id}
              className='h-[172px]'
            >
              <Card className=' rounded-lg'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-[#647488] capitalize text-[12px] font-[500]'>{item.title}</h2>
                  <h2 className='text-[#1E293B]'>{item.icon}</h2>
                </div>
                <div className='flex flex-col mt-2'>
                  <h2 className='text-[#1E293B] font-[600] text-[20px] capitalize'>{item.figure}</h2>
                  <p className="text-[10px] font-[400] text-[#647488]">
                    <span
                      className={
                        item.rate === "+150%" || item.rate === "+80%"
                          ? "text-[#CA1005]"
                          : item.rate === "+20%"
                          ? "text-[#F59E08]"
                          : ""
                      }
                    >
                      {item.rate}
                    </span>{" "}
                    vs last month
                  </p>
                </div>
                <div className='mt-2'>
                  <button className='bg-[#0058E6] rounded-xl text-center md:px-[24px] md:py-[8px] sm:p-3 cursor-pointer first-letter:capitalize'>view issues</button>
                </div>
              </Card>
            </div>
          ))
        }
       </div>

        <div className='lg:py-[12px] lg:px-[24px] sm:p-3 border-[1.5px] border-[#CBD5E1] rounded-lg flex lg:flex-row sm:flex-col gap-y-5 items-center justify-between'>
          <h2 className='text-[#1E293B] capitalize font-[500] text-[20px]'>summary</h2>
          <div className='flex items-center gap-x-3'>
            <SwitchButton/>
            <h2 className='text-[#1E293B] font-[500] text-[16px] capitalize'>timeframe</h2>
          </div>
        </div>
        <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 lg:gap-[16px] sm:gap-y-10 my-10">
          {adminDashboardSummary.map((item, id) => (
            <div key={id} className="h-[168px]">
              <Card className="h-full rounded-lg flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-[#647488] capitalize text-[12px] font-[500]">{item.title}</h2>
                  <h2 className="text-[#1E293B] text-[23.33px]">{item.icon}</h2>
                </div>
                <div className="flex flex-col mt-2">
                  <h2 className="text-[#1E293B] font-[600] text-[20px] capitalize">{item.figure}</h2>
                  <p className="text-[10px] font-[400] text-[#647488] mt-1">
                    <span
                      className={
                        item.rate === "+150%" || item.rate === "+80%"
                          ? "text-[#CA1005]"
                          : item.rate === "+20%"
                          ? "text-[#F59E08]"
                          : ""
                      }
                    >
                      {item.rate}
                    </span>{" "}
                    vs last month
                  </p>
                </div>
                <div className='mt-2'>
                  <button className='bg-[#0058E6] rounded-xl text-center md:px-[24px] md:py-[8px] sm:p-3 cursor-pointer first-letter:capitalize'>view all</button>
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
  )
}

export default AdminDashboard
