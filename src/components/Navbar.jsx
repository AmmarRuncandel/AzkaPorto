import React, { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const [isVisible, setIsVisible] = useState(true);
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
    );
};

export default Navbar;


