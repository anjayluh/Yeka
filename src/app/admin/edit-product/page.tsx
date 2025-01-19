'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase'; // Adjust the import to match your Firebase config file
import ProductForm from '@/components/ProductForm';
import Spinner from '@/components/Spinner';

export default function EditProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    min_order: 0,
    max_order: 0,
    is_delivery_available: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = searchParams.get('id');
      if (!productId) {
        console.error('Product ID not found in the URL');
        setLoading(false);
        return;
      }

      try {
        const productRef = doc(db, 'Products', productId);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setFormData({
            name: productData.name || '',
            description: productData.description || '',
            price: productData.price || 0,
            min_order: productData.min_order || 0,
            max_order: productData.max_order || 0,
            is_delivery_available: productData.is_delivery_available || false,
          });
        } else {
          console.error('Product not found in the database');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams]);

  const handleSubmit = async (product: any) => {
    const productId = searchParams.get('id');
    if (!productId) {
      console.error('Product ID not found in the URL');
      return;
    }

    try {
      const productRef = doc(db, 'Products', productId);
      await updateDoc(productRef, product);

      console.log('Product updated successfully:', product);
      router.push('/admin');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ProductForm
      initialData={formData}
      onSubmit={handleSubmit}
      formTitle="Edit Product"
      submitButtonText="Save"
    />
  );
}
