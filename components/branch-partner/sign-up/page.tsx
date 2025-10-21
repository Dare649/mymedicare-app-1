'use client';
import React, { useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { CiUser } from "react-icons/ci";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FiPhoneCall } from "react-icons/fi";

interface BranchPartnerSignupProps {
  formData: {
    email: string;
    password: string;
    name: string;
    referral_code: string;
  };
  onChange: (field: string, value: string) => void;
}

const BranchPartnerSignup: React.FC<BranchPartnerSignupProps> = ({ formData, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // For password clear button
  const [localPassword, setLocalPassword] = useState(formData.password || '');

  const validateField = (field: string, value: string) => {
    if (field === 'name') {
      if (!value.trim()) return 'Branch name is required';
    }
    if (field === 'referral_code') {
      if (!value.trim()) return 'Hq code is required';
    }
    if (field === 'email') {
      if (!value.trim()) return 'Branch email is required';
      // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
    }
    if (field === 'phone') {
      if (!value.trim()) return 'Phone number is required';
      // if (!/^[0-9]{7,15}$/.test(value)) return 'Invalid phone number';
    }
    if (field === 'password') {
      if (!value.trim()) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
    }
    return '';
  };

  const password = formData.password || '';

  const passwordRules = [
    {
      label: 'At least 8 characters',
      isValid: password.length >= 8,
    },
    {
      label: 'A maximum of 15 characters',
      isValid: password.length > 0 && password.length <= 15,
    },
    {
      label: 'At least one uppercase letter',
      isValid: /[A-Z]/.test(password),
    },
    {
      label: 'At least one number',
      isValid: /\d/.test(password),
    },
    {
      label: 'At least one special character (@, $, !, %, *, ?, &)',
      isValid: /[@$!%*?&]/.test(password),
    },
  ];

  const isPasswordValid = passwordRules.every(rule => rule.isValid);
  const isPasswordMaxed = password.length === 15;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    onChange(field, value);
    if (field === 'password') setLocalPassword(value);
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  // For clear button in password field
  const handleClearPassword = () => {
    setLocalPassword('');
    onChange('password', '');
    setTouched((prev) => ({ ...prev, password: true }));
    setErrors((prev) => ({ ...prev, password: validateField('password', '') }));
  };

  return (
    <div className='w-full flex flex-col p-5'>
      {/* Full Name */}
      <div className="flex flex-col w-full mb-4">
        <div className="flex items-center gap-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 p-2">
          <CiUser size={20} className="text-gray-400" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="Enter branch name"
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
        </div>
        {touched.name && errors.name && (
          <span className="text-red-500 text-xs mt-1">{errors.name}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col w-full mb-4">
        <div className="flex items-center gap-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 p-2">
          <MdOutlineEmail size={20} className="text-gray-400" />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="Enter branch email address"
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
        </div>
        {touched.email && errors.email && (
          <span className="text-red-500 text-xs mt-1">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col w-full mb-4">
        <div className="flex items-center gap-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 p-2">
          <CiUser size={20} className="text-gray-400" />
          <input
            type="text"
            name="referral_code"
            value={formData.referral_code}
            onChange={(e) => handleChange('referral_code', e.target.value)}
            onBlur={() => handleBlur('referral_code')}
            placeholder="Enter hq code"
            className="w-full outline-none bg-transparent text-tertiary-1"
          />
        </div>
        {touched.referral_code && errors.referral_code && (
          <span className="text-red-500 text-xs mt-1">{errors.referral_code}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col w-full mb-4">
        <div className="relative flex items-center gap-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 p-2">
          <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-gray-400">
            {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            placeholder="Enter password"
            className="w-full outline-none bg-transparent text-tertiary-1"
            maxLength={15}
          />
          {/* Show clear button when max length is reached */}
          {isPasswordMaxed && (
            <button
              type="button"
              onClick={handleClearPassword}
              className="absolute right-10 top-2 text-sm text-red-500 underline"
            >
              Clear
            </button>
          )}
        </div>
        {touched.password && errors.password && (
          <span className="text-red-500 text-xs mt-1">{errors.password}</span>
        )}
      </div>

      {/* Password Rules */}
      <div className="space-y-1">
        {passwordRules.map((rule, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            {rule.isValid ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaRegCircle className="text-gray-400" />
            )}
            <span>{rule.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchPartnerSignup;