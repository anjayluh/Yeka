'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ContactFormProps {
  initialData?: {
    name: string;
    email: string;
    phone: string;
  };
  onSubmit: (contact: any) => void;
  formTitle: string;
  submitButtonText: string;
}

const ProductForm = ({
  initialData = {
    name: '',
    email: '',
    phone: '',
  },
  onSubmit,
  formTitle,
  submitButtonText,
}: ContactFormProps) => {
  const [contact, setContact] = useState(initialData);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => {
      const updatedContact = {
        ...prev,
        [name]: value,
      };
      checkIfFormChanged(updatedContact);
      return updatedContact;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.email) {
      console.error('Name, Email and Phone are required fields');
      return;
    }
    onSubmit(contact);
  };

  const handleCancel = () => {
    router.back();
  };

  const checkIfFormChanged = (updatedContact: any) => {
    setIsFormChanged(JSON.stringify(updatedContact) !== JSON.stringify(initialData));
  };

  useEffect(() => {
    checkIfFormChanged(contact);
  }, [contact]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-[90%] p-6 max-w-lg bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Contact Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={contact.name}
              onChange={handleInputChange}
              placeholder="Contact Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={contact.email}
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
              type="text"
              name="phone"
              value={contact.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md hover:bg-green-700 ${
                isFormChanged
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

export default ProductForm;
