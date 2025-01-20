'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Spinner from '@/components/Spinner';
import ContactTable from '@/components/ProgramTable';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
    const router = useRouter();
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const menuItems = [
        { label: 'Products', href: '/' },
        { label: 'Contacts', href: '/contacts' },
        { label: 'Training Programs', href: '/training-programs' },
    ];

    useEffect(() => {
        const fetchTrainingPrograms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Training Programs'));
                const programsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPrograms(programsData);
            } catch (error) {
                console.error('Error fetching programs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainingPrograms();
    }, []);

    const handleEdit = (program) => {
        const url = `/training-programs/edit-training-program?id=${program.id}`;
        router.push(url);
    };

    const handleDelete = async () => {
        if (selectedContact) {
            try {
                await deleteDoc(doc(db, 'Training Programs', selectedContact.id));
                setPrograms(programs.filter((program) => program.id !== selectedContact.id));
                setShowModal(false);
            } catch (error) {
                console.error('Error deleting training programs:', error);
            }
        }
    };

    const openDeleteModal = (program) => {
        setSelectedContact(program);
        setShowModal(true);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex min-h-screen">
            <NavBar menuItems={menuItems} />

            <div className="flex-1 p-8 bg-gray-50">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Training Programs</h1>
                    <Link href="/training-programs/add-training-program">
                        <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
                            Add Training Program
                        </button>
                    </Link>
                </header>
                <main>
                    <ContactTable data={programs} onEdit={handleEdit} onDelete={openDeleteModal} />
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-md">
                                <h2 className="text-lg font-semibold mb-4">
                                    Are you sure you want to delete this training program?
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
        </div>
    );
}
