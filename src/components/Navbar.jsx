import React, { useState, useEffect } from "react";
import { Menu, X, Share2, Copy } from "lucide-react";
import QRCode from "react-qr-code";
import Swal from "sweetalert2";
import WhatsappIcon from "./WhatsappIcon";

const defaultFormalText = `Dear Sir/Madam / Hiring Manager,\n\nI hope this message finds you well.\n\nMy name is Azka Mudhamatan, a Nautical Cadet from Academy Maritime Cirebon (AMC). I am pleased to present my professional portfolio, certificates of proficiency, and educational background for your consideration.\n\nOnline Portfolio:\nhttps://azkamdhmtn.vercel.app/\n\nThank you for your time and consideration.\n\nBest regards,\nAzka Mudhamatan\nNautical Cadet | Deck Department\nWhatsApp: +62 895-1985-8776`;

const createShareCardBlob = async (qrImageUrl) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const width = 800;
        const height = 1180;
        canvas.width = width;
        canvas.height = height;

        // Background Gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#061a2e');
        gradient.addColorStop(0.5, '#0b2b48');
        gradient.addColorStop(1, '#051322');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Border Accent
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, width - 40, height - 40);

        // Inner Glass Card Box
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(40, 40, width - 80, height - 80, 24);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 2;
            ctx.stroke();
        } else {
            ctx.fillRect(40, 40, width - 80, height - 80);
        }

        // Header Title
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('AZKA MUDHAMATAN', width / 2, 90);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 18px sans-serif';
        ctx.fillText('Nautical Cadet | Deck Department', width / 2, 120);

        // Divider Line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.moveTo(80, 140);
        ctx.lineTo(width - 80, 140);
        ctx.stroke();

        // Formal Message Text Lines (Word Wrap)
        const rawLines = defaultFormalText.split('\n');
        const lines = [];
        rawLines.forEach(rawLine => {
            if (rawLine.length > 48) {
                const words = rawLine.split(' ');
                let current = '';
                words.forEach(w => {
                    if ((current + ' ' + w).length > 48) {
                        lines.push(current);
                        current = w;
                    } else {
                        current = current ? current + ' ' + w : w;
                    }
                });
                if (current) lines.push(current);
            } else {
                lines.push(rawLine);
            }
        });

        let startY = 175;
        ctx.textAlign = 'left';
        lines.slice(0, 15).forEach(line => {
            if (line.startsWith("Dear") || line.startsWith("Online Portfolio:")) {
                ctx.fillStyle = '#38bdf8';
                ctx.font = 'bold 17px sans-serif';
            } else {
                ctx.fillStyle = '#e2e8f0';
                ctx.font = '16px sans-serif';
            }
            ctx.fillText(line, 80, startY);
            startY += 26;
        });

        // Load QR Code Image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const qrSize = 220;
            const qrX = (width - qrSize) / 2;
            const qrY = Math.max(startY + 15, 640);

            // White Box behind QR Code
            ctx.fillStyle = '#ffffff';
            if (ctx.roundRect) {
                ctx.beginPath();
                ctx.roundRect(qrX - 15, qrY - 15, qrSize + 30, qrSize + 30, 16);
                ctx.fill();
            } else {
                ctx.fillRect(qrX - 15, qrY - 15, qrSize + 30, qrSize + 30);
            }

            // Draw QR Code
            ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

            // Caption under QR
            ctx.fillStyle = '#94a3b8';
            ctx.font = '500 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Scan to View Online Portfolio', width / 2, qrY + qrSize + 40);

            ctx.fillStyle = '#38bdf8';
            ctx.font = '600 16px sans-serif';
            ctx.fillText('https://azkamdhmtn.vercel.app/', width / 2, qrY + qrSize + 65);

            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        };

        img.onerror = () => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        };

        img.src = qrImageUrl;
    });
};

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
                            className="flex-1 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                        >
                            <Copy className="w-5 h-5" />
                            Copy Link
                        </button>

                        <button 
                            onClick={async () => {
                                const portfolioUrl = "https://azkamdhmtn.vercel.app/";
                                const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(portfolioUrl)}`;

                                try {
                                    const cardBlob = await createShareCardBlob(qrImageUrl);
                                    const file = new File([cardBlob], 'Azka_Mudhamatan_Portfolio_QR_Card.png', { type: 'image/png' });

                                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                                        await navigator.share({
                                            files: [file],
                                        });
                                        return;
                                    }
                                } catch (err) {
                                    console.log('Web share API fallback', err);
                                }

                                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(defaultFormalText)}`;
                                window.open(whatsappUrl, '_blank');
                            }}
                            className="flex-1 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25D366]/30 active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
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
