
<<<<<<< Updated upstream
'use client';

=======
>>>>>>> Stashed changes
import { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Link as ScrollLink } from 'react-scroll';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionHeader from '@/components/SectionHeader';
import ImageCard from '@/components/shared/ImageCard';
import { sliderImages } from '@/utils/constants';

export default function Banner() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        beforeChange: (_, next) => setCurrentSlide(next),
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <section id='about' className="w-screen h-[900px]  relative overflow-x-hidden">
            <Slider {...sliderSettings}>
                {sliderImages.map((img, index) => (
                    <div key={index} className="relative w-screen h-[900px]">
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-center text-white">
                            <h1 className="text-3xl md:text-7xl font-bold my-5">{img.heading}</h1>
                            <p className="mt-4 text-l md:text-2xl my-5">{img.description}</p>
                            <div className="mt-9 flex gap-4">
                                <a
                                    href={img.link}
                                    className="px-6 py-3 bg-yellow-500 text-black text-xl font-semibold rounded shadow hover:bg-yellow-900"
                                >
                                    {img.buttonText}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
