'use client';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import RequestForm from '@/components/RequestForm';

export default function AddTrainingRequest() {
  const router = useRouter();

  const handleSubmit = async (contact: any) => {
    const requestData = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
    };
    if (!requestData.name || !requestData.email || !requestData.phone) {
      console.error('Name and email and phone are required fields are required fields');
      return;
  }

    try {
      await addDoc(collection(db, 'Contact Requests'), requestData);
      router.push('/admin/contact-requests');
    } catch (error) {
      console.error('Error adding request:', error);
    }
  };

  return (
    <RequestForm
      onSubmit={handleSubmit}
      formTitle="Add New Training Request"
      submitButtonText="Save"
    />
  );
}
