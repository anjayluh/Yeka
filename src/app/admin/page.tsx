'use client'; // Add this to ensure this file is treated as client-side rendered

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Spinner from '@/components/Spinner';
import ProductTable from '@/components/ProductTable';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Products'));
                const productsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product: {
        id: string;
        name: string;
        description: string;
        price: number;
    }) => {
        try {
            const url = `/admin/edit-product?id=${product.id}`;

            router.push(url);
        } catch (error) {
            console.error('Error navigating to edit page:', error);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Yeka Product Dashboard
                </h1>
                <Link href="/admin/add-product">
                    <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
                        Add Product
                    </button>
                </Link>
            </header>
            <main>
                <ProductTable data={products} onEdit={handleEdit} />
            </main>
        </div>
    );
}
