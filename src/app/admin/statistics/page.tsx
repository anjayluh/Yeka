'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Spinner from '@/components/shared/Spinner';
import StatisticTable from '@/components/StatisticTable';
import NavBar from '@/components/shared/NavBar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StatisticsDashboard() {
    const router = useRouter();
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatistic, setSelectedStatistic] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Statistics'));
                const statisticsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setStatistics(statisticsData);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    const handleEdit = (statistic) => {
        const url = `/admin/statistics/edit-statistic?id=${statistic.id}`;
        router.push(url);
    };

    const handleDelete = async () => {
        if (selectedStatistic) {
            try {
                await deleteDoc(doc(db, 'Statistics', selectedStatistic.id));
                setStatistics(statistics.filter((statistic) => statistic.id !== selectedStatistic.id));
                setShowModal(false);
            } catch (error) {
                console.error('Error deleting statistics:', error);
            }
        }
    };

    const openDeleteModal = (statistic) => {
        setSelectedStatistic(statistic);
        setShowModal(true);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <NavBar />

            <div className="flex-1 p-8 bg-gray-50">
                <header className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0 lg:space-x-4">
                    <h1 className="text-4xl font-bold text-gray-800">Statistics</h1>
                    <Link href="/admin/statistics/add-statistic">
                        <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
                            Add Statistic
                        </button>
                    </Link>
                </header>
                <main>
                    <StatisticTable data={statistics} onEdit={handleEdit} onDelete={openDeleteModal} />
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-md">
                                <h2 className="text-lg font-semibold mb-4">
                                    Are you sure you want to delete this statistic?
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
