import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaBars, FaUser, FaUserCircle, FaSignOutAlt, FaKey } from "react-icons/fa";
import SignInModal from "@/components/modal/AuthModal";

export default function Header({ isSignedIn = false, user = null, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/booking", label: "Book Our Service" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
    { href: "/careers", label: "Careers" },
  ];

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (href) => router.asPath === href;

  const toggleDropdown = () => setIsDropdownOpen((v) => !v);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsDropdownOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  const handleLogout = async () => {
    closeDropdown();
    closeMenu();
    if (onLogout) await Promise.resolve(onLogout());
    router.push("/");
  };

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return null;
    const words = name.trim().split(/\s+/);
    if (words.length === 0 || !words[0]) return null;
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const displayName = user?.name || user?.fullname || user?.fullName || "";
  const userInitials = getInitials(displayName);

  const userButton = (
    <button
      type="button"
      className="nav__user-btn"
      onClick={toggleDropdown}
      aria-haspopup="menu"
      aria-expanded={isDropdownOpen}
      aria-label="User menu"
    >
      {user?.avatar ? (
        <Image
          src={user.avatar}
          alt={displayName || "User"}
          width={40}
          height={40}
          className="nav__user-avatar"
        />
      ) : userInitials ? (
        <span className="nav__user-initials">{userInitials}</span>
      ) : (
        <FaUser className="nav__user-icon" />
      )}
    </button>
  );

  const dropdownMenu = isDropdownOpen && (
    <div className="nav__dropdown-menu" role="menu">
      <div className="nav__dropdown-header">
        {displayName && (
          <span className="nav__dropdown-name">{displayName}</span>
        )}
        {(user?.email || user?.emailAddress) && (
          <span className="nav__dropdown-email">
            {user?.email || user?.emailAddress}
          </span>
        )}
      </div>
      <div className="nav__dropdown-divider" />
      <Link
        href="/user"
        className="nav__dropdown-item"
        role="menuitem"
        onClick={() => {
          closeDropdown();
          closeMenu();
        }}
      >
        <FaUserCircle className="nav__dropdown-icon" />
        <span>Profile</span>
      </Link>
      <Link
        href="/auth/change-password"
        className="nav__dropdown-item"
        role="menuitem"
        onClick={() => {
          closeDropdown();
          closeMenu();
        }}
      >
        <FaKey className="nav__dropdown-icon" />
        <span>Change Password</span>{" "}
      </Link>
      <button
        type="button"
        className="nav__dropdown-item nav__dropdown-item--logout"
        role="menuitem"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="nav__dropdown-icon" />
        <span>Log Out</span>
      </button>
    </div>
  );

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <div className="nav__brand">
          <Link href="/" className="nav__brand-link">
            <Image
              src="/img/teman-logo.png"
              alt="Teman Malaysia"
              className="nav__logo"
              width={125}
              height={40}
              priority
            />
          </Link>
        </div>

        <ul className={`nav__menu ${isMenuOpen ? "show" : ""}`} id="nav-menu">
          {navLinks.map((link) => (
            <li key={link.href} className="nav__item">
              <Link
                href={link.href}
                className={`nav__link ${isActive(link.href) ? "active" : ""}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          {isSignedIn ? (
            <div className="nav__user-dropdown" ref={dropdownRef}>
              {userButton}
              {dropdownMenu}
            </div>
          ) : (
            <button
              type="button"
              className="nav__signin-btn"
              onClick={() => setIsSignInOpen(true)}
              aria-haspopup="dialog"
              aria-controls="signin-modal"
              data-testid="nav-signin-btn"
            >
              <span>Sign In</span>
            </button>
          )}
          <div
            className="nav__toggle"
            id="nav-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            role="button"
          >
            <FaBars />
          </div>
        </div>
        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => setIsSignInOpen(false)}
        />
      </nav>
    </header>
  );
}
