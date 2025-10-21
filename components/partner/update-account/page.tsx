'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { updateHqPartner, getHqPartner } from '@/redux/slice/hq-partner/hq-account/hq-partner-account';
import {
  CountryDropdown,
  RegionDropdown,
} from 'react-country-region-selector';


interface FormState {
    name: string;
    website: string;
    state: string;
    city: string;
    country: string;
    street_address: string;
    cp_first_name: string;
    cp_last_name: string;
    cp_email: string;
    cp_phone : string;
    cp_country_code: string;
    cp_position: string;
}

const fields = [
  { label: 'name', name: 'name', placeholder: 'e.g John' },
  { label: 'website', name: 'website', placeholder: 'e.g www.example.com' },
  { label: 'street address', name: 'street_address', placeholder: '69 Longworth street' },
  { label: 'contact person first name', name: 'cp_first_name', placeholder: 'Poppin' },
  { label: 'contact person last name', name: 'cp_last_name', placeholder: 'Terry' },
  { label: 'contact person email', name: 'cp_email', placeholder: 'wer@g.com' },
  { label: 'contact person position', name: 'cp_position', placeholder: 'Chief Pharmacist' },
  { label: 'city', name: 'city', placeholder: 'Bolton' },
];


interface FormState {
    name: string;
    website: string;
    state: string;
    city: string;
    country: string;
    street_address: string;
    cp_first_name: string;
    cp_last_name: string;
    cp_email: string;
    cp_phone : string;
    cp_country_code: string;
    cp_position: string;
}


const initialState: FormState = {
  name: '',
  website: '',
  state: '',
  city: '',
  country: '',
  street_address: '',
  cp_first_name: '',
  cp_last_name: '',
  cp_email: '',
  cp_phone: '',
  cp_country_code: '+234',
  cp_position: '',
};

const UpdatePartnerAccount = () => {
  const dispatch = useDispatch<any>();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const partner = useSelector((state: RootState) => state.hqPartner.hqPartner);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormState>(initialState);
  const router = useRouter();


  useEffect(() => {
    dispatch(getHqPartner());
  }, [dispatch]);

  useEffect(() => {
    if (partner) {
      const cp = partner.contact_person || {};
      const address = partner.address || {};
      const code = cp.country_code || '';
      const phoneOnly = cp.phone?.startsWith(code) ? cp.phone.slice(code.length) : cp.phone;

      setFormData({
        name: partner.name || '',
        website: partner.website || '',
        street_address: address.street_address || '',
        city: address.city || '',
        state: address.state || '',
        country: address.country || '',
        cp_first_name: cp.first_name || '',
        cp_last_name: cp.last_name || '',
        cp_email: cp.email || '',
        cp_phone: phoneOnly || '',
        cp_country_code: code.startsWith('+') ? code : `+${code}`,
        cp_position: cp.position || '',
      });
    }
  }, [partner]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleCountryChange = (val: string) => {
    setFormData(prev => ({ ...prev, country: val, state: '' }));
  };


  const handleStateChange = (val: string) => {
    setFormData(prev => ({ ...prev, state: val }));
  };

 
  const handlePhoneChange = (value: string, data: any) => {
    const dial = data.dialCode || '';
    const digits = value.replace(/[^0-9]/g, '');
    const trimmed = digits.startsWith(dial) ? digits.slice(dial.length) : digits;

    setFormData(prev => ({
      ...prev,
      cp_country_code: `+${dial}`,
      cp_phone: trimmed,
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(startLoading());
    try {
      await dispatch(updateHqPartner(formData));
      toast.success('Partner account updated successfully');
      dispatch(getHqPartner());
      router.push("/partner/dashboard");
    } catch (error: any) {
      toast.error('Failed to update account');
    } finally {
      dispatch(stopLoading());
    }
  };
  return (
    <div className="w-full lg:px-10 lg:py-5 sm:p-5">
      <form
        className='w-full'
        onSubmit={handleSubmit}
      >
        <div className="w-full grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
            {fields.map(field => {
                if (field.name === 'country') {
                    return (
                        <div key={field.name}>
                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                        <CountryDropdown
                            value={formData.country}
                            onChange={handleCountryChange}
                            className="w-full p-2 border rounded outline-none"
                        />
                        </div>
                    );
                }

                if (field.name === 'state') {
                    return (
                        <div key={field.name}>
                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                        <RegionDropdown
                            country={formData.country}
                            value={formData.state}
                            onChange={handleStateChange}
                            className="w-full p-2 border rounded outline-none"
                        />
                        </div>
                    );
                }

                return (
                <div key={field.name}>
                    <label className="block text-sm font-medium mb-1 capitalize text-primary-5">{field.label}</label>
                    <input
                        type="text"
                        name={field.name}
                        value={formData[field.name as keyof FormState] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full p-2 rounded outline-none border border-[#94A3BB] capitalize ${['website', 'cp_email'].includes(field.name) ? 'lowercase' : 'capitalize'}`}
                    />
                </div>
                );
            })}
            <div>
                <h2 className="block text-sm font-medium mb-1 capitalize text-primary-5">
                    country
                </h2>
                 <CountryDropdown
                    value={formData.country}
                    onChange={(val) => setFormData({ ...formData, country: val, state: '', city: '' })}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <h2 className="block text-sm font-medium mb-1 capitalize text-primary-5">
                    state
                </h2>
                 <RegionDropdown
                    country={formData.country}
                    value={formData.state}
                    onChange={(val) => setFormData({ ...formData, state: val })}
                    className="w-full p-2 border rounded"
                />
            </div>
            {/* Phone Input */}
            <div className="flex flex-col w-full">
                <h2 className="block text-sm font-medium mb-1 capitalize text-primary-5">
                contact person phone number
                </h2>
                <div className="border border-[#94A3BB] rounded p-0.5">
                    <style>
                    {`
                        .search-box {
                        color: #6B7280 !important;
                        background: transparent !important;
                        }
                        .country-list .country-name {
                        color: #6B7280 !important;
                        font-weight: 500;
                        margin-left: 8px;
                        }
                    `}
                    </style>
                    <PhoneInput
                        country={'ng'}
                        value={formData.cp_phone}
                        onChange={handlePhoneChange}
                        inputStyle={{
                            border: 'none',
                            boxShadow: 'none',
                            width: '100%',
                            background: 'transparent',
                            color: '#6B7280',
                        }}
                        buttonStyle={{
                            border: 'none',
                            background: 'transparent',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                            minWidth: '70px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        containerStyle={{
                            border: 'none',
                            width: '100%',
                        }}
                        dropdownStyle={{
                            width: 'auto',
                        }}
                        enableSearch
                        inputClass="focus:outline-none"
                    />
                </div>
            </div>
        </div>
        <div className='flex justify-center my-5'>
            <button
                type='submit'
                className='text-white bg-primary-5 rounded px-8 py-3 cursor-pointer hover:bg-transparent hover:border-[1px] hover:border-primary-5 hover:text-primary-5 capitalize transition'
            >
                update account
            </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePartnerAccount;
