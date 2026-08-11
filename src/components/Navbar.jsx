import React, { useState, useEffect } from "react";
import { Menu, X, Code2, Share2, Copy } from "lucide-react";
import QRCode from "react-qr-code";
import Swal from "sweetalert2";
import WhatsappIcon from "./WhatsappIcon";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const [isVisible, setIsVisible] = useState(true);
    const [showQR, setShowQR] = useState(false);
    const lastScrollY = React.useRef(0);
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portofolio" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            
            if (currentPosition > lastScrollY.current && currentPosition > 50) {
                setIsVisible(false);
                setIsOpen(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = currentPosition;

            setScrolled(currentPosition > 20);
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 550,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const active = sections.find(section => 
                currentPosition >= section.offset && 
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <>
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out w-[95%] sm:w-[90%] max-w-5xl border border-white/10 backdrop-blur-md bg-transparent ${
                isOpen ? "rounded-2xl" : "rounded-full"
            } ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0 pointer-events-none"
            }`}
        >
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12 sm:h-14">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-base sm:text-lg font-medium text-white"
                        >
                            Azka Mudhamatan
                        </a>
                    </div>
        
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.slice(0, 3).map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`text-sm font-medium transition-colors duration-300 ${
                                    activeSection === item.href.substring(1)
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {item.label}
                            </a>
                        ))}
                        {/* Share QR Button */}
                        <button
                            onClick={() => setShowQR(true)}
                            className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
                            aria-label="Share Portfolio"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                        
                        {/* Sign up / Contact button */}
                        <a
                            href="#Contact"
                            onClick={(e) => scrollToSection(e, "#Contact")}
                            className="px-5 py-2 text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-colors duration-300"
                        >
                            Contact
                        </a>
                    </div>
        
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-gray-400 hover:text-white transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        
            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                        ? "max-h-[400px] opacity-100 mb-4"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 py-2 space-y-2 flex flex-col items-center">
                    {navItems.slice(0, 3).map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`block px-4 py-2 text-base font-medium transition-all duration-500 ease-out ${
                                activeSection === item.href.substring(1)
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                            }`}
                            style={{
                                transitionDelay: `${isOpen ? index * 75 : 0}ms`,
                                transform: isOpen ? "translateY(0)" : "translateY(-15px)",
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                    {/* Mobile Share Button */}
                    <button
                        onClick={() => { setShowQR(true); setIsOpen(false); }}
                        className="mt-2 px-6 py-2 w-[80%] text-center text-sm font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-500 ease-out flex items-center justify-center gap-2"
                        style={{
                            transitionDelay: `${isOpen ? 150 : 0}ms`,
                            transform: isOpen ? "translateY(0)" : "translateY(-15px)",
                            opacity: isOpen ? 1 : 0,
                        }}
                    >
                        <Share2 className="w-4 h-4" /> Share QR
                    </button>
                    {/* Mobile Contact Button */}
                    <a
                        href="#Contact"
                        onClick={(e) => scrollToSection(e, "#Contact")}
                        className="mt-4 px-6 py-2 w-[80%] text-center text-sm font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-500 ease-out"
                        style={{
                            transitionDelay: `${isOpen ? 225 : 0}ms`,
                            transform: isOpen ? "translateY(0)" : "translateY(-15px)",
                            opacity: isOpen ? 1 : 0,
                        }}
                    >
                        Contact
                    </a>
                </div>
            </div>
        </nav>

        {/* QR Code Modal */}
        {showQR && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={() => setShowQR(false)}>
                <div 
                    className="bg-[#133458] border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl relative flex flex-col items-center animate-in fade-in zoom-in duration-300 max-w-sm w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setShowQR(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                    <h3 className="text-xl font-bold text-white mb-2 text-center">Share Portfolio</h3>
                    <p className="text-sm text-gray-400 mb-6 text-center">Scan this QR code to visit my portfolio on any device.</p>
                    
                    <div className="bg-white p-4 rounded-xl shadow-inner mb-6">
                        <QRCode 
                            value="https://azkamdhmtn.vercel.app/" 
                            size={200}
                            level="H"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText("https://azkamdhmtn.vercel.app/");
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Link Tersalin!',
                                    text: 'Link portofolio berhasil disalin ke clipboard.',
                                    background: '#133458',
                                    color: '#F8FAFC',
                                    confirmButtonColor: '#38BDF8',
                                    timer: 2000,
                                    showConfirmButton: false,
                                    customClass: {
                                        popup: 'rounded-2xl border border-white/10 shadow-2xl',
                                    }
                                });
                            }}
                            className="flex-1 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Copy className="w-5 h-5" />
                            Copy Link
                        </button>

                        <button 
                            onClick={() => {
                                const text = "Halo! 👋 Aku mau merekomendasikan Portofolio milik Azka Mudhamatan. Desainnya keren banget!\n\nLangsung cek aja webnya di sini ya: https://azkamdhmtn.vercel.app/\n\nAtau kamu juga bisa scan QR Code yang ada di webnya. Yuk dilihat!";
                                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                                window.open(whatsappUrl, '_blank');
                            }}
                            className="flex-1 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25D366]/30 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <WhatsappIcon className="w-5 h-5" />
                            WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Navbar;


