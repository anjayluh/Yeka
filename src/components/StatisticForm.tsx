'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface StatisticFormProps {
  initialData?: {
    name: string;
    value: number;
  };
  onSubmit: (statistic: any) => void;
  formTitle: string;
  submitButtonText: string;
}

const StatisticForm = ({
  initialData = {
    name: '',
    value: 0,
  },
  onSubmit,
  formTitle,
  submitButtonText,
}: StatisticFormProps) => {
  const [statistic, setStatistic] = useState(initialData);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStatistic((prev) => {
      const updatedStatistic = {
        ...prev,
        [name]: value,
      };
      checkIfFormChanged(updatedStatistic);
      return updatedStatistic;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!statistic.name || !statistic.value) {
      console.error('Name and value are required fields are required fields');
      return;
    }
    onSubmit(statistic);
  };

  const handleCancel = () => {
    router.back();
  };

  const checkIfFormChanged = (updatedStatistic: any) => {
    setIsFormChanged(JSON.stringify(updatedStatistic) !== JSON.stringify(initialData));
  };

  useEffect(() => {
    checkIfFormChanged(statistic);
  }, [statistic]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[90%] p-6 max-w-lg bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={statistic.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              Value
            </label>
            <input
              id="value"
              type="text"
              name="value"
              value={statistic.value}
              onChange={handleInputChange}
              placeholder="Value"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md hover:bg-green-700 ${isFormChanged
                ? 'bg-green-600'
                : 'bg-gray-200 cursor-not-allowed hover:bg-gray-200'
                }`}
              disabled={!isFormChanged}
            >
              {submitButtonText}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatisticForm;
