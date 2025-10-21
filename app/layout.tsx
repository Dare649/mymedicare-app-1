// NO 'use client' here
import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/client-provider/page"; // you'll create this next

export const metadata: Metadata = {
  title: "MyMedicare - Wellness At Your Fingertips",
  icons: {
    icon: "/favicon.ico",
  },
  description: "MyMedicare - Wellness At Your Fingertips",
  keywords: [
    "MyMedicare",
    "Wellness",
    "Health",
    "Healthcare",
    "Medical",
    "Wellness At Your Fingertips",
    "Health Management",
    "Patient Care",
    "Healthcare Solutions",
    "Health Tracking",
    "Medical Services",
    "Health Monitoring",
    "Wellness Platform",
    "Health Technology",
    "Patient Engagement",
    "Healthcare Innovation",
    "Health Apps",
    "Wellness Solutions",
    "Health Management System",
    "Patient-Centric Care",
    "Healthcare Accessibility",
    "Health and Wellness",
    "Health Information",
    "Wellness Tracking",
    "Remote Monitoring",
    "Telehealth",
  ],
  authors: [
    {
      name: "MyMedicare Team",
      url: "https://mymedicare.example.com",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
