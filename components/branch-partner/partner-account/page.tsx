'use client';

import { useEffect } from 'react';
import { IoCopyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import { getBranchPartner } from '@/redux/slice/branch-partner/branch-account/branch-partner-account';

// 🔍 Helper to safely get nested values using "address.city" etc.
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};


const fields = [
  { label: 'Name', path: 'name' },
  { label: 'Website', path: 'website' },
  { label: 'Phone', path: 'phone' },
  { label: 'Email', path: 'email' },
  { label: 'Type', path: 'type' },
  { label: 'Status', path: 'status' },
  { label: 'Role', path: 'role' },
  { label: 'Balance', path: 'balance' },
  { label: 'Street Address', path: 'address.street_address' },
  { label: 'Referral Code', path: 'referral_code', isCopyable: true },
  { label: 'City', path: 'address.city' },
  { label: 'State', path: 'address.state' },
  { label: 'Country', path: 'address.country' },
  { label: 'Contact First Name', path: 'contact_person.first_name' },
  { label: 'Contact Last Name', path: 'contact_person.last_name' },
  { label: 'Contact Email', path: 'contact_person.email' },
  { label: 'Contact Phone', path: 'contact_person.phone' },
  { label: 'Contact Position', path: 'contact_person.position' },
  { label: 'Created At', path: 'created_at' },
];


const PartnersAccount = () => {
  const dispatch = useDispatch<any>();
  const branchPartnerData = useSelector((state: RootState) => state.branchPartner.branchPartner);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        dispatch(startLoading());
        await dispatch(getBranchPartner()).unwrap();
      } catch (error: any) {
        toast.error(error?.message || 'Failed to fetch partner data');
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchPartner();
  }, [dispatch]);


  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Referral code copied to clipboard!');
  };

  return (
    <div className="w-full lg:px-10 lg:py-5 sm:p-5">
        <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
            {fields.map((field) => {
            const value = getNestedValue(branchPartnerData, field.path);
            return (
              <div key={field.path} className="mb-4">
                <h2 className="block text-sm font-medium mb-1 capitalize text-primary-5">
                    {field.label}
                </h2>
                <h2
                  className={`text-tertiary-1 text-lg font-bold ${
                  ['website', 'cp_email', 'email'].includes(field.path)
                      ? 'lowercase'
                      : 'capitalize'
                  } ${field.path === 'status' && value === 'verified'
                      ? 'text-green-600'
                      : ''
                  }`}
                >
                  {value || 'N/A'}

                  {field.isCopyable && value && (
                    <button
                    onClick={() => handleCopy(value)}
                    className="ml-2 inline-flex items-center"
                    title="Copy to clipboard"
                    >
                      <IoCopyOutline size={18} className="text-gray-500 hover:text-primary-500" />
                    </button>
                  )}
                </h2>
              </div>
            );
            })}
        </div>
    </div>

  );
};

export default PartnersAccount;
