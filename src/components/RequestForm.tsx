'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RequestFormProps {
  initialData?: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  onSubmit: (request: any) => void;
  formTitle: string;
  submitButtonText: string;
}

const RequestForm = ({
  initialData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  },
  onSubmit,
  formTitle,
  submitButtonText,
}: RequestFormProps) => {
  const [request, setRequest] = useState(initialData);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest((prev) => {
      const updatedRequest = {
        ...prev,
        [name]: value,
      };
      checkIfFormChanged(updatedRequest);
      return updatedRequest;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!request.name) {
      console.error('Name is a required fields are required fields');
      return;
    }
    onSubmit(request);
  };

  const handleCancel = () => {
    router.back();
  };

  const checkIfFormChanged = (updatedRequest: any) => {
    setIsFormChanged(JSON.stringify(updatedRequest) !== JSON.stringify(initialData));
  };

  useEffect(() => {
    checkIfFormChanged(request);
  }, [request]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[90%] p-6 max-w-lg bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
        <form onSubmit={handleSubmit}>


          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={request.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={request.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="phone"
              name="phone"
              value={request.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={request.message}
              onChange={handleInputChange}
              placeholder="Message"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              aria-label="Message"
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

export default RequestForm;
