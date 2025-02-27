<<<<<<< Updated upstream
'use client';

=======
>>>>>>> Stashed changes
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa';

interface Contact {
    id: string;
    phone: string;
    email: string;
}

export default function Footer() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contactsLoading, setContactsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Contacts'));
                const contactsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Contact[];
                setContacts(contactsData);
            } catch (err) {
                console.error('Error fetching contacts:', err);
                setError('Failed to load contact details.');
            } finally {
                setContactsLoading(false);
            }
        };

        fetchContactDetails();
    }, []);

    return (
        <footer id="footer" className="bg-green-700 text-white py-8">
            <div className="container mx-auto text-center px-4">
                {contactsLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin h-10 w-10 border-4 border-t-green-600 border-gray-300 rounded-full" />
                    </div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : contacts.length > 0 ? (
                    <>
<<<<<<< Updated upstream
                        <p className="text-lg font-semibold">© 2025 Yeka Organic Farms</p>
=======
                        <p className="text-lg font-semibold">© {new Date().getFullYear()} Yeka Organic Farms</p>
>>>>>>> Stashed changes
                        <p className="mt-2">Phone: {contacts[0].phone} | Email: {contacts[0].email}</p>
                    </>
                ) : (
                    <p className="text-gray-200">No contact details available.</p>
                )}

                {/* Social Media Links */}
                <div className="flex justify-center gap-4 mt-4">
                    <Link href="https://facebook.com/YekaOrganicFarms" target="_blank" aria-label="Facebook">
                        <FaFacebook className="text-white text-2xl hover:text-gray-300 transition" />
                    </Link>
                    <Link href="https://twitter.com/YekaOrganic" target="_blank" aria-label="Twitter">
                        <FaTwitter className="text-white text-2xl hover:text-gray-300 transition" />
                    </Link>
                    <Link href="https://www.instagram.com/yekaorganicfarms" target="_blank" aria-label="Instagram">
                        <FaInstagram className="text-white text-2xl hover:text-gray-300 transition" />
                    </Link>
                    <Link href="https://www.tiktok.com/@yekaorganicfarms" target="_blank" aria-label="TikTok">
                        <FaTiktok className="text-white text-2xl hover:text-gray-300 transition" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
