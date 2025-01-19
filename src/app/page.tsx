'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Spinner from '@/components/Spinner';
import ProductTable from '@/components/ProductTable';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleEdit = (product) => {
        try {
            const url = `/edit-product?id=${product.id}`;
            router.push(url);
        } catch (error) {
            console.error('Error navigating to edit page:', error);
        }
    };

    const handleDelete = async () => {
        try {
            if (selectedProduct) {
                await deleteDoc(doc(db, 'Products', selectedProduct.id));
                setProducts(products.filter((product) => product.id !== selectedProduct.id));
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Yeka Product Dashboard</h1>
                <Link href="/add-product">
                    <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
                        Add Product
                    </button>
                </Link>
            </header>
            <main>
                <ProductTable data={products} onEdit={handleEdit} onDelete={openDeleteModal} />
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-lg font-semibold mb-4">
                                Are you sure you want to delete this product?
                            </h2>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
