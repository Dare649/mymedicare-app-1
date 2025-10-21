'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import { RootState, AppDispatch } from '@/redux/store';
import { signUp } from '@/redux/slice/auth/auth';
import { createBranchPartner } from '@/redux/slice/branch-partner/branch-account/branch-partner-account';
import Tab from '@/components/tabs/page';
import PatientSignup from '@/components/patient/sign-up/page';
import ProfessionalSignup from '@/components/professional/sign-up/page';
import BranchPartnerSignup from '@/components/branch-partner/sign-up/page';
import Card from '@/components/card/page';


const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const images = ['/image-32.png', '/hospital-queue.jpg', '/hero-section-image.png'];
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'branch_partner'>('patient');
  const tabLabels = ['Patient', 'Doctor', 'Branch Partner'];
  const roleKeys: Record<string, 'patient' | 'doctor' | 'branch_partner'> = {
    Patient: 'patient',
    Doctor: 'doctor',
    'Branch Partner': 'branch_partner',
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    country_code: "",
    phone: "",
    password: "",
    speciality_id: "",
    referral_code: ""
  });


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Convert tab label to form role
  const getRoleKey = (label: string): 'patient' | 'doctor' | 'branch_partner' => {
    switch (label.toLowerCase()) {
      case 'doctor':
        return 'doctor';
      case 'branch partner':
        return 'branch_partner';
      default:
        return 'patient';
    }
  };

  // const handleTabChange = (index: number) => {
  //   const roleMap = ['patient', 'doctor', 'branch_partner'] as const;
  //   setSelectedRole(roleMap[index]);
  // };


  // Handle form submission
  const handleSubmit = async (data: any) => {
    dispatch(startLoading());
    try {
      const payload = {
        ...formData,
        role: selectedRole,
      };

      let response;

      if (selectedRole === 'branch_partner') {
        const branchPayload = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          referral_code: formData.referral_code,
        };
        response = await dispatch(createBranchPartner(branchPayload)).unwrap();
        router.push(`/auth/sign-in`);
      } else {
        response = await dispatch(signUp(payload)).unwrap();
        router.push(`/auth/verify-otp?email=${formData.email}`);
      }

      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
    } finally {
      dispatch(stopLoading());
    }
  };


  const renderForm = (label: string) => {
    const role = getRoleKey(label);

    switch (role) {
      case 'doctor':
        return <ProfessionalSignup formData={formData} onChange={handleChange} />;
      case 'branch_partner':
        return <BranchPartnerSignup formData={formData} onChange={handleChange} />;
      default:
        return <PatientSignup formData={formData} onChange={handleChange} />;
    }
  };

  return (
    <section className="w-full h-screen flex">
      
      {/* Form Section */}
      <div className="sm:w-full lg:w-[40%] h-screen p-4 overflow-y-auto flex-col ">
        <div className="flex gap-3 flex-col">
          <div className="w-[60%]">
            <Image
              src={"/logo-2.png"}
              alt="MyMedicare"
              width={100}
              height={100}
              className="w-full"
              quality={100}
              priority
            />
          </div>
          <h2 className="text-xl sm:text-lg text-primary-5 text-left font-medium">Welcome, <br /> Sign up to get started.</h2>
        </div>
        <Card className='w-full p-3 mt-5'>
          <Tab
            titles={tabLabels}
            renderContent={renderForm}
            onTabChange={(_, label) => setSelectedRole(getRoleKey(label))}
          />
          <button
            className='w-full bg-primary-5 text-white py-5 rounded-md hover:bg-primary-4 transition duration-200 capitalize font-semibols'
            type='button'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            sign up
          </button>
        </Card>
        <p className='first-letter:capitalize text-secondary-5 mt-5 text-center'>don't have an account? <span className='text-primary-5 capitalize font-bold cursor-pointer' onClick={() => router.push('/auth/sign-in')}>sign in</span></p>
      </div>

      {/* Image Section */}
      <div className="sm:w-0 lg:w-[60%] h-screen relative overflow-hidden">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Slide ${index}`}
            fill
            className={`object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            quality={100}
            priority={index === currentIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Signup;
