'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import SectionHeader from '@/components/SectionHeader';

export default function ContactUs() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            console.error('Name, email, and phone are required fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            await addDoc(collection(db, 'Contact Requests'), formData);
            setIsSubmitting(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Error adding request:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact-us" className="container mx-auto py-12">
            <SectionHeader title={'Contact Us'} />
            <form className="mt-8 max-w-2xl mx-auto" onSubmit={handleSubmit}>
                <div className="grid mx-8 grid-cols-1 gap-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        className="px-4 py-2 border rounded-md"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="px-4 py-2 border rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        required
                        className="px-4 py-2 border rounded-md"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        className="px-4 py-2 border rounded-md"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#85a900] text-white py-2 rounded-md hover:bg-[#879d00]"
                    >
                        {isSubmitting ? "Submitting ..." : "Send"}
                    </button>
                </div>
            </form>
        </section>
    );
}
