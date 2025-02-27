'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Link as ScrollLink } from 'react-scroll';

interface Contact {
    id: string;
    phone: string;
    email: string;
}

export default function Footer() {
    const [isScrolled, setIsScrolled] = useState(false);
    const shopLink = 'https://yeka-organic-farms.vendblue.store/'

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 text-2xl transition-all duration-300
                   ${isScrolled ? "bg-white shadow-md text-green-700" : "bg-transparent text-white"}`}
        >
            <div className=" mx-auto flex items-center justify-between py-4 px-6">
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
                    className="lg:hidden block text-white text-3xl"
                    onClick={toggleMenu}
                >
                    &#9776; {/* Hamburger icon */}
                </button>

                {/* Navigation */}
                <nav className={`lg:flex gap-6 ${isMenuOpen ? 'left-0 flex flex-col absolute top-20 bg-white w-full py-6' : 'hidden lg:flex'}`}>
                    {['Home', 'About', 'Services', 'Shop', 'Blogs', 'Contact Us'].map((item, index) => (
                        <a
                            key={index}
                            target={index != 3 ? `_self` : '_blank'}
                            href={index != 3 ? `#${item.toLowerCase().replace(' ', '-')}` : shopLink}
                            className="hover:text-yellow-400 transition py-2 px-4 text-center"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
