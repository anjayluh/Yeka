

'use client';

import { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import Image from 'next/image';
import Slider from 'react-slick';
import { Link as ScrollLink } from 'react-scroll';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionHeader from '@/components/SectionHeader';
import { Inter } from 'next/font/google'
import { PiPlantFill } from "react-icons/pi";
import RandomIcon from '@/components/shared/RandomIcon';
import ImageCard from '@/components/shared/ImageCard';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

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
  const [programsLoading, setProgramsLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const [serviceScrollPosition, setServiceScrollPosition] = useState(0);
  const servicesContainerRef = useRef<HTMLDivElement>(null);
  const [blogScrollPosition, setBlogScrollPosition] = useState(0);
  const blogContainerRef = useRef<HTMLDivElement>(null);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    experience: 0,
    customers: 0,
    awards: 0,
  });

  const [blogs, setBlogs] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const shopLink = 'https://yeka-organic-farms.vendblue.store/'

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

  const targetNumbers = {
    experience: 25,
    customers: 250,
    awards: 2,
  };


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

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
        setProgramsLoading(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Blogs'));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setBlogsLoading(false);
      }
    };

    fetchTrainingPrograms();
    fetchBlogs();
  }, []);


  const handleProgramClick = (program: any) => {
    setSelectedProgram(program);
  };

  const handleBlogClick = (blog: any) => {
    setSelectedProgram(blog);
  };

  const handleClosePopup = () => {
    setSelectedProgram(null);
  };


  useEffect(() => {
    const container = servicesContainerRef.current;
    if (container) {
      container.scrollLeft = serviceScrollPosition;
    }
  }, [serviceScrollPosition]);

  useEffect(() => {
    const container = blogContainerRef.current;
    if (container) {
      container.scrollLeft = blogScrollPosition;
    }
  }, [blogScrollPosition]);

  const handleProgramScroll = (direction: 'left' | 'right') => {
    const container = servicesContainerRef.current;
    if (container) {
      const scrollAmount = 264;
      const newScrollPosition =
        direction === 'left'
          ? Math.max(0, serviceScrollPosition - scrollAmount)
          : serviceScrollPosition + scrollAmount;
      setServiceScrollPosition(newScrollPosition);
      container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  const handleBlogScroll = (direction: 'left' | 'right') => {
    const container = blogContainerRef.current;
    if (container) {
      const scrollAmount = 264;
      const newScrollPosition =
        direction === 'left'
          ? Math.max(0, blogScrollPosition - scrollAmount)
          : blogScrollPosition + scrollAmount;
      setServiceScrollPosition(newScrollPosition);
      container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const animateValue = (key: keyof typeof targetNumbers, duration = 2000) => {
      const start = 0;
      const end = targetNumbers[key];
      const startTime = performance.now();

      const updateNumber = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = Math.min(elapsedTime / duration, 1);
          setAnimatedNumbers((prev) => ({
            ...prev,
            [key]: Math.floor(progress * (end - start) + start),
          }));
          requestAnimationFrame(updateNumber);
        } else {
          setAnimatedNumbers((prev) => ({
            ...prev,
            [key]: end,
          }));
        }
      };

      requestAnimationFrame(updateNumber);
    };

    Object.keys(targetNumbers).forEach((key) => {
      animateValue(key as keyof typeof targetNumbers);
    });
  }, []);

  const isServiceLeftArrowDisabled = serviceScrollPosition <= 0;
  const isServiceRightArrowDisabled =
    programs.length < 5 || serviceScrollPosition >= (programs.length - 4) * 264;

  const isBlogLeftArrowDisabled = blogScrollPosition <= 0;
  const isBlogRightArrowDisabled =
    programs.length < 5 || blogScrollPosition >= (programs.length - 4) * 264;

  return (
    <main className="min-h-screen w-full w-100 bg-gradient-to-b from-green-100 via-white to-green-50 home-page">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 w-full z-50 text-white text-2xl transition-all duration-300 ${isScrolled ? "bg-green-700 shadow-md" : "bg-transparent"
          }`}
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
          <nav className={`lg:flex gap-6 ${isMenuOpen ? 'left-0 flex flex-col absolute top-20 bg-green-700 w-full py-6' : 'hidden lg:flex'}`}>
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

      {/* Slider Section */}
      <section id='about' className="w-screen h-[900px]  relative overflow-x-hidden">
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <div key={index} className="relative w-screen h-[900px]">
              <Image
                src={img.src}
                alt={img.alt}
                layout="fill" /* Ensures it covers the div */
                objectFit="cover" /* Maintains aspect ratio and covers the area */
                className="w-full h-full"
              />
            </div>
          ))}
        </Slider>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-center text-white">
          <h1 className="text-5xl  md:text-7xl font-bold my-5">
            Saving Costs For Farmers
          </h1>
          <p className="mt-4 text-xl  md:text-3xl my-5">
            Helping Farmers turn waste into feed for Poultry, Pigs, and Fish
          </p>
          <div className="mt-9 flex gap-4">
            <a
              href="#contact-us"
              className="px-6 py-3 bg-yellow-500 text-black text-xl font-semibold rounded shadow hover:bg-yellow-900"
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
      <section id="about" className="container mx-auto py-12 text-center my-9">
        <SectionHeader title={'Why Choose Us'} />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-3xl font-bold text-yellow-500">{animatedNumbers.experience}+</h3>
            <p className="my-3">Years of Experience</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-500">{animatedNumbers.customers}+</h3>
            <p className='my-3'>Happy Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-yellow-500">{animatedNumbers.awards}+</h3>
            <p className='my-3'>Awards Won</p>
          </div>
        </div>
      </section>

      {/* Services Section */}

      <section id="services" className="bg-green-50 py-12">
        <div className="container mx-auto scrollbar-thin scrollbar-thumb-green-700">
          <SectionHeader title={'Our Services'} />
          {programsLoading ?
            <div className="flex justify-center items-center py-12 ">
              <div className="animate-spin h-10 w-10 border-4 border-t-green-600 border-gray-300 rounded-full"></div>
            </div>
            :
            <div className="mt-8 relative mx-2">
              <div className="flex justify-center">
                <button
                  onClick={() => handleProgramScroll('left')}
                  disabled={isServiceLeftArrowDisabled}
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-700 text-white px-2 py-1 rounded-full z-10 ${isServiceLeftArrowDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-800'
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
                      <RandomIcon size={30} />
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
                  onClick={() => handleProgramScroll('right')}
                  disabled={isServiceRightArrowDisabled}
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-700 text-white px-2 py-1 rounded-full z-10 ${isServiceRightArrowDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-800'
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

      {/* Blogs Section */}
      <section id="blogs" className="bg-green-100 py-12">
        <SectionHeader title={'Blog Posts'} />
        <div className="container mx-auto mb-2 mx-3">


          {blogsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin h-10 w-10 border-4 border-t-green-600 border-gray-300 rounded-full"></div>
            </div>
          ) : (
            <div className="relative mt-8">
              <div className="flex justify-center">
                <button
                  onClick={() => handleBlogScroll('left')}
                  disabled={isBlogLeftArrowDisabled}
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-700 text-white px-2 py-1 rounded-full z-10 ${isBlogLeftArrowDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-800'}`}
                >
                  &larr;
                </button>
                <div
                  ref={blogContainerRef}
                  className="flex overflow-x-auto gap-8 max-w-4xl mx-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-green-200"
                >

                  {blogs.length != 0 ? blogs.map((blog) => (

                    <ImageCard key={blog.id}
                      title={blog.title} link={blog.link} />

                  )) : <h1 className='text-center'>No Blogs Published Yet. Coming soon.</h1>}
                </div>
                <button
                  onClick={() => handleBlogScroll('right')}
                  disabled={isBlogRightArrowDisabled}
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-700 text-white px-2 py-1 rounded-full z-10 ${isBlogRightArrowDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-800'}`}
                >
                  &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-us" className="container mx-auto py-12">
        <SectionHeader title={'Contact Us'} />
        <form className="mt-8 max-w-2xl mx-auto">
          <div className="grid mx-8 grid-cols-1 gap-6">
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
