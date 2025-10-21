import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

interface TrackingItem {
  track: string;
}

interface BranchPatientData {
  name: string;
  rm_tracking: TrackingItem[];
  img: React.ReactNode; // ✅ allow JSX (your <img />)
}

interface DashboardTableProps {
  header: string;
  text: string;
  data: BranchPatientData[];
  link: string;
  headerColor?: string;
  arrow: boolean;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  header,
  text,
  data = [],
  link,
  headerColor = "text-lg text-gray-800",
  arrow = true,
}) => {
  return (
    <div className="w-full rounded-2xl border-secondary-2 border-[1.5px] overflow-hidden">
      {/* Header */}
      <div className="w-full bg-secondary-1">
        <div className="p-3 flex items-center justify-between">
          <div>
            <h2 className={`capitalize font-semibold ${headerColor}`}>{header}</h2>
            <h4 className="text-secondary-6 text-sm mt-1 first-letter:capitalize">
              {text}
            </h4>
          </div>
          <Link 
            href={link}
            className="first-letter:capitalize text-white bg-primary-5 px-3 py-1 rounded-md hover:opacity-90 cursor-pointer"
          >
            view all
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-white">
        {data.length > 0 ? (
          data.map((row, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {row.img}
                </div>
                <div>
                  <h2 className="text-tertiary-1 font-medium capitalize">
                    {row.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-1 capitalize">
                    tracking {row.rm_tracking.map((t, i) => {
                        const colors = [
                        "text-green-600 bg-green-100",
                        "text-orange-600 bg-orange-100",
                        "text-blue-600 bg-blue-100",
                        "text-yellow-600 bg-yellow-100",
                        ];

                        return (
                        <span
                            key={i}
                            className={`px-2 py-1 text-xs rounded-md font-medium capitalize ${colors[i % colors.length]}`}
                        >
                            {t.track}
                        </span>
                        );
                    })}
                    </div>
                </div>
              </div>

              {
                arrow == true ? (
                  <div className="w-10 h-10 rounded-full bg-secondary-2 flex items-center justify-center cursor-pointer">
                    <IoIosArrowForward />
                  </div>
                ): (
                  <div className="bg-[#EBF3FF] text-[#0046B8] hover:bg-[#0046B8] hover:text-[#EBF3FF] capitalize font-bold rounded-4xl lg:px-4 sm:px-2 sm:py-1 lg:py-2 text-sm cursor-pointer">
                    send reminder
                  </div>
                )
              }
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No records found</p>
        )}
      </div>
    </div>
  );
};

export default DashboardTable;
