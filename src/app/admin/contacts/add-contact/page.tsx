'use client';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import ContactForm from '@/components/ContactForm';

export default function AddContact() {
  const router = useRouter();

  const handleSubmit = async (contact: any) => {
    const contactData = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };

    if (!contactData.name || !contactData.email || !contactData.phone) {
      console.error('Name and email and phone are required fields are required fields');
      return;
    }

    try {
      await addDoc(collection(db, 'Contacts'), contactData);
      router.push('/admin/contacts');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <ContactForm
      onSubmit={handleSubmit}
      formTitle="Add New Contact"
      submitButtonText="Save"
    />
  );
}
