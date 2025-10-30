


'use client';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { createBranchPatient, createBranchPatientBulk } from '@/redux/slice/branch-partner/branch-patient/branch-patient';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type CreatePatientProps = {
  close: () => void;
  refresh: () => void;
};

interface FormState {
  name: string;
  email: string;
  phone: string;
  country_code: string;
}

const CreatePatient: React.FC<CreatePatientProps> = ({ close, refresh }) => {
  const dispatch = useDispatch<any>();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [mode, setMode] = useState<'bulk' | 'single' | null>(null); 
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    country_code: '',
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUploadComplete, setFileUploadComplete] = useState(false);

  const handleModeChange = (selectedMode: 'bulk' | 'single') => {
    setMode(selectedMode);
    setFormData({ 
      name: '',
      email: '', 
      phone: '', 
      country_code: '' 
    });
    setFile(null);
    setErrors({});
    setFirstName('');
    setLastName('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string, country: any) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
      country_code: country.dialCode,
    }));
  };


  const handleFileSelectAndUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = e.target.files?.[0];
  if (!selectedFile) return;

  if (!selectedFile.name.endsWith('.xlsx')) {
    return toast.error('Please upload a valid Excel (.xlsx) file');
  }

  setFileUploading(true);
  setFileUploadComplete(false);

  // Store file (if you have both `file` and `uploadedFile` state, update both)
  setFile(selectedFile);

  // Simulate file upload (you can replace this with actual upload logic)
  setTimeout(() => {
    setUploadedFile(selectedFile); // optional if you use another state
    setFileUploading(false);
    setFileUploadComplete(true);
  }, 1000);
};

  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      console.log('Files dropped:', files);
      // handle files here
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'firstName') {
      setFirstName(value);
      setFormData(prev => ({ ...prev, name: `${value} ${lastName}`.trim() }));
    } else if (name === 'lastName') {
      setLastName(value);
      setFormData(prev => ({ ...prev, name: `${firstName} ${value}`.trim() }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!mode) {
      return toast.error('Please select a mode');
    }

    dispatch(startLoading());

    if (mode === 'single') {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const payload = {
        ...formData,
        name: fullName,
      };

      try {
        await dispatch(createBranchPatient(payload)).unwrap();
        toast.success('Patient created successfully!');
        close();
        refresh(); 
      } catch (error) {
        toast.error('Failed to create patient');
      } finally {
        dispatch(stopLoading());
      }
    }

    if (mode === 'bulk') {
      if (!file) {
        dispatch(stopLoading());
        return toast.error('Please upload a file');
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        await dispatch(createBranchPatientBulk(formData)).unwrap();
        toast.success('Bulk patients uploaded successfully!');
        close();
      } catch (error) {
        toast.error('Bulk upload failed');
      } finally {
        dispatch(stopLoading());
      }
    }
  };


  return (
    <div className="p-4">
      {/* Mode Selection */}
      <h3 className='text-[#1E293B] font-[500] text-[16px]'>Choose mode of adding patients</h3>
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="single"
            checked={mode === 'single'}
            onChange={() => handleModeChange('single')}
            className="form-radio text-blue-500"
          />
          <span className={mode === 'single' ? 'text-blue-600 font-medium' : ''}>Single</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="bulk"
            checked={mode === 'bulk'}
            onChange={() => handleModeChange('bulk')}
            className="form-radio text-blue-500"
          />
          <span className={mode === 'bulk' ? 'text-blue-600 font-medium' : ''}>Bulk</span>
        </label>
      </div>
  
      <div className={`space-y-2 mt-10 ${mode !== 'bulk' ? 'opacity-50 bg-gray-100 pointer-events-none p-3' : ''}`}>
          <div className='p-3'>
            <h2 className='text-[#1E293B] font-[500] text-[20px]'>Bulk upload</h2>
            <div
                className={`w-full h-[128px] border-[1px] rounded-sm border-dashed ${
                    dragActive ? 'bg-blue-100' : 'bg-[#EBF3FF]'
                } flex items-center justify-center relative`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                <div className="text-center text-sm">
                  <h3>
                    Drop your files here or{' '}
                    <span
                      className="underline text-blue-700 cursor-pointer"
                      onClick={() => inputRef.current?.click()}
                    >
                      choose file
                    </span>
                  </h3>

                  {fileUploading && (
                    <p className="mt-2 text-gray-500 text-xs italic">Uploading file...</p>
                  )}

                  {fileUploadComplete && uploadedFile && (
                    <p className="mt-2 text-green-600 text-xs">
                      ✅ Uploaded: <span className="font-medium">{uploadedFile.name}</span>
                    </p>
                  )}
                </div>
                {/* Hidden file input */}
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileSelectAndUpload}
                />
            </div>
            <p className='text-[12px] font-[400] leading-relaxed tracking-wide'>Upload a CSV or Excel file with the following columns: Name, Email, Phone, Country Code</p>
          </div>
      </div>

      <div className={`mt-5 ${mode !== 'single' ? 'opacity-50 bg-gray-100 pointer-events-none p-3' : ''}`}>
          <div className='mt-5'>
            <h2 className='text-[#1E293B] font-[500] text-[20px]'>Single upload</h2>
            <div className='my-3'>
                <form 
                  className=''
                >
                    <div className='w-full flex items-center gap-x-3 mb-3'>
                      <div className=''>
                        <h2 className='text-[#1E293B] text-[16px] capitalize font-[500]'>first name</h2>
                        <input 
                          type="text" 
                          name='firstName'
                          value={firstName}
                          onChange={handleChange}
                          placeholder='e.g John'
                          className='w-full p-2 rounded outline-none border-[1px] border-[#94A3BB]'
                        />
                      </div>
                      <div className=''>
                        <h2 className='text-[#1E293B] text-[16px] capitalize font-[500]'>last name</h2>
                        <input 
                            type="text" 
                            name='lastName'
                            value={lastName}
                            onChange={handleChange}
                            placeholder='e.g Doe'
                            className='w-full p-2 rounded outline-none border-[1px] border-[#94A3BB]'
                        />
                      </div>
                    </div>
                    <div className='mb-3'>
                        <h2 className='text-[#1E293B] text-[16px] capitalize font-[500]'>email address</h2>
                        <input 
                            type="text" 
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='e.g Doe'
                            className='w-full p-2 rounded outline-none border-[1px] border-[#94A3BB]'
                        />
                    </div>
                    <div className='mb-3'>
                      <h2 className='text-[#1E293B] text-[16px] capitalize font-[500]'>phone number</h2>
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
                    </div>
                </form>
            </div>
          </div>
        </div>

      {/* Submit Button */}
      {mode && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-[50%] bg-blue-600 text-white py-3 rounded-lg capitalize disabled:opacity-50"
          >
            {isLoading ? 'onboarding...' : 'onboard'}
          </button>
        </div>

      )}
    </div>
  );
};

export default CreatePatient;

