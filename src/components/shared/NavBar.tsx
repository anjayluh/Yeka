'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const menuItems = [
    { label: 'Products', href: '/admin' },
    { label: 'Contacts', href: '/admin/contacts' },
    { label: 'Training Programs', href: '/admin/training-programs' },
    { label: 'Blogs', href: '/admin/blogs' },
];

export default function NavBar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Mobile Navigation */}
            <header className="sticky top-0 bg-gray-800 text-white shadow-md z-50">
                <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:hidden ">
                    {/* Logo */}
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                    />

                    {/* Hamburger Icon (Only visible on mobile) */}
                    <button
                        className="block text-white text-3xl"
                        onClick={toggleMenu}
                    >
                        &#9776; {/* Hamburger icon */}
                    </button>

                    {/* Mobile Navigation Menu (Visible only when hamburger is clicked) */}
                    <nav
                        className={`${isMenuOpen ? 'left-0 flex flex-col absolute top-20 bg-gray-800 w-full py-6' : 'hidden'}`}
                    >
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className={`block px-4 py-2 rounded ${
                                    pathname === item.href
                                        ? 'bg-gray-700'
                                        : 'hover:bg-gray-700'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Desktop Navigation (Always visible on large screens) */}
            <nav className="hidden lg:block w-64 bg-gray-800 text-white">
                <div className="p-6 flex flex-col">
                    <div className="mb-4 ml-2">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>

                    <ul className="w-full">
                        {menuItems.map((item, index) => (
                            <li key={index} className="mb-2">
                                <Link
                                    href={item.href}
                                    className={`block px-4 py-2 rounded ${
                                        pathname === item.href
                                            ? 'bg-gray-700'
                                            : 'hover:bg-gray-700'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
}
