'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import ContactForm from '@/components/ContactForm';
import Spinner from '@/components/Spinner';

export default function EditContact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      const contactId = searchParams.get('id');
      if (!contactId) {
        console.error('Contact ID not found in the URL');
        setLoading(false);
        return;
      }

      try {
        const contactRef = doc(db, 'Contacts', contactId);
        const contactSnapshot = await getDoc(contactRef);

        if (contactSnapshot.exists()) {
          const contactData = contactSnapshot.data();
          setFormData({
            name: contactData.name || '',
            email: contactData.email || '',
            phone: contactData.phone || '',
          });
        } else {
          console.error('Contact not found in the database');
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [searchParams]);

  const handleSubmit = async (contact: any) => {
    const contactId = searchParams.get('id');
    if (!contactId) {
      console.error('Contact ID not found in the URL');
      return;
    }

    try {
      const contactRef = doc(db, 'Contacts', contactId);
      await updateDoc(contactRef, contact);

      console.log('Contact updated successfully:', contact);
      router.push('/contacts');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ContactForm
      initialData={formData}
      onSubmit={handleSubmit}
      formTitle="Edit Contact"
      submitButtonText="Save"
    />
  );
}
