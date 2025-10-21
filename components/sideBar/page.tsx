'use client';

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoLogOutOutline } from "react-icons/io5";

import { adminNav, patientNav, professionalNav, partnerNav, bracnchPartnerNav } from "@/data/dummy";
import { startLoading, stopLoading } from "@/redux/slice/loadingSlice";
import { getSignedInUser } from "@/redux/slice/auth/auth";
import { RootState, AppDispatch } from "@/redux/store";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Prevent infinite loop of fetches
    if (!user) {
      let currentUser = null;

      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          currentUser = JSON.parse(storedUser);
        }
      }

      if (currentUser?.role) {
        const validRoles = ["patient", "doctor"];
        const normalizedRole = currentUser.role === "doctor" ? "doctor" : currentUser.role;
        const roleToUse = validRoles.includes(normalizedRole) ? normalizedRole : "patient"; // default to patient if invalid
        dispatch(getSignedInUser(roleToUse as "patient" | "doctor"));
      }
    }
    // dependency array intentionally left empty to run only once
  }, []);

  const handleSignout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(startLoading());

    setTimeout(() => {
      router.push("/auth/sign-in");
      toast.success("Sign out success!");
      dispatch(stopLoading());
    }, 3000);
  };

  const renderNavItems = () => {
    if (!user) return null;

    const navItems =
      user.role === "sub_admin"
        ? adminNav
        : user.role === "doctor" 
        ? professionalNav
        : user.role === "hq_partner" 
        ? partnerNav
        : user.role === "patient" 
        ? patientNav
        : bracnchPartnerNav;

    return navItems.map((item, id) => (
      <Link
        key={id}
        href={item.path}
        className={`p-3 flex items-center gap-x-3 hover:bg-primary-1 rounded-lg cursor-pointer font-semibold text-[#1E293B] capitalize focus:text-primary-5 focus:bg-primary-1 ${item.gap == true ? "mt-28": ""}`}
      >
        <span className="text-[#94A3BB] focus:text-primary-5">{item.icon}</span>
        <span>{item.title}</span>
      </Link>
    ));
  };

  return (
    <div className="w-full h-full border-r-2 border-secondary-4 shadow-lg flex flex-col justify-between py-5 relative">
      {/* Logo */}
      <div className="px-5">
        <div className="w-[160px]">
          <Image
            src="/logo-2.png"
            alt="stonepay-admin-app"
            width={70}
            height={70}
            className="w-full h-full object-cover"
            quality={100}
            priority
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="w-full px-5 flex-1 mt-14 overflow-y-auto">
        {renderNavItems()}
      </div>

      {/* Sign Out Button */}
      <div className="px-5 mt-4">
        <button
          onClick={handleSignout}
          className="bg-red-600 w-full text-white font-bold capitalize rounded-lg p-2 flex items-center justify-center gap-x-2"
        >
          <IoLogOutOutline size={22} />
          {isLoading ? "loading..." : "log out"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
