
'use client';

import { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Image from 'next/image';
import Slider from 'react-slick';
import { Link as ScrollLink } from 'react-scroll';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spinner from '@/components/shared/Spinner';

export default function HomePage() {
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

  const images = [
    {
      src: "/images/pexels-d-minh-ha-tu-n-2147504760-29709714.jpg",
      alt: "Helping Farmers Grow",
    },
    {
      src: "/images/pexels-magda-ehlers-pexels-1300375.jpg",
      alt: "Farm Sustainability",
    },
    {
      src: "/images/pexels-theplanetspeaks-12349154.jpg",
      alt: "Agricultural Innovation",
    },
    {
      src: "/images/pexels-mibernaa-21764384.jpg",
      alt: "Sustainable Farming Practices",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const servicesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTrainingPrograms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Training Programs'));
        const programsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPrograms(programsData);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingPrograms();
  }, []);


  const handleProgramClick = (program: any) => {
    setSelectedProgram(program);
  };

  const handleClosePopup = () => {
    setSelectedProgram(null);
  };


  useEffect(() => {
    const container = servicesContainerRef.current;
    if (container) {
      container.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = servicesContainerRef.current;
    if (container) {
      const scrollAmount = 264;
      const newScrollPosition =
        direction === 'left'
          ? Math.max(0, scrollPosition - scrollAmount)
          : scrollPosition + scrollAmount;
      setScrollPosition(newScrollPosition);
      container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  const isLeftArrowDisabled = scrollPosition <= 0;
  const isRightArrowDisabled =
    programs.length < 5 || scrollPosition >= (programs.length - 4) * 264;

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50">
      {/* Navigation */}
      <header className="sticky top-0 bg-green-700 text-white shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <nav className="flex gap-6">
            {['Home', 'About', 'Service', 'Client', 'Blog', 'Contact Us'].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-yellow-400 transition"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Slider Section */}
      <section className="w-full h-[500px] relative">
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <div key={index} className="w-full h-[500px]">
              <Image
                src={img.src}
                alt={img.alt}
                width={1920}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </Slider>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center text-white">
          <h1 className="text-4xl font-bold">
            Saving Costs For Farmers
          </h1>
          <p className="mt-4 text-xl">
            Helping Farmers turn waste into feed for Poultry, Pigs, and Fish
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="#contact-us"
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded shadow hover:bg-yellow-500"
            >
              Contact Us
            </a>
            <a
              href="#services"
              className="px-6 py-3 bg-white text-green-700 font-semibold rounded shadow hover:bg-green-100"
            >
              Read More
            </a>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="about" className="container mx-auto py-12 text-center">
        <h2 className="text-3xl font-bold text-green-700">Why Choose Us</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-4xl font-bold text-yellow-500">25+</h3>
            <p>Years of Experience</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-500">250+</h3>
            <p>Happy Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-500">2+</h3>
            <p>Awards Won</p>
          </div>
        </div>
      </section>

      {/* Services Section */}

      <section id="services" className="bg-green-50 py-12">
        <div className="container mx-auto scrollbar-thin scrollbar-thumb-green-700">
          <h2 className="text-3xl font-bold text-center text-green-700">Our Services</h2>
          {loading ?
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin h-10 w-10 border-4 border-t-green-600 border-gray-300 rounded-full"></div>
          </div>
            :
            <div className="mt-8 relative">
              <div className="flex justify-center">
                <button
                  onClick={() => handleScroll('left')}
                  disabled={isLeftArrowDisabled}
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-700 text-white px-2 py-1 rounded-full z-10 ${isLeftArrowDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-800'
                    }`}
                >
                  &larr;
                </button>
                <div
                  ref={servicesContainerRef}
                  className="flex overflow-x-auto gap-8 max-w-4xl mx-auto"
                >
                  {programs.map((program) => (
                    <div
                      key={program.id}
                      className="p-6 bg-white shadow-md rounded-md hover:shadow-lg transition w-64 flex-shrink-0"
                      onClick={() => handleProgramClick(program)}
                    >
                      <h3 className="text-lg font-bold text-green-700">{program.mode}</h3>
                      <p className="mt-2 text-gray-600">
                        {program.description.split(' ').slice(0, 10).join(' ')}...
                      </p>
                      <ScrollLink
                        onClick={() => handleProgramClick(program)}
                        smooth
                        duration={500}
                        className="text-green-500 mt-4 inline-block hover:underline cursor-pointer"
                      >
                        Read More
                      </ScrollLink>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleScroll('right')}
                  disabled={isRightArrowDisabled}
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-700 text-white px-2 py-1 rounded-full z-10 ${isRightArrowDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-800'
                    }`}
                >
                  &rarr;
                </button>
              </div>
            </div>
          }
        </div>
      </section>

      {/* Program Details Popup */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-[80%] md:w-1/2">
            <h3 className="text-2xl font-bold text-green-700">{selectedProgram.mode}</h3>
            <p className="mt-4 text-gray-700">{selectedProgram.description}</p>
            <p className="mt-2">
              <span className='font-semibold'>Time Frame: </span>
              <span className='text-gray-700'>{selectedProgram.time_frame} minutes</span>
            </p>
            <p className="mt-2">
              <span className='font-semibold'>Activities: </span>
              <span className='text-gray-700'>{selectedProgram.activities}</span>
            </p>
            <p className="mt-2">
              <span className='font-semibold'>Bonus Materials: </span>
              <span className='text-gray-700'>{selectedProgram.bonus_materials}</span>
            </p>
            <p className="mt-2">
              <span className='font-semibold'>Fee: </span>
              <span className='text-gray-700'>{selectedProgram.fee}</span>
            </p>
            <button
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      <section id="contact-us" className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center text-green-700">Contact Us</h2>
        <form className="mt-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <input
              type="text"
              placeholder="Name"
              required
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="px-4 py-2 border rounded-md"
            />
            <textarea
              placeholder="Message"
              required
              className="px-4 py-2 border rounded-md"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#85a900] text-white py-2 rounded-md hover:bg-[#879d00]"
            >
              Send
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8">
        <div className="container mx-auto text-center">
          <p>© 2025 Yeka Organic Farms</p>
          <p>Phone: (+256) 778633688 | Email: yeka.abel@gmail.com</p>
        </div>
      </footer>
    </main>
  );
}
