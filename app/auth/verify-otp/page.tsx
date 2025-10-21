'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import { toast } from 'react-toastify';
import { IoKeyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import { RootState } from '@/redux/store';
import { verifyOtp, resendOtp } from '@/redux/slice/auth/auth';

interface FormState {
  email: string;
  token: string;
}

const VeriyOtp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [formData, setFormData] = useState<FormState>({
    email,
    token: '',
  });

  // OTP input refs for auto focus
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];


  // Handle token input changes
  const handleOtpChange = (index: number, value: string) => {
  if (!/^[0-9]?$/.test(value)) return; // Only allow single digit
  let otpArr = formData.token.split('');
  otpArr[index] = value;
  const token = otpArr.join('').padEnd(4, '');
  setFormData((prev) => ({ ...prev, token }));

  // Move focus to next input if value entered
  if (value && index < 3) {
    otpRefs[index + 1].current?.focus();
  }
  // Move focus to previous input if value cleared
  if (!value && index > 0) {
    otpRefs[index - 1].current?.focus();
  }
};

// handle paste token
const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  const pasted = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, 4);
  if (pasted.length === 4) {
    setFormData((prev) => ({ ...prev, token: pasted }));
    // Set values in inputs
    setTimeout(() => {
      otpRefs.forEach((ref, idx) => {
        if (ref.current) ref.current.value = pasted[idx] || '';
      });
      otpRefs[3].current?.focus();
    }, 0);
  }
  e.preventDefault();
};

  // Handle OTP verification
  const handleVerifyOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(startLoading());

    try {
      const result = await dispatch(verifyOtp(formData) as any).unwrap();

      if (result) {
        toast.success(result.message);
        router.push("/auth/sign-in");
      }
    } catch (error: any) {
      toast.success(error.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  // Handle resend OTP (only sending the email)
  const handleResendOtp = async (event: React.FormEvent | React.MouseEvent) => {
    event.preventDefault();
    dispatch(startLoading());

    try {
      const result = await dispatch(resendOtp({ email: formData.email }) as any).unwrap();

      if (result) {
        toast.success("Resent OTP successfully!");
      }
    } catch (error) {
      toast.error("Failed to resend OTP, try again!");
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <section className="w-full h-screen flex">
      {/* Form Section */}
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center justify-center p-3">
          <div className="w-[60%] flex justify-center">
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
          <div className="w-full lg:mt-10 sm:mt-5">
            <h2 className="text-xl sm:text-2xl text-center font-semibold">
              An OTP has been sent to <span className="text-primary-5">{formData.email}</span>
            </h2>
          </div>
          <form className="w-full mt-5" onSubmit={handleVerifyOtp}>
            <div className="w-full flex justify-center gap-3 mb-5">
              {[0, 1, 2, 3].map((idx) => (
                <input
       
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={formData.token[idx] || ''}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  onPaste={handleOtpPaste}
                  className="w-14 h-14 text-center text-2xl border-2 border-secondary-6 rounded-lg outline-none focus:border-primary-5 bg-transparent"
                  name={`otp-${idx}`}
                  autoFocus={idx === 0}

                />
              ))}
              
            </div>

            <button
              type="submit"
              className="w-full bg-primary-5 text-white font-bold capitalize text-center hover:border-2 rounded-lg hover:bg-transparent hover:text-primary-5 hover:border-primary-5 py-5 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Verify OTP"}
            </button>
          </form>
          <div className="flex justify-center mt-5">
            <p className="text-secondary-6 font-bold first-letter:capitalize">
              <span>Didn't receive OTP?{" "}</span>
              <span  
                onClick={handleResendOtp}
                className="text-primary-5 font-bold cursor-pointer"
                tabIndex={0}
                role="button"
              >
                Resend OTP
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeriyOtp;