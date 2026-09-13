import React, { useEffect, useState, useCallback } from "react";
import { AppBar, Tabs, Tab, Box } from "@mui/material";
import { Award, FileText, GraduationCap, School, Calendar } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-textMuted 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
      mx-auto
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-textMain/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

export default function Portofolio() {
  const [value, setValue] = useState(0);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllDocuments, setShowAllDocuments] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    AOS.init({
      once: false,
    });

    const handleTabChange = (e) => {
      setValue(e.detail.tab);
    };
    window.addEventListener('changeTab', handleTabChange);

    return () => {
      window.removeEventListener('changeTab', handleTabChange);
    };
  }, []);

  const dummyCertificates = [
    { id: 1, ImgSertif: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800" },
    { id: 2, ImgSertif: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800" },
    { id: 3, ImgSertif: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&q=80&w=800" },
    { id: 4, ImgSertif: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800" },
    { id: 5, ImgSertif: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800" },
    { id: 6, ImgSertif: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800" },
    { id: 7, ImgSertif: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800" },
    { id: 8, ImgSertif: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800" }
  ];

  const dummyDocuments = [
    { id: 1, ImgSertif: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800" },
    { id: 2, ImgSertif: "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=800" },
    { id: 3, ImgSertif: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800" },
    { id: 4, ImgSertif: "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=800" }
  ];

  const educationData = [
    {
      id: 1,
      level: "Diploma in Nautical Studies",
      institution: "AMC Bekasi",
      date: "Present",
      status: "Active Student",
      isCurrent: true,
    },
    {
      id: 2,
      level: "Senior High School",
      institution: "SMAN 2 Tasikmalaya",
      date: "Tasikmalaya, May 6th 2024",
      status: "Graduated",
      isCurrent: false,
    },
    {
      id: 3,
      level: "Junior High School",
      institution: "SMPN 13 Tasikmalaya",
      date: "Tasikmalaya, June 3th 2021",
      status: "Graduated",
      isCurrent: false,
    },
    {
      id: 4,
      level: "Elementary School",
      institution: "SDN Gunung Batu",
      date: "Tasikmalaya, June 8th 2018",
      status: "Graduated",
      isCurrent: false,
    }
  ];

  const toggleShowMore = useCallback((type) => {
    if (type === 'certificates') {
      setShowAllCertificates(prev => !prev);
    } else {
      setShowAllDocuments(prev => !prev);
    }
  }, []);

  const displayedCertificates = showAllCertificates ? dummyCertificates : dummyCertificates.slice(0, initialItems);
  const displayedDocuments = showAllDocuments ? dummyDocuments : dummyDocuments.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-secondary overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-primary to-textMain">
          <span style={{
            color: 'var(--color-primary)',
            backgroundImage: 'linear-gradient(45deg, var(--color-primary) 10%, var(--color-text-main) 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {value === 0 ? "Certificates Showcase" : value === 1 ? "Documents Showcase" : "Education Background"}
          </span>
        </h2>
        <p className="text-textMuted max-w-2xl mx-auto text-sm md:text-base mt-2">
          {value === 0 
            ? "Explore my certifications validations." 
            : value === 1 
            ? "Explore my professional documents validations." 
            : "Explore my academic background and educational journey."}
        </p>
      </div>

      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          bgcolor: 'transparent',
          marginBottom: '2rem'
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--color-primary)',
            },
            '& .MuiTab-root': {
              color: 'var(--color-text-muted)',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              minHeight: '64px',
              px: { xs: 2, sm: 4 },
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '8px',
            },
            '& .Mui-selected': {
              color: 'var(--color-primary) !important',
              fontWeight: 600,
            },
          }}
        >
          <Tab icon={<Award className="w-5 h-5 mb-0" />} label="Certificates" />
          <Tab icon={<FileText className="w-5 h-5 mb-0" />} label="Documents" />
          <Tab icon={<GraduationCap className="w-5 h-5 mb-0" />} label="Education" />
        </Tabs>
      </AppBar>

      <Box role="tabpanel" hidden={value !== 0}>
        {value === 0 && (
          <div className="container mx-auto flex flex-col justify-center items-center overflow-hidden pb-[5%]">
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mx-auto">
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={certificate.id || index}
                  className="w-full sm:w-[45%] lg:w-[30%] max-w-sm"
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                >
                  <Certificate ImgSertif={certificate.ImgSertif} />
                </div>
              ))}
            </div>
            {dummyCertificates.length > initialItems && (
              <div className="mt-8 w-full flex justify-center">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </div>
        )}
      </Box>

      <Box role="tabpanel" hidden={value !== 1}>
        {value === 1 && (
          <div className="container mx-auto flex flex-col justify-center items-center overflow-hidden pb-[5%]">
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mx-auto">
              {displayedDocuments.map((doc, index) => (
                <div
                  key={doc.id || index}
                  className="w-full sm:w-[45%] lg:w-[30%] max-w-sm"
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                >
                  <Certificate ImgSertif={doc.ImgSertif} />
                </div>
              ))}
            </div>
            {dummyDocuments.length > initialItems && (
              <div className="mt-8 w-full flex justify-center">
                <ToggleButton
                  onClick={() => toggleShowMore('documents')}
                  isShowingMore={showAllDocuments}
                />
              </div>
            )}
          </div>
        )}
      </Box>

      <Box role="tabpanel" hidden={value !== 2}>
        {value === 2 && (
          <div className="container mx-auto flex flex-col justify-center items-center overflow-hidden pb-[5%]">
            <div className="w-full max-w-4xl mx-auto space-y-6">
              {educationData.map((edu, index) => (
                <div
                  key={edu.id}
                  className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:border-primary/40 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
                  data-aos="fade-up"
                  data-aos-duration={800 + index * 200}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-textMain/20 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                            {edu.level}
                          </h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${edu.isCurrent ? 'bg-primary/20 text-primary border-primary/30' : 'bg-white/10 text-gray-300 border-white/10'}`}>
                            {edu.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-textMuted text-sm sm:text-base font-medium">
                          <School className="w-4 h-4 text-primary/80" />
                          <span>{edu.institution}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-1 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{edu.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
