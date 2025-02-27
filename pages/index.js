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
import { useRouter } from "next/router";
import { getHero } from "@/services/getHero";
import { getPartners } from "@/services/getPartners";
import { getServices } from "@/services/getServices";
import { getPortfolio } from "@/services/getPortfolio";
import { getProjects } from "@/services/getProjects";
import { getBlogs } from "@/services/getBlogs";
import { getSettings } from "@/services/getSettings";

export default function Home({
  heroData,
  parnersData,
  servicesData,
  portfolioData,
  projectsData,
  blogsData,
  settingsData,
}) {
  const router = useRouter();
  const { locale } = router;
  console.log(settingsData, "settingsData");

  if (
    !heroData ||
    !parnersData ||
    !servicesData ||
    !portfolioData ||
    !projectsData ||
    !blogsData ||
    !settingsData
  ) {
    return <div>Loading..</div>;
  }

  const homeMeta = settingsData.meta_tags.find((meta) => meta.title === "Home");
  return (
    <>
      <Head>
        <title>{homeMeta ? homeMeta.meta_title : "Default Title"}</title>
        {homeMeta && (
          <>
            <meta name="description" content={homeMeta.meta_description} />
            <meta name="keywords" content={homeMeta.meta_keywords} />
          </>
        )}
        <link rel="icon" href={settingsData.main.favicon} />
      </Head>
      <Header data={settingsData.main} />
      <Hero data={heroData.data} />
      <Partners data={parnersData.data} />
      <Services
        data={
          servicesData.data.length > 4
            ? servicesData.data.slice(0, 4)
            : servicesData.data
        }
      />
      <Portfolio data={portfolioData.data.portfolios.data} />
      <Projects id="projects" data={projectsData.data} />
      <Blog
        data={
          blogsData.data.length >= 6
            ? blogsData.data.slice(0, 6)
            : blogsData.data.slice(0, 3)
        }
      />

      <Contact />
      <Footer data={settingsData} />
    </>
  );
}

export async function getServerSideProps(context) {
  const lang = context.locale || "az";

  try {
    const [
      heroData,
      parnersData,
      servicesData,
      portfolioData,
      projectsData,
      blogsData,
      settingsData,
    ] = await Promise.all([
      getHero(lang),
      getPartners(lang),
      getServices(lang),
      getPortfolio(lang),
      getProjects(lang),
      getBlogs(lang),
      getSettings(lang),
    ]);

    return {
      props: {
        heroData,
        parnersData,
        servicesData,
        portfolioData,
        projectsData,
        blogsData,
        settingsData,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        heroData: null,
        parnersData: null,
        servicesData: null,
        portfolioData: null,
        projectsData: null,
        blogsData: null,
        settingsData: null,
      },
    };
  }
}
