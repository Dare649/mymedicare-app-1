'use client';

import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { createPartner, getAllPartners } from '@/redux/slice/admin/partner/partner';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import { RootState } from '@/redux/store';
import Select from 'react-select';

type CreatePartnerProps = {
  close: () => void;
};

interface FormState {
  name: string;
  email: string;
  phone: string;
  country_code: string;
  type: string;
}

const CreatePartner: React.FC<CreatePartnerProps> = ({ close }) => {
  const dispatch = useDispatch<any>();
  const allPartners = useSelector((state: RootState) => state.adminPartner.allPartner);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    country_code: '',
    type: '',
  });

  // // fetch partners list
  // useEffect(() => {
  //   const fetchPartners = async () => {
  //     try {
  //       dispatch(startLoading());
  //       await dispatch(getAllPartners()).unwrap();
  //     } catch (error: any) {
  //       toast.error(error.message);
  //     } finally {
  //       dispatch(stopLoading());
  //     }
  //   };

  //   fetchPartners();
  // }, [dispatch]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string, country: any) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
      country_code: country.dialCode,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Optional: simple validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      dispatch(startLoading());
      await dispatch(createPartner(formData)).unwrap();
      toast.success('Partner created successfully!');
      close();
      dispatch(getAllPartners()).unwrap();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create partner');
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="w-full lg:p-5 sm:p-3">
      {/* Header */}
      <div className="flex flex-col items-center text-center mx-auto space-y-2 mb-6">
        <h2 className="text-2xl font-semibold text-[#1E293B]">
          Create Partner
        </h2>
        {/* <p className="text-base font-medium text-[#647488]">
          Kindly note that PINs are valid for 24 hours only.
        </p> */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-[#1E293B] mb-1 capitalize">
          Partner name
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g John Doe & Sons"
          className="rounded-lg p-3 border border-[#94A3BB] outline-none focus:border-primary-500"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-[#1E293B] mb-1 capitalize">
          Partner email
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g email@mail.com"
          className="rounded-lg p-3 border border-[#94A3BB] outline-none focus:border-primary-500"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-[#1E293B] mb-1 capitalize">
          Phone number
        </label>
        <PhoneInput
          country={'ng'}
          value={formData.phone}
          onChange={handlePhoneChange}
          inputClass="w-full"
          inputStyle={{
            width: '100%',
            height: '48px',
            borderRadius: '8px',
            border: '1px solid #94A3BB',
            paddingLeft: '48px',
          }}
          buttonStyle={{
            border: 'none',
            background: 'transparent',
            borderRadius: '8px 0 0 8px',
          }}
          containerStyle={{ width: '100%' }}
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      </div>

      <div className="flex flex-col">
        <label className="text-[16px] font-medium text-[#1E293B] mb-1 capitalize">
            Type
          </label>
        <Select
          options={[
            { value: 'hospital', label: 'Hospital' },
            { value: 'pharmacy', label: 'Pharmacy' },
            { value: 'laboratory', label: 'Laboratory' },
            { value: 'healthTech', label: 'HealthTech' },
            { value: 'hmo', label: 'HMO' },
            { value: 'insurance', label: 'Insurance' },
          ]}
          onChange={(selectedOption) =>
            setFormData((prevData) => ({
              ...prevData,
              type: selectedOption?.value || '',
            }))
          }
          className="w-full"
        />
      </div>

      <div className='w-full flex gap-x-2'>
          <button
            type="button"
            onClick={close}
            className="w-full bg-primary-2 text-primary-5 font-[500] py-3 rounded-lg transition duration-300 cursor-pointer"
          >
            Close
          </button>
          <button
            type="submit"
            className="w-full bg-primary-5 text-white font-[500] py-3 rounded-lg transition duration-300 cursor-pointer"
          >
            Create
          </button>
        </div>
    </form>
    </div>
  );
};

export default CreatePartner;
