import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck, Folder } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-textMain" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-2 text-textMuted max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-textMain" />
      
      <Sparkles className="w-5 h-5 text-textMain" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-[var(--color-primary)] to-textMain rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-textMain via-textMain to-textMain rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-[#3aa9b8] to-primary rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          
          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-textMain/20 via-transparent to-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          
          <img
            src="/Photo.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation, action }) => {
  const handleClick = () => {
    if (action) {
      window.dispatchEvent(new CustomEvent('changeTab', { detail: { tab: action === 'certificates' ? 0 : 1 } }));
      setTimeout(() => {
        const section = document.getElementById('Portofolio');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div data-aos={animation} data-aos-duration={1300} className={`relative group ${action ? 'cursor-pointer' : ''}`} onClick={handleClick}>
      <div className="relative z-10 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="text-sm uppercase tracking-wider text-textMuted mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-textMuted"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
  );
});

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    // Hardcoded for now since DB is removed
    const totalCertificates = 8;
    
    // Calculate Years of Study logically based on start date
    const startDate = new Date("2024-09-20");
    const today = new Date();
    let yearsOfStudy = today.getFullYear() - startDate.getFullYear();
    const monthDifference = today.getMonth() - startDate.getMonth();
    
    // If the current month is before September, or it's September but before the 20th,
    // we subtract 1 because a full year hasn't been completed yet.
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < startDate.getDate())) {
      yearsOfStudy--;
    }
    
    // If it's 0 (less than a year), we can still show 1 as the first year of study, 
    // or just leave it as is. Let's make sure it's at least 1 if they've started.
    yearsOfStudy = Math.max(1, yearsOfStudy);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: totalCertificates,
      YearExperience: yearsOfStudy
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false, 
      });
    };

    initAOS();
    
    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      icon: Award,
      color: "from-textMain to-primary",
      value: totalCertificates,
      label: "Certificate of Profeciency",
      description: "Skills validated",
      animation: "fade-up",
      action: "certificates"
    },
    {
      icon: Globe,
      color: "from-primary to-textMain",
      value: YearExperience,
      label: "Years of study",
      description: "20 September 2024",
      animation: "fade-left",
    },
    {
      icon: Folder,
      color: "from-textMain to-primary",
      value: 4,
      label: "Documents",
      description: "Important files",
      animation: "fade-up",
      action: "documents"
    },
  ], [totalCertificates, YearExperience]);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" 
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-textMain">
                Hello, I'm
              </span>
              <span 
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Azka Mudhamatan
              </span>
            </h2>
            
            <p 
              className="text-base sm:text-lg lg:text-lg text-gray-400 leading-relaxed tracking-tight pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
             My name is Azka Mudhamatan, usually called "Azka". I was born in Bandung on May 08, 2005, and I am currently 21 years old.  I am a Deck Cadet from Academy Maritime Cirebon (AMC), majoring in Nautical Studies with a focus on navigation, seamanship, and maritime regulations.  During my studies, I have gained both theoretical and practical knowledge in ship navigation, safety procedures, cargo handling, and watchkeeping duties.
            </p>

               {/* Quote Section */}
      <div 
        className="relative bg-gradient-to-br from-primary/5 via-transparent to-textMain/5 border border-gradient-to-r border-[var(--color-primary)]/30 rounded-xl p-3 my-4 backdrop-blur-md shadow-lg overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1700"
      >
        {/* Floating orbs background */}
        <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-primary/20 to-textMain/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-textMain/20 to-primary/20 rounded-full blur-lg"></div>
        
        {/* Quote icon */}
        <div className="absolute top-2 left-3 text-primary opacity-40">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        
        <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-xs md:text-sm relative z-10 pl-6 pt-0">
          " You can never cross the ocean unless you have the courage to lose sight of the shore. "
        </blockquote>
      </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a href="https://www.linkedin.com/in/azka-mudhamatan-83640a34a?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="w-full lg:w-auto">
              <button 
                data-aos="fade-up"
                data-aos-duration="800"
                className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-primary to-textMain text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl "
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> My CV
              </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
              <button 
                data-aos="fade-up"
                data-aos-duration="1000"
                className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[var(--color-text-main)]/50 text-textMain font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-textMain/10 "
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Certificates
              </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);

