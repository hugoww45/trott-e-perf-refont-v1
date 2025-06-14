"use client";

export default function ResetIntroButton() {
  const resetIntro = () => {
    // Delete the cookie
    document.cookie = "seenIntro=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    // Reload the page
    window.location.reload();
  };

  return (
    <button
      onClick={resetIntro}
      className="fixed bottom-4 right-4 z-[9998] px-3 py-2 bg-red-600 text-white text-sm rounded opacity-50 hover:opacity-100 transition-opacity"
      title="Reset intro (dev only)"
    >
      Reset Intro
    </button>
  );
}
