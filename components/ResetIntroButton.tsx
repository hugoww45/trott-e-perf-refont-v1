"use client";

export default function ResetIntroButton() {
  const resetIntro = () => {
    // Delete the cookie
    document.cookie = "seenIntro=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    // Reload the page
    window.location.reload();
  };

  return (
  <></>
  );
}
