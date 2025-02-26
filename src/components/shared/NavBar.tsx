'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { FaSignOutAlt } from 'react-icons/fa';
import { auth } from '@/utils/firebase';

export const menuItems = [
    { label: 'Products', href: '/admin' },
    { label: 'Contacts', href: '/admin/contacts' },
    { label: 'Training Programs', href: '/admin/training-programs' },
    { label: 'Blogs', href: '/admin/blogs' },
    { label: 'Statistics', href: '/admin/statistics' },
    { label: 'Contact Requests', href: '/admin/contact-requests' },
];

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            {/* Mobile Navigation */}
            <header className="sticky top-0 bg-gray-800 text-white shadow-md z-50">
                <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:hidden">
                    <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="object-contain" />
                    <button className="block text-white text-3xl" onClick={toggleMenu}>
                        &#9776;
                    </button>

                    <nav className={`${isMenuOpen ? 'left-0 flex flex-col absolute top-20 bg-gray-800 w-full py-6' : 'hidden'}`}>
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`block px-4 py-2 rounded ${pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="block w-full px-4 py-2 mt-4 text-left text-red-400 hover:text-red-500"
                        >
                            <FaSignOutAlt className="text-xl" />
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>
            </header>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-col w-64 bg-gray-800 text-white min-h-screen">
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4 ml-2">
                        <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="object-contain" />
                    </div>

                    <ul className="w-full flex-grow">
                        {menuItems.map((item, index) => (
                            <li key={index} className="mb-2">
                                <Link
                                    href={item.href}
                                    className={`block px-4 py-2 rounded ${pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Logout Button (Pinned to bottom) */}
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-400 hover:text-red-500 mb-6 flex items-center justify-start space-x-2"
                    >
                        <FaSignOutAlt className="text-xl" />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </>
    );
}
