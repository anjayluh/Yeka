'use client';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import ProgramForm from '@/components/ProgramForm';

export default function AddTrainingProgram() {
  const router = useRouter();

  const handleSubmit = async (program: any) => {
    const programData = {
      mode: program.mode,
      description: program.description,
      activities: program.activities,
      bonus_materials: program.bonus_materials,
      time_frame: program.time_frame,
      fee: program.fee,
    };
    if (!programData.mode) {
      return;
    }

    try {
      await addDoc(collection(db, 'Training Programs'), programData);
      router.push('/admin/training-programs');
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };

  return (
    <ProgramForm
      onSubmit={handleSubmit}
      formTitle="Add New Training Program"
      submitButtonText="Save"
    />
  );
}
