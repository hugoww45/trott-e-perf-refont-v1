"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Settings } from "lucide-react";

// Toggle switch component
function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none w-full">
      <div className="flex-1">
        <span className="text-sm md:text-base font-medium text-neutral-700 dark:text-neutral-200">{label}</span>
      </div>
      <span className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <span
          className={`absolute left-0 top-0 w-12 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-blue-600" : "bg-neutral-300 dark:bg-neutral-700"}`}
        />
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-6" : ""}`}
        />
      </span>
    </label>
  );
}

const COOKIE_KEY = "cookie_consent_v2";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [audience, setAudience] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem(COOKIE_KEY);
      if (!consent) {
        setTimeout(() => setVisible(true), 600);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ audience: true, marketing: true }));
    setVisible(false);
  };
  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ audience: false, marketing: false }));
    setVisible(false);
  };
  const handleSave = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ audience, marketing }));
    setVisible(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 w-full z-[100]"
        >
          <div className="w-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border-t border-neutral-200 dark:border-neutral-800 shadow-md px-3 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex-1 text-sm font-medium text-neutral-800 dark:text-neutral-200 text-center sm:text-left">
              Nous utilisons des cookies pour améliorer votre expérience utilisateur. <Link href="/legal/cookies" className="underline hover:text-blue-600 dark:hover:text-blue-400">En savoir plus</Link>
            </div>
            <div className="flex w-full sm:w-auto justify-between sm:justify-normal flex-row gap-2 sm:gap-3 items-center">
              <button
                onClick={() => setShowSettings((v) => !v)}
                className="flex items-center justify-center w-1/3 sm:w-auto text-xs sm:text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-2 sm:px-3 py-1.5 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                aria-label="Paramètres des cookies"
              >
                <Settings className="w-4 h-4 sm:mr-1.5 md:mr-2" />
                <span className="hidden sm:inline">Paramètres</span>
              </button>
              <button
                onClick={handleReject}
                className="w-1/3 sm:w-auto text-xs sm:text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 px-2 sm:px-3 py-1.5 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="w-1/3 sm:w-auto text-xs sm:text-sm rounded-md bg-blue-600 text-white px-2 sm:px-3 py-1.5 font-medium shadow hover:bg-blue-700 transition"
              >
                Accepter
              </button>
            </div>
          </div>

          {/* Panneau des paramètres */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-14 md:bottom-16 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[90%] lg:w-[550px] max-w-2xl md:mx-auto bg-white dark:bg-neutral-900 border-t md:border border-neutral-200 dark:border-neutral-800 md:rounded-xl shadow-xl p-4 md:p-6 z-[101]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">Préférences cookies</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="md:hidden rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>

                <div className="space-y-5 mb-6">
                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                    <Toggle
                      checked={audience}
                      onChange={() => setAudience((v) => !v)}
                      label="Cookies de mesure d'audience"
                    />
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 ml-0">
                      Ces cookies nous permettent d'analyser l'utilisation du site pour améliorer l'expérience utilisateur.
                    </p>
                  </div>

                  <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                    <Toggle
                      checked={marketing}
                      onChange={() => setMarketing((v) => !v)}
                      label="Cookies marketing"
                    />
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 ml-0">
                      Ces cookies sont utilisés pour afficher des publicités personnalisées selon vos centres d'intérêt.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-4">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="hidden md:block rounded-md border border-neutral-300 dark:border-neutral-600 bg-white/80 dark:bg-neutral-800/80 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-blue-700 transition w-full md:w-auto"
                  >
                    Enregistrer mes préférences
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
