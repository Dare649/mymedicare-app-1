'use client';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const LoadingOverlay = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-16 h-16">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-primary-5 opacity-50 animate-ping"></div>

        {/* Inner circle */}
        <div className="relative w-full h-full rounded-full bg-white animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingOverlay;