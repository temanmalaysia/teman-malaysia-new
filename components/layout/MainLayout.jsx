import Footer from "../navigations/Footer";
import Header from "../navigations/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/api/apiClient";

export default function MainLayout({ children }) {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const updateFromAuth = () => {
    const loggedIn = apiClient.auth.isLoggedIn();
    const currentUser = apiClient.auth.getUser();
    setIsSignedIn(loggedIn);
    setUser(currentUser);
  };

  useEffect(() => {
    const onAuth = () => updateFromAuth();
    const onStorage = (e) => {
      if (!e || !e.key || e.key.startsWith("tm_")) updateFromAuth();
    };
    window.addEventListener("tm:auth", onAuth);
    window.addEventListener("storage", onStorage);
    // Initial client-side auth state sync after mount to avoid hydration mismatch.
    setTimeout(() => {
      updateFromAuth();
      try {
        if (apiClient.auth.isLoggedIn()) {
          apiClient.auth.me().catch(() => {});
        }
      } catch {}
    }, 0);
    return () => {
      window.removeEventListener("tm:auth", onAuth);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [router.asPath]);

  const handleLogout = () => {
    apiClient.auth.logout();
    updateFromAuth();
    if (router.pathname.startsWith("/user")) {
      router.push("/");
    }
  };

  return (
    <div className="app-shell">
      <Header isSignedIn={isSignedIn} user={user} onLogout={handleLogout} />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}
