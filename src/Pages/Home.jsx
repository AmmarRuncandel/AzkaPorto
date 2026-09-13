import React, { useState, useEffect, useCallback, memo } from "react"
import { Send, Linkedin, Mail, ExternalLink, Instagram, Anchor } from "lucide-react"
import WhatsappIcon from "../components/WhatsappIcon"
// Using Lottie Web Component (no npm install) with local assets in /public
import AOS from 'aos'
import 'aos/dist/aos.css'
import ProfileCard from '../components/ProfileCard';

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-textMain rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-primary to-textMain text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Anchor className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-[#3aa9b8]" />
          Nautica Student
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-1 sm:space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
      <span className="relative block">
        <span className="absolute -inset-2 bg-gradient-to-r from-primary to-textMain blur-2xl opacity-20"></span>
        <span className="relative text-white font-extrabold drop-shadow-sm">
          Hi, Im
        </span>
      </span>
      <span className="relative block mt-1 sm:mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-primary to-textMain blur-2xl opacity-20"></span>
        <span className="relative text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-primary via-[#38bdf8] to-textMain bg-clip-text text-transparent leading-tight block">
          Azka Mudhamatan
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-textMuted hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-textMain rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-secondary backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-primary/20 to-textMain/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-textMain rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-textMuted group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Nautical Student ", "Academy Maritime Cirebon"];
const TECH_STACK = ["STCW Certified", "Aspiring Deck Kadet", "Navigation, Maritime Safety & Opreration"];
const SOCIAL_LINKS = [
  { icon: WhatsappIcon, link: "https://wa.me/6289519858776" },
  { icon: Send, link: "https://t.me/+6289519858776" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/azka-mudhamatan-83640a34a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { icon: Instagram, link: "https://www.instagram.com/azkamdhmtn?igsh=MThmanZ3YWhsN21jaQ==" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // We use the Lottie web component <lottie-player src="/Coding.json"> in the render below.

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Will render local GIF from public/Coding.gif as the animation

  return (
    <div className="min-h-screen bg-secondary overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] " id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto  min-h-screen ">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen pt-32 sm:pt-36 lg:pt-28 md:justify-between gap-4 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-[#d7deda] bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-primary to-textMain ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-textMuted max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  As I continue my maritime education, I am seeking opportunities for sea training, internships, and professional experiences where I can apply my skills, gain valuable onboard experience, and grow into a competent Deck Officer.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="COP" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Profile Card */}
            <div className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              data-aos="fade-left"
              data-aos-delay="600">
              <div className="relative w-full flex justify-center max-w-[400px]">
                <ProfileCard
                  avatarUrl="/Photo.jpg"
                  showUserInfo={false}
                  name=""
                  title=""
                  enableTilt={true}
                  enableMobileTilt={false}
                  iconUrl="/anchor.svg"
                  behindGlowEnabled={false}
                  innerGradient="linear-gradient(145deg,rgba(6, 47, 52, 0.8) 0%,rgba(8, 131, 149, 0.4) 100%)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);


