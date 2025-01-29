import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { formatNumberWithCommas } from "@/utils/formatter";

interface TableProps {
  data: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    min_order: number;
    max_order: number;
    is_delivery_available?: boolean;
  }>;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

export default function ProductTable({ data, onEdit, onDelete }: TableProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEditClick = (item) => {
    if (!isClient) return;
    onEdit(item);
  };

  const handleDeleteClick = (item) => {
    if (!isClient) return;
    onDelete(item);
  };

  if (!isClient) return null;

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      {/* Table for larger screens */}
      <table className="table-auto w-full hidden sm:table">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-right">Price</th>
            <th className="px-6 py-4 text-right">Min Order</th>
            <th className="px-6 py-4 text-right">Max Order</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-green-50">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4 text-right">{formatNumberWithCommas(item.price)}</td>
                <td className="px-6 py-4 text-right">{formatNumberWithCommas(item.min_order)}</td>
                <td className="px-6 py-4 text-right">{formatNumberWithCommas(item.max_order)}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <FaEdit
                    onClick={() => handleEditClick(item)}
                    className="text-green-600 hover:text-green-700 cursor-pointer"
                    title="Edit product"
                  />
                  <FaTrash
                    onClick={() => handleDeleteClick(item)}
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                    title="Delete product"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center px-6 py-8 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="block sm:hidden">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="border-b p-4 hover:bg-green-50">
              <div className="flex justify-between">
                <div className="font-bold">ID:</div>
                <div>{item.id}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Name:</div>
                <div>{item.name}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Price:</div>
                <div>{formatNumberWithCommas(item.price)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Min Order:</div>
                <div>{formatNumberWithCommas(item.min_order)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Max Order:</div>
                <div>{formatNumberWithCommas(item.max_order)}</div>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-green-600 hover:text-green-700"
                    title="Edit product"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(item)}
                  className="text-red-600 hover:text-red-700"
                    title="Delete product"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-4">No products found.</div>
        )}
      </div>
    </div>
  );
}
