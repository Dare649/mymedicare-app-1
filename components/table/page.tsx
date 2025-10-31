'use client';

import React, { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { CiSearch } from 'react-icons/ci';
import { IoEyeOutline } from 'react-icons/io5';

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  data?: any[];
  columns?: Column[];
  itemsPerPage?: number;
  handleView?: (row: any) => void;
  showView?: boolean; // ✅ NEW
}

const Table: React.FC<TableProps> = ({
  data = [],
  columns = [],
  itemsPerPage = 10,
  handleView,
  showView = true, // ✅ Default is TRUE (view column shows)
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data || !columns) return [];
    return data.filter((item) =>
      columns.some((col) =>
        String(item[col.key] ?? '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [data, columns, searchTerm]);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-full">
      {/* Search */}
      <div className="w-full border-b px-4 py-3 flex items-center gap-x-2 text-[#94A3BB]">
        <CiSearch size={18} />
        <input
          type="text"
          placeholder="Search something..."
          className="outline-none border-none text-sm w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="w-full overflow-auto scrollbar-hide">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-[#F1F5F9] text-left">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="py-3 px-6 font-medium text-[#475569] uppercase whitespace-nowrap">
                  {col.label}
                </th>
              ))}

              {/* ✅ Only show column if showView is true */}
              {showView && (
                <th className="py-3 px-6 font-medium text-[#475569] uppercase whitespace-nowrap">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white">
            {currentPageData.length > 0 ? (
              currentPageData.map((item, index) => (
                <tr key={index} className="border-t hover:bg-[#F9FAFB]">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-6 text-[#334155] whitespace-nowrap">
                      {item[col.key]}
                    </td>
                  ))}

                  {/* ✅ Only show button if showView is true */}
                  {showView && (
                    <td className="py-3 px-6">
                      <button
                        className="flex items-center justify-center bg-secondary-4 rounded-md p-2 text-[#0F172A] cursor-pointer gap-x-1"
                        onClick={() => handleView && handleView(item)}
                      >
                        <IoEyeOutline size={14} />
                        <span className="text-sm">View</span>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (showView ? 1 : 0)} className="text-center py-6 text-gray-400">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-end px-4 py-3">
          <ReactPaginate
            previousLabel="← Prev"
            nextLabel="Next →"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="flex gap-2 items-center text-sm cursor-pointer"
            pageClassName="px-3 py-1 border rounded-md hover:bg-primary-3 hover:text-white"
            activeClassName="bg-primary-5 text-white font-semibold"
            previousClassName="px-3 py-1 border rounded-md hover:bg-primary-3 hover:text-white"
            nextClassName="px-3 py-1 border rounded-md hover:bg-primary-3 hover:text-white"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default Table;
