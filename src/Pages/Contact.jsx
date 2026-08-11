import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Mengirim Pesan...',
      html: 'Harap tunggu selagi kami mengirim pesan Anda',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: '#133458',
      color: '#F8FAFC',
      backdrop: 'rgba(0,0,0,0.6)',
      customClass: {
        popup: 'rounded-2xl border border-white/10 shadow-2xl',
      }
    });

    try {
      const formSubmitUrl = 'https://formsubmit.co/ajax/mudhamatanazka@gmail.com';
      
      const response = await fetch(formSubmitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'Pesan Baru dari Website Portfolio',
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (data.success === 'true' || response.ok) {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pesan Anda telah berhasil terkirim!',
          icon: 'success',
          background: '#133458',
          color: '#F8FAFC',
          iconColor: '#38BDF8',
          confirmButtonColor: '#38BDF8',
          confirmButtonText: 'Tutup',
          backdrop: 'rgba(0,0,0,0.6)',
          customClass: {
            popup: 'rounded-2xl border border-white/10 shadow-2xl',
          },
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error('Gagal mengirim pesan');
      }

    } catch (error) {
      Swal.fire({
        title: 'Gagal!',
        text: 'Terjadi kesalahan. Silakan coba lagi nanti.',
        icon: 'error',
        background: '#133458',
        color: '#F8FAFC',
        iconColor: '#EF4444',
        confirmButtonColor: '#38BDF8',
        confirmButtonText: 'Tutup',
        backdrop: 'rgba(0,0,0,0.6)',
        customClass: {
          popup: 'rounded-2xl border border-white/10 shadow-2xl',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%] " >
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-primary to-textMain"
        >
          <span
            style={{
              color: 'var(--color-primary)',
              backgroundImage:
                "linear-gradient(45deg, var(--color-primary) 10%, var(--color-text-main) 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-textMuted max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          If you have any questions, please send me a message, and I will reply as soon as possible.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%]  md:px-0"
        id="Contact"
      >
        <div className="container mx-auto px-[1%] grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full max-w-7xl" >
          {/* Bagian Kiri: Form Kontak */}
          <div
            className="w-full bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-500 hover:shadow-primary/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary to-textMain">
                  Contact
                </h2>
                <p className="text-textMuted">
                  Is there anything you want to discuss? send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-primary opacity-50" />
            </div>

            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-textMuted group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-[#93aaa8] text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all duration-300 hover:border-[var(--color-primary)]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-textMuted group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-[#93aaa8] text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all duration-300 hover:border-[var(--color-primary)]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-textMuted group-focus-within:text-primary transition-colors" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-[#93aaa8] text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all duration-300 hover:border-[var(--color-primary)]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-textMain text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>

          </div>

          {/* Bagian Kanan: Social Links */}
          <div className="w-full">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

