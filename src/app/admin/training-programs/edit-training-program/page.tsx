'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import ProgramForm from '@/components/ProgramForm';
import Spinner from '@/components/shared/Spinner';

export default function EditProgram() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    mode: '',
    time_frame: 0,
    description: '',
    activities: '',
    bonus_materials: '',
    fee: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      const programId = searchParams.get('id');
      if (!programId) {
        console.error('Program ID not found in the URL');
        setLoading(false);
        return;
      }

      try {
        const programRef = doc(db, 'Training Programs', programId);
        const programSnapshot = await getDoc(programRef);

        if (programSnapshot.exists()) {
          const programData = programSnapshot.data();
          setFormData({
            mode: programData.mode || '',
            description: programData.description || '',
            activities: programData.activities || '',
            bonus_materials: programData.bonus_materials || '',
            time_frame: programData.time_frame || '',
            fee: programData.fee || '',
          });
        } else {
          console.error('Program not found in the database');
        }
      } catch (error) {
        console.error('Error fetching program data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [searchParams]);

  const handleSubmit = async (program: any) => {
    const programId = searchParams.get('id');
    if (!programId) {
      console.error('Program ID not found in the URL');
      return;
    }

    try {
      const programRef = doc(db, 'Training Programs', programId);
      await updateDoc(programRef, program);

      router.push('/admin/training-programs');
    } catch (error) {
      console.error('Error updating program:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <ProgramForm
      initialData={formData}
      onSubmit={handleSubmit}
      formTitle="Edit Training Program"
      submitButtonText="Save"
    />
  );
}
