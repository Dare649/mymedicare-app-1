"use client";

import { ReactNode, useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "@/components/loading/page";
import MainLayout from "@/components/main-layout/page";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Always call hooks, even before mounted is true
  const normalizedPath = useMemo(() => pathname.replace(/\/+$/, ""), [pathname]);

  const excludedPaths = useMemo(
    () =>
      new Set([
        "",
        "/",
        "/auth/sign-up",
        "/auth/sign-in",
        "/auth/verify-otp",
        "/error",
      ]),
    []
  );

  const resetPasswordPattern = /^\/auth\/reset_password\/[^/]+\/[^/]+$/;

  const isExcluded =
    excludedPaths.has(normalizedPath) || resetPasswordPattern.test(normalizedPath);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingOverlay />
        <ToastContainer position="top-center" autoClose={3000} />
        {/* ✅ Instead of returning null early, handle it here */}
        {!mounted ? null : isExcluded ? children : <MainLayout>{children}</MainLayout>}
      </PersistGate>
    </Provider>
  );
}
