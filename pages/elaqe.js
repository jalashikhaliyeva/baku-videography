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
import { getSettings } from "@/services/getSettings";
import { useRouter } from "next/router";
export default function Elaqe({ settingsData }) {
  const router = useRouter();
  const { locale } = router;
  return (
    <>
      <Head />
      <Header data={settingsData.main} />

      <div className="pt-60">
        <Contact />
      </div>

      <Footer data={settingsData} />
    </>
  );
}

export async function getServerSideProps(context) {
  const lang = context.locale || "az";

  try {
    const [settingsData] = await Promise.all([getSettings(lang)]);

    return {
      props: {
        settingsData,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        settingsData: null,
      },
    };
  }
}
