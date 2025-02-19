import Image from "next/image";
import { montserrat } from "../lib/fonts";
import { spaceGrotesk } from "../lib/fonts";
import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Blog from "@/components/Blog";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Head />
      <Header />
      <Hero />
      <Partners />
      <Services />
      <Portfolio />
      <Projects id="projects" />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
