'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from "next/image";
import { MdOutlineMail } from "react-icons/md";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '@/redux/slice/loadingSlice';
import { RootState } from '@/redux/store';
import { resetPassword } from '@/redux/slice/auth/auth';
import Card from '@/components/card/page';


interface FormState {
  email: string;
  new_password: string;
  token: string;
  new_password_confirmation: string;
}

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => (state as RootState).loading.isLoading);
  const token = params?.token as string;
  const email = decodeURIComponent(params?.email as string);
  const [formData, setFormData] = useState<FormState>({
    email: "",
    token : "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['/image-32.png', '/hospital-queue.jpg', '/hero-section-image.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

   // Populate email and token from URL after hydration
  useEffect(() => {
    // Set email and token from route
    if (token && email) {
      setFormData(prev => ({
        ...prev,
        email,
        token,
      }));
    }
  }, [token, email]);
  
  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to toggle new password visibility
  const toggleNewPasswordVisibility = () => setPasswordVisible((prev) => !prev);

  // Function to toggle new password confirmation visibility
  const toggleNewPasswordConfirmationVisibility = () => setPasswordVisible1((prev) => !prev);

  // Handle sign-in submission
  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic form validation
    if (!formData.new_password) {
      toast.error("New Password is required.");
      return;
    }

    if (!formData.new_password_confirmation) {
      toast.error("New Password Confirmation is required.");
      return;
    }

    dispatch(startLoading());

    try {
      const result = await dispatch(resetPassword(formData) as any).unwrap();

      if (result) {
        toast.success(result.message);
        router.push("/auth/sign-in");
      }
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Failed to reset password, try again.");
      }
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <section className="w-full h-screen flex">
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

      {/* Form Section */}
      <div className="sm:w-full lg:w-[40%] h-screen flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center justify-center p-3">
          <div className="flex gap-3 flex-col w-full">
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
            <h2 className="text-xl sm:text-lg text-primary-5 text-left font-medium">Welcome, <br /> Set your password.</h2>
        </div>
          <Card className='w-full p-5 mt-5'>
            <form
            className="w-full"
            onSubmit={handleResetPassword}
            >
                {/* <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full outline-none bg-transparent text-tertiary-1"
                />
                <MdOutlineMail size={25} className="text-tertiary-1 font-bold"/>
                </div> */}
                <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
                    <input
                        type={passwordVisible ? 'text' : 'new_password'}
                        placeholder="Enter your new password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleChange}
                        className="w-full outline-none bg-transparent text-tertiary-1"
                    />
                    <div
                        onClick={toggleNewPasswordVisibility}
                        className='cursor-pointer'
                    >
                        {passwordVisible ? (
                        <GoEye size={25} className="text-tertiary-1 font-bold"/>
                        ) : (
                        <GoEyeClosed size={25} className="text-tertiary-1 font-bold"/>
                        )}
                    </div>
                </div>
                <div className="w-full flex items-center gap-x-2 border-b-2 border-tertiary-1 focus-within:border-primary-5 lg:p-2 sm:p-1 mb-5">
                    <input
                        type={passwordVisible ? 'text' : 'new_password_confirmation'}
                        placeholder="Enter your new password confirmation"
                        name="new_password_confirmation"
                        value={formData.new_password_confirmation}
                        onChange={handleChange}
                        className="w-full outline-none bg-transparent text-tertiary-1"
                    />
                    <div
                        onClick={toggleNewPasswordConfirmationVisibility}
                        className='cursor-pointer'
                    >
                        {passwordVisible1 ? (
                        <GoEye size={25} className="text-tertiary-1 font-bold"/>
                        ) : (
                        <GoEyeClosed size={25} className="text-tertiary-1 font-bold"/>
                        )}
                    </div>
                </div>
                <button
                type='submit'
                className='w-full bg-primary-5 text-white font-bold capitalize text-center hover:border-2 rounded-lg hover:bg-transparent hover:text-primary-5 hover:border-primary-5 py-5 cursor-pointer'
                disabled={isLoading}
                >
                {isLoading ? 'Loading...' : 'Reset Password'}
                </button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
