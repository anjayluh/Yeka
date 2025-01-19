'use client';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase'; // Adjust based on your firebase.ts location
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm'; // Import the reusable form

export default function AddProduct() {
  const router = useRouter();

  const handleSubmit = async (product: any) => {
    const productData = {
      name: product.name,
      description: product.description,
      price: product.price,
      is_delivery_available: product.is_delivery_available,
      min_order: product.min_order,
      max_order: product.max_order,
    };

    if (!productData.name || !productData.price) {
      console.error('Name and price are required fields');
      return;
    }

    try {
      await addDoc(collection(db, 'Products'), productData);
      router.push('/');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      formTitle="Add New Product"
      submitButtonText="Save"
    />
  );
}
