'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import StatisticForm from '@/components/StatisticForm';
import Spinner from '@/components/shared/Spinner';

export default function EditStatistic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
      name: '',
      value: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistic = async () => {
      const statisticId = searchParams.get('id');
      if (!statisticId) {
        console.error('Statistic ID not found in the URL');
        setLoading(false);
        return;
      }

      try {
        const statisticRef = doc(db, 'Statistics', statisticId);
        const statisticSnapshot = await getDoc(statisticRef);

        if (statisticSnapshot.exists()) {
          const statisticData = statisticSnapshot.data();
          setFormData({
            name: statisticData.name || '',
            value: statisticData.value || '',
          });
        } else {
          console.error('Statistic not found in the database');
        }
      } catch (error) {
        console.error('Error fetching statistic data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistic();
  }, [searchParams]);

  const handleSubmit = async (statistic: any) => {
    const statisticId = searchParams.get('id');
    if (!statisticId) {
      console.error('Statistic ID not found in the URL');
      return;
    }

    try {
      const statisticRef = doc(db, 'Statistics', statisticId);
      await updateDoc(statisticRef, statistic);

      router.push('/admin/statistics');
    } catch (error) {
      console.error('Error updating statistic:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <StatisticForm
      initialData={formData}
      onSubmit={handleSubmit}
      formTitle="Edit Statistic"
      submitButtonText="Save"
    />
  );
}
