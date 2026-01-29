import Footer from "../navigations/Footer";
import Header from "../navigations/Header";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MainLayout({ children }) {
  const router = useRouter();

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

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
