import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { montserrat } from "@/lib/fonts";
import NavigationButton from "../NavigationButton";
import Image from "next/image";
import Container from "../Container";
import ContactFooter from "../ContactFooter";
import { spaceGrotesk } from "@/lib/fonts";

function Footer({ data }) {
  const router = useRouter();
  const navLinks = [
    "Ana səhifə",
    "Portfolio",
    "Xidmətlər",
    "İşlərimiz",
    "Blog",
  ];

  // Define mapping between nav link text and route paths
  const navRoutes = {
    "Ana səhifə": "/",
    Portfolio: "/portfolio",
    İşlərimiz: "/islerimiz", // fallback route if needed
    Xidmətlər: "/xidmetler",
    Blog: "/blog",
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item) => {
    if (item === "İşlərimiz") {
      // If already on the homepage, scroll directly
      if (router.pathname === "/") {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to the homepage first, then scroll to the projects section
        router.push("/").then(() => {
          // Give a short delay for the component to mount
          setTimeout(() => {
            const projectsSection = document.getElementById("projects");
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        });
      }
    } else {
      router.push(navRoutes[item]);
    }
  };

  return (
    <Container>
      <div className="bg-borderColor rounded-t-3xl mt-16 px-4 py-8 md:px-12 md:py-12 lg:px-20 lg:py-16">
        {/* Top section: Logo, Nav Links, Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white pb-4">
          <div className="cursor-pointer">
            <Image
              src={data.main.image}
              width={65}
              height={42}
              className="w-11  object-contain"
              alt="logo"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          <nav>
            <ul
              className={`${montserrat.className} text-white flex flex-col md:flex-row flex-wrap gap-4 text-base font-normal justify-center`}
            >
              {navLinks.map((item) => (
                <li
                  key={item}
                  className="relative group cursor-pointer"
                  onClick={() => handleNavClick(item)}
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3">
            {data.social_links.map((social) => (
              <div
                key={social.link}
                className="cursor-pointer"
                onClick={() => {
                  const url = social.link.startsWith("http")
                    ? social.link
                    : `https://${social.link}`;
                  window.open(url, "_blank");
                }}
              >
                <Image
                  src={social.image}
                  alt={social.link}
                  width={30}
                  height={30}
                  className="object-contain w-10"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Middle section: Contact Information & Footer Navigation */}
        <div
          className={`${spaceGrotesk.className} flex flex-col md:flex-row items-start justify-between gap-8 pt-12 pb-10 border-b border-white`}
        >
          {/* Left side: Contact Info */}
          <div className="flex flex-col w-full md:w-[40%]">
            <button className="text-lg font-medium bg-lightGreen px-3 py-1 mb-6 rounded-lg self-start">
              Bizimlə əlaqə
            </button>
            <div className="flex flex-col gap-2 text-white text-sm">
              <p>Email: {data.contact.email}</p>
              <p>Mobil nömrə: {data.contact.phone}</p>
              <p>{data.contact.address}</p>
            </div>
          </div>

          {/* Right side: ContactFooter */}
          <div className="w-full md:w-[55%]">
            <ContactFooter />
          </div>
        </div>

        {/* Bottom section: Copyright & Privacy */}
        <div
          className={`${spaceGrotesk.className} flex flex-col md:flex-row items-center gap-2 pt-4 text-white text-sm`}
        >
          <p className="w-full md:w-auto text-center md:text-left">
            © 2025 All Rights Reserved.
          </p>
          <p className="w-full md:w-auto text-center md:text-left underline">
            Privacy Policy
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
