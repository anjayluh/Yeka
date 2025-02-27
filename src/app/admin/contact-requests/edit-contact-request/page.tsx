'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import RequestForm from '@/components/RequestForm';
import Spinner from '@/components/shared/Spinner';

export default function EditRequest() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    mode: '',
    time_frame: 0,
    message: '',
    activities: '',
    bonus_materials: '',
    fee: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      const requestId = searchParams.get('id');
      if (!requestId) {
        console.error('Request ID not found in the URL');
        setLoading(false);
        return;
      }

      try {
        const requestRef = doc(db, 'Contact Requests', requestId);
        const requestSnapshot = await getDoc(requestRef);

        if (requestSnapshot.exists()) {
          const requestData = requestSnapshot.data();
          setFormData({
            name: requestData.name || '',
            email: requestData.email || '',
            phone: requestData.phone || '',
            message: requestData.message || '',
          });
        } else {
          console.error('Request not found in the database');
        }
      } catch (error) {
        console.error('Error fetching request data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [searchParams]);

  const handleSubmit = async (request: any) => {
    const requestId = searchParams.get('id');
    if (!requestId) {
      console.error('Request ID not found in the URL');
      return;
    }

    try {
      const requestRef = doc(db, 'Contact Requests', requestId);
      await updateDoc(requestRef, request);

      router.push('/admin/contact-requests');
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <RequestForm
      initialData={formData}
      onSubmit={handleSubmit}
      formTitle="Edit Contact Request"
      submitButtonText="Save"
    />
  );
}
