// components/CookieConsent.jsx
import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookiesAccepted");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white p-4 z-50 flex items-center justify-between">
      <p className="text-sm">
        This site uses cookies to improve your experience. By clicking Accept, you consent to the use of cookies.
      </p>
      <button
        onClick={acceptCookies}
        className="ml-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
