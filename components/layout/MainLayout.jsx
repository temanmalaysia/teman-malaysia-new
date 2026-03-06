import Footer from "../navigations/Footer";
import Header from "../navigations/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiClient from "@/api/apiClient";

export default function MainLayout({ children }) {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const refreshAuth = () => {
    const loggedIn = apiClient.auth.isLoggedIn();
    const currentUser = apiClient.auth.getUser();
    setIsSignedIn(loggedIn);
    setUser(currentUser);
  };

  useEffect(() => {
    refreshAuth();
    const onAuth = () => refreshAuth();
    const onStorage = (e) => {
      if (!e || !e.key || e.key.startsWith("tm_")) refreshAuth();
    };
    window.addEventListener("tm:auth", onAuth);
    window.addEventListener("storage", onStorage);
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
    refreshAuth();
    if (router.pathname.startsWith("/user")) {
      router.push("/");
    }
  };

  return (
    <>
      <Header isSignedIn={isSignedIn} user={user} onLogout={handleLogout} />
      {children}
      <Footer />
    </>
  );
}
