'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavBarProps {
    menuItems: { label: string; href: string }[];
}

export default function NavBar({ menuItems }: NavBarProps) {
    const pathname = usePathname();

    return (
        <nav className="w-64 bg-gray-800 text-white">
            <div className="p-6">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            <Link
                                href={item.href}
                                className={`block px-4 py-2 rounded ${
                                    pathname === item.href
                                        ? 'bg-gray-700' // Apply the same hover color when active
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
