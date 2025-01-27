'use client';

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

    return (
        <nav className="w-64 bg-gray-800 text-white">
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
    );
}
