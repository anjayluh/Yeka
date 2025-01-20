'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavBarProps {
    menuItems: { label: string; href: string }[];
}

export default function NavBar({ menuItems }: NavBarProps) {
    const pathname = usePathname();

    return (
        <nav className="w-64 bg-gray-800 text-white">
            <div className="p-6 flex flex-col items-center">
                <div className="mb-6">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="object-contain"
                    />
                </div>

                {/* Menu Items */}
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
