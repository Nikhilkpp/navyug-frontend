import { useEffect, useState } from "react";

const CookieWarning = () => {
  const [cookiesBlocked, setCookiesBlocked] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    try {
      document.cookie = "test_cookie=test; path=/";
      const cookiesEnabled = document.cookie.indexOf("test_cookie=") !== -1;
      setCookiesBlocked(!cookiesEnabled);
    } catch (e) {
      setCookiesBlocked(true);
    }
  }, []);

  if (!cookiesBlocked || accepted) return null;

  // Automatically constructs Chrome settings link for the current site
  const chromeSettingsUrl = `chrome://settings/content/cookies?search=cookies`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#ffc107",
        padding: "1rem",
        textAlign: "center",
        zIndex: 1000,
        height:"50%"
      }}
    >
      <p style={{ margin: 0 }}>
        ⚠️ Cookies are blocked in your browser. Please enable them in settings
        for login to work.
      </p>
      <a
        href={chromeSettingsUrl}
        style={{
          color: "#0056b3",
          textDecoration: "underline",
          display: "block",
          marginTop: "0.5rem",
        }}
        target="_blank"
        rel="noreferrer"
      >
        Open Chrome cookie settings
      </a>
      <button
        onClick={() => setAccepted(true)}
        style={{
          marginTop: "0.5rem",
          padding: "0.4rem 1rem",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        I Understand
      </button>
    </div>
  );
};

export default CookieWarning;
