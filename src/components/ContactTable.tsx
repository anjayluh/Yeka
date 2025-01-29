import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TableProps {
  data: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
  }>;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

export default function ContactTable({ data, onEdit, onDelete }: TableProps) {
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
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Phone Number</th>
            <th className="px-6 py-4 text-left">Edit</th>
            <th className="px-6 py-4 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-green-50">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">
                  <FaEdit
                    onClick={() => handleEditClick(item)}
                    className="text-green-600 hover:text-green-700 cursor-pointer"
                    title="Edit contact"
                  />
                </td>
                <td className="px-6 py-4">
                  <FaTrash
                    onClick={() => handleDeleteClick(item)}
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                    title="Delete contact"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center px-6 py-8 text-gray-500">
                No contacts found.
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
                <div className="font-bold">Email:</div>
                <div>{item.email}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Phone Number:</div>
                <div>{item.phone}</div>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-green-600 hover:text-green-700"
                    title="Edit contact"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(item)}
                  className="text-red-600 hover:text-red-700"
                    title="Delete contact"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-4">No contacts found.</div>
        )}
      </div>
    </div>
  );
}
