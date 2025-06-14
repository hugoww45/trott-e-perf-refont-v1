"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

interface IntroGateProps {
  children: React.ReactNode;
}

export default function IntroGate({ children }: IntroGateProps) {
  const [showIntro, setShowIntro] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [hasBeenHovered, setHasBeenHovered] = useState(false);

  useEffect(() => {
    // Check if user has seen intro before
    const hasSeenIntro = document.cookie.includes("seenIntro=true");

    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleAccessSite = async () => {
    setIsAnimating(true);

    // Start fade out effect
    setFadeOut(true);

    // Wait a bit then launch confetti (reduced timing)
    setTimeout(() => {
      launchConfetti();
    }, 500);

        // Hide intro after animations (reduced from 3000ms to 1800ms)
    setTimeout(() => {
      // Set cookie for 1 year
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      document.cookie = `seenIntro=true; expires=${expiryDate.toUTCString()}; path=/`;

      setShowIntro(false);
    }, 1800);
  };

    const launchConfetti = () => {
    const colors = ['#C0C0C0', '#D3D3D3', '#ECECEC', '#A9A9A9'];

    // Main burst from center
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors
    });

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 25,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });

      confetti({
        particleCount: 25,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });
    }, 250);

    // Final burst
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { y: 0.5 },
        colors: colors
      });
    }, 500);
  };

  if (!showIntro) {
    return <>{children}</>;
  }

  return (
    <div className={`fixed inset-0 z-[9999] transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-[#0a0a0a] overflow-hidden relative">
        {/* Background effects - same as coming-soon */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <div className="absolute -top-1/3 right-0 w-2/3 h-2/3 rounded-full bg-[#e0e0e0]/10 blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-full bg-[#a0a0a0]/10 blur-[150px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMDEwMTAiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDBjMTYuNTY5IDAgMzAgMTMuNDMxIDMwIDMweiIgc3Ryb2tlPSIjMjAyMDIwIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-5" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/20 to-[#0a0a0a]/60"></div>

        {/* Logo */}
        <div className="z-10 mb-16">
          <Image src="/logo_couleur.svg" alt="Logo" width={200} height={200} priority />
        </div>

        <div className="z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-10">
          {/* Main title */}
          <h1 className="text-4xl md:text-7xl font-medium tracking-tight silver-gradient opacity-100" style={{ transition: 'opacity 1.2s ease-out' }}>
            Le futur<br />est à votre disposition
          </h1>

          {/* Subtitle */}
          <div className="w-full md:w-3/5 mx-auto">
            <p className="text-xl md:text-2xl text-[#a0a0a0] font-light tracking-wide opacity-100" style={{ transition: 'opacity 1.2s ease-out 0.3s' }}>
              Il ne vous reste qu’à appuyer.
            </p>
          </div>

          {/* Access button with rocket effect */}
          <div className="mt-10">
            <button
              onClick={handleAccessSite}
              onMouseEnter={() => setHasBeenHovered(true)}
              disabled={isAnimating}
              className={`rocket-button ${hasBeenHovered ? 'hover-completed' : ''} px-8 py-4 text-lg font-medium text-white bg-transparent border-2 border-[#a0a0a0] rounded-2xl transition-all duration-300 hover:border-[#e0e0e0] hover:bg-[#e0e0e0]/10 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="rocket-text">🚀 Entrer dans l’expérience</span>
            </button>
          </div>

          {/* Note */}
          <p className="text-base text-[#e0e0e0] font-light mt-5 opacity-100" style={{ transition: 'opacity 1.2s ease-out 0.8s' }}>
            Ce n&apos;est pas juste un site. C&apos;est une expérience.
          </p>

          {/* Decorative line */}
          <div className="w-20 h-[1px] bg-[#a0a0a0]/20 mt-5" />
        </div>

        {/* Footer */}
        <footer className="absolute bottom-6 w-full text-center">
          <p className="text-[#707070] text-sm">&copy; {new Date().getFullYear()} • Trott e Perf</p>
        </footer>
      </main>

      {/* Fade overlay for transition - faster */}
      {fadeOut && (
        <div className="fixed inset-0 bg-black z-[10000] opacity-0 animate-fade-in-fast" />
      )}
    </div>
  );
}
