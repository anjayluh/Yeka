'use client';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import StatisticForm from '@/components/StatisticForm';

export default function AddStatistic() {
  const router = useRouter();

  const handleSubmit = async (statistic: any) => {
    const statisticData = {
      name: statistic.name,
      value: statistic.value,
    };
    if (!statisticData.name || !statisticData.value) {
      return;
    }

    try {
      await addDoc(collection(db, 'Statistics'), statisticData);
      router.push('/admin/statistics');
    } catch (error) {
      console.error('Error adding statistic:', error);
    }
  };

  return (
    <StatisticForm
      onSubmit={handleSubmit}
      formname="Add New Statistic"
      submitButtonText="Save"
    />
  );
}
