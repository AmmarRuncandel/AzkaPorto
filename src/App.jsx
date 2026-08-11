import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import QRCode from "react-qr-code";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import NotFoundPage from "./Pages/404";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <footer className="pb-8">
            <center>
              <hr className="my-3 border-[var(--color-text-muted)] opacity-15 sm:mx-auto lg:my-6 text-center" />
              <div className="flex flex-col items-center justify-center mb-6 mt-4">
                <p className="text-sm text-textMuted mb-3">Scan to Share Portfolio</p>
                <div className="bg-white p-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                  <QRCode 
                      value="https://azkamdhmtn.vercel.app/" 
                      size={100}
                      level="H"
                  />
                </div>
              </div>
              <span className="block text-sm pb-4 text-[#93aaa8] text-center dark:text-textMuted">
                © 2026{" "}
                <a href="https://flowbite.com/" className="hover:underline">
                  Azka™
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Ini route 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

