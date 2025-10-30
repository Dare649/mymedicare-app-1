'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoMenuSharp, IoLogOutOutline } from "react-icons/io5";
import { adminNav, partnerNav, patientNav, professionalNav } from "@/data/dummy";
import Link from "next/link";
import Modal from "../modal/page";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { getSignedInUser } from "@/redux/slice/auth/auth";

const Topbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const user = useSelector((state: RootState) => state.auth.user);



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
  }, [dispatch]); // Remove `user` from deps




  // function for sign out
  const handleSignout = (event: React.FormEvent) => {
    event.preventDefault();
  
    dispatch(startLoading());
  
    try {
      // Remove token from localStorage & sessionStorage
      localStorage.removeItem("token");
      sessionStorage.removeItem("token"); // In case it's stored here
  
      // Redirect user to homepage
      router.push("/");
      
      toast.success("Sign out success!");
    } catch (error) {
      toast.error("Sign out failed. Please try again.");
    } finally {
      dispatch(stopLoading());
    }
  };
  

  // function to toggle menu
  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* desktop view */}
      <div className="hidden lg:flex">
        <div className='w-[80%] border-b-2 border-secondary-4 p-5 fixed top-0 z-30 bg-white overflow-hidden'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h2 className="first-letter:capitalize font-[400] text-[14px] text-[#1E293B]">welcome back,</h2>
              <h2 className="capitalize text-[20px] font-[500] text-[#1E293B]">{user?.name}</h2>
            </div>
            <div className="flex items-center gap-x-[12px]">
              <div className="w-14 h-14 rounded-full">
                <Image
                  src={user?.profile_picture || "/doc-re.png"}
                  alt="mymedicare-app"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover rounded-full"
                  quality={100}
                  priority
                />
              </div>
              <div className="">
                <h3 className="capitalize text-tertiary-1 text-[14px]">
                  {user?.name}
                </h3>
                <button className="bg-[#0F973D]  p-1 rounded-lg">
                  <h2 className="capitalize text-white text-[10px]">
                    {user?.role?.replace(/_/g, ' ')}
                  </h2>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div className="w-full lg:hidden flex">
        <div className="w-full border-b-2 border-primary-5 px-3 py-4 fixed top-0 bg-white">
          <div className="flex items-center justify-between">
            <div className="w-[20%]">
              <Image
                src={'/logo.png'}
                alt="stonepay-admin-app"
                width={100}
                height={100}
                className="w-full h-full object-cover"
                quality={100}
                priority
              />
            </div>
            <div onClick={handleToggleMenu}>
              <IoMenuSharp size={30} className="text-primary-5 font-bold"/>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for mobile menu */}
      {openMenu && (
        <Modal onClose={handleToggleMenu} visible={openMenu}>
          <div className="w-full h-screen flex">
            <div className="w-full h-full  p-5 relative">
              <div className="w-[30%]">
                <Image
                  src={'/logo.png'}
                  alt="stonepay-admin-app"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                  quality={100}
                  priority
                />
              </div>
              <div className="py-5 w-full">
                {user && (
                  (user.role === 'super_admin' ? adminNav :
                  user.role === 'doctor' ? professionalNav :
                  user.role === 'hq_partner' ? partnerNav :
                  user.role === 'branch_partner' ? partnerNav :
                  patientNav
                  ).map((item, id) => (
                    <Link
                      href={item.path}
                      key={id}
                      className="p-3 flex items-center gap-x-3 hover:bg-primary-5/60 rounded-lg cursor-pointer hover:text-white focus:text-primary-5 font-semibold text-primary-5 capitalize"
                      onClick={handleToggleMenu} // Close menu when clicking a link
                    >
                      <h2>{item.icon}</h2>
                      <h2>{item.title}</h2>
                    </Link>
                  ))
                )}
              </div>

              <div 
                className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-center"
              >
                <button onClick={handleSignout} className="bg-red-600 text-white font-bold capitalize rounded-lg p-2 flex items-center gap-x-1">
                  <span><IoLogOutOutline size={25}/></span>
                  <span>{ isLoading ? 'loading' : 'sign out'}</span>
                </button>
              </div>

              {/* Close icon */}
              <button
                className="absolute top-5 right-0 text-primary-5 font-bold text-2xl"
                onClick={handleToggleMenu}
              >
                <IoMdClose size={25}/>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Topbar;
