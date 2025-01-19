// components/ProductForm.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  initialData?: {
    name: string;
    description: string;
    price: number;
    min_order?: number;
    max_order?: number;
    is_delivery_available?: boolean;
  };
  onSubmit: (product: any) => void;
  formTitle: string;
  submitButtonText: string;
}

const ProductForm = ({
  initialData = {
    name: '',
    description: '',
    price: 0,
    min_order: 0,
    max_order: 0,
    is_delivery_available: false,
  },
  onSubmit,
  formTitle,
  submitButtonText,
}: ProductFormProps) => {
  const [product, setProduct] = useState(initialData);
  const router = useRouter(); // Hook to handle navigation

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!product.name || !product.price) {
      console.error('Name and price are required fields');
      return;
    }
    onSubmit(product);
  };

  const handleCancel = () => {
    router.back(); // Goes back to the previous page
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {initialData.min_order !== undefined && (
          <div className="mb-4">
            <label htmlFor="min_order" className="block text-sm font-medium text-gray-700">
              Min Order
            </label>
            <input
              id="min_order"
              type="number"
              name="min_order"
              value={product.min_order}
              onChange={handleInputChange}
              placeholder="Min Order"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}

        {initialData.max_order !== undefined && (
          <div className="mb-4">
            <label htmlFor="max_order" className="block text-sm font-medium text-gray-700">
              Max Order
            </label>
            <input
              id="max_order"
              type="number"
              name="max_order"
              value={product.max_order}
              onChange={handleInputChange}
              placeholder="Max Order"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_delivery_available"
              checked={product.is_delivery_available}
              onChange={(e) => setProduct((prev) => ({
                ...prev,
                is_delivery_available: e.target.checked
              }))}
              className="mr-2"
            />
            Delivery Available
          </label>
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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
  );
};

export default ProductForm;
