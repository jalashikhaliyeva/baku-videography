import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Container from "../Container";
import NavigationButton from "../NavigationButton";
import { montserrat } from "../../lib/fonts";

const navLinks = [
  "Ana səhifə",
  // "Portfolio",
  "Xidmətlər",
  "İşlərimiz",
  "Portfolio",
  "Blog",
];

// Define route mapping for each nav item
const routeMapping = {
  "Ana səhifə": "/",
  Portfolio: "/portfolio",
  "Xidmətlər": "/xidmetler",
  "İşlərimiz": "/portfolio",
  Blog: "/blog",
};

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle navigation clicks
  const handleNavClick = (item) => {
    if (item === "İşlərimiz") {
      // If you're on the homepage, scroll to the Projects section
      if (router.pathname === "/") {
        const element = document.getElementById("projects");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If not on the homepage, navigate to the homepage with a hash
        router.push("/#projects");
      }
      setMenuOpen(false);
      return;
    }
  
    // For other navigation items, use the existing mapping logic
    const route = routeMapping[item] || "/";
    router.push(route);
    setMenuOpen(false);
  };
  
  return (
    <>
      {/* Fixed header wrapper with dynamic box shadow */}
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b bg-white border-borderColor transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <Container>
          {/* Main Header Bar */}
          <div className="flex items-center justify-between gap-8 pt-5 pb-5">
            {/* Logo on the left */}
            <div onClick={() => router.push(`/`)} className="cursor-pointer">
              <Image
                src="/images/logo/123.png"
                width={65}
                height={42}
                alt="logo"
              />
            </div>

            {/* Desktop Navigation (>=869px using custom breakpoint) */}
            <nav className="hidden custom:block">
              <ul
                className={`${montserrat.className} flex gap-8 text-base font-bold`}
              >
                {navLinks.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleNavClick(item)}
                    className="relative group cursor-pointer"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 block h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Contact Button (>=869px using custom breakpoint) */}
            <div className="hidden custom:block">
              <NavigationButton onClick={() => router.push("/elaqe")}>
                Mənimlə əlaqə
              </NavigationButton>
            </div>

            {/* Mobile: Contact Button & Menu Toggle (<869px using custom breakpoint) */}
            <div className="custom:hidden flex items-center gap-4">
              <NavigationButton
                className="px-2 py-1 text-sm"
                onClick={() => router.push("/elaqe")}
              >
                Mənimlə əlaqə
              </NavigationButton>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
                className="focus:outline-none"
              >
                {menuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Navigation Menu - Full Screen Overlay (<869px using custom breakpoint) */}
      <div
        className={`custom:hidden fixed inset-0 z-50 transition-all duration-300 bg-white ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Mobile Menu Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-4">
          {/* Logo on the left */}
          <div onClick={() => router.push(`/`)} className="cursor-pointer">
            <Image
              src="/images/logo/123.png"
              width={65}
              height={42}
              alt="logo"
            />
          </div>
          {/* Close button on the right */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="mt-4">
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavClick(item)}
                className={`${montserrat.className} px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors text-xl`}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
