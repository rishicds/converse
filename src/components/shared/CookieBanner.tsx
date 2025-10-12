"use client"
import { useEffect, useState } from "react";

const COOKIE_STORAGE_KEY = "converse_cookies_accepted";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!accepted) setVisible(true);
    } catch (e) {
      // If localStorage isn't available, show the banner so user can accept/learn
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, "1");
    } catch (e) {
      // ignore
    }
    setVisible(false);
  }

  function downloadPrivacyPolicy() {
    const link = document.createElement('a');
    link.href = '/pptos.docx';
    link.download = 'Privacy-Policy.docx';
    link.click();
  }

  if (!visible) return null;

  return (
    <div className="fixed left-4 right-4 bottom-6 md:left-8 md:right-8 md:bottom-8 z-50">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur border border-slate-200 rounded-lg shadow-lg p-6 md:p-8 flex items-start gap-6">
        <div className="flex-1 text-slate-800">
          <p className="text-sm md:text-base">
            This website stores cookies on your computer. These cookies are used to
            improve your website experience and provide more personalized services to you,
            both on this website and through other media. To find out more about the cookies we use,
            see our{' '}
            <button 
              onClick={downloadPrivacyPolicy}
              className="underline text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none p-0 font-inherit"
            >
              Privacy Policy
            </button>.
          </p>
        </div>

        <div className="flex-shrink-0 flex items-center">
          <button
            onClick={accept}
            className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-slate-800 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
