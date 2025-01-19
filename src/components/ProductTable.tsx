import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

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
}

export default function Table({ data, onEdit }: TableProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEditClick = (item: {
    id: string;
    name: string;
    description: string;
    price: number;
    min_order: number;
    max_order: number;
    is_delivery_available?: boolean;
  }) => {
    if (!isClient) return;

    onEdit(item)
  };

  if (!isClient) return null;

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="table-auto w-full">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-right">Price</th>
            <th className="px-6 py-4 text-right">Min Order</th>
            <th className="px-6 py-4 text-right">Max Order</th>
            <th className="px-6 py-4 text-left">Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-green-50">
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4 text-right">{item.price}</td>
                <td className="px-6 py-4 text-right">{item.min_order}</td>
                <td className="px-6 py-4 text-right">{item.max_order}</td>
                <td className="px-6 py-4">
                  <FaEdit
                    onClick={() => { handleEditClick(item) }}
                    className="text-green-600 hover:text-green-700 cursor-pointer"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center px-6 py-8 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
