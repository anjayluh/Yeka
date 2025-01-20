import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TableProps {
  data: Array<{
    id: string;
    mode: string;
    time_frame: number;
    fee: number;
    description: string;
    activities: string;
    bonus_materials: string;
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
      <table className="table-auto w-full">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Mode</th>
            <th className="px-6 py-4 text-left">Time Frame</th>
            <th className="px-6 py-4 text-left">Fee</th>
            <th className="px-6 py-4 text-left">Edit</th>
            <th className="px-6 py-4 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-green-50">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.mode}</td>
                <td className="px-6 py-4">{item.time_frame}</td>
                <td className="px-6 py-4">{item.fee}</td>
                <td className="px-6 py-4">
                  <FaEdit
                    onClick={() => handleEditClick(item)}
                    className="text-green-600 hover:text-green-700 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <FaTrash
                    onClick={() => handleDeleteClick(item)}
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center px-6 py-8 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
