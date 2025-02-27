// pages/services/[slug].js
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import SubTitleSingle from "@/components/SubTitleSingle";
import { IoMdArrowRoundBack } from "react-icons/io";
import { montserrat } from "@/lib/fonts";
import ServicesImages from "@/components/ServicesImages";
import Container from "@/components/Container";
import BenefitServices from "@/components/BenefitServices";
import Projects from "@/components/Projects";
import Slider from "@/components/EmblaCarouselAdvantage/EmblaCarousel";
import mockPortfolio from "../../data/mockPortfolio";
import mockVideoSlide from "@/data/mockVideoSlide";

import { useState } from "react";
import IframeVideo from "@/components/IframeVideo";
import VideosSlide from "@/components/VideosSlide/EmblaCarousel";
import Portfolio from "@/components/Portfolio";
import ShowAllButton from "@/components/ShowAllButton";
import { getSinglePortfolio } from "@/services/getSinglePortfolio";
import { getSettings } from "@/services/getSettings";
import { getProjects } from "@/services/getProjects";
import { getPortfolio } from "@/services/getPortfolio";
import Loading from "@/components/Loading";
const PortfolioDetailed = ({
  portfolioData,
  settingsData,
  projectsData,
  allPortfolios,
}) => {
  const router = useRouter();
  const { slug } = router.query;

  if (!portfolioData || !settingsData || !allPortfolios) {
    return <><Loading /></>;
  }

  console.log(projectsData, "projectsData");

  console.log(portfolioData, "portfolioData");

  // Use the images array f
  //
  // rom portfolioData
  const images = portfolioData.data.images;

  // Initialize selectedVideo with the first image from portfolioData
  const [selectedVideo, setSelectedVideo] = useState(images[0]);

  // Update the selected video when a slide is clicked
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  // Filter out the selected video so it doesn't appear in the slider
  const sliderData = images.filter(
    (video) => video.link !== selectedVideo.link
  );
  const portfolioMeta = settingsData.meta_tags.find(
    (meta) => meta.title === "Portfolios"
  );

  return (
    <>
      <Head>
        {/* Fallback to default values if homeMeta is not found */}
        <title>
          {portfolioMeta ? portfolioMeta.meta_title : "Default Title"}
        </title>
        {portfolioMeta && (
          <>
            <meta name="description" content={portfolioMeta.meta_description} />
            <meta name="keywords" content={portfolioMeta.meta_keywords} />
          </>
        )}
        <link rel="icon" href={settingsData.main.favicon} />
      </Head>
      <Header data={settingsData.main} />
      <Container>
        <main className="container mx-auto py-10 mt-24">
          <div
            onClick={() => router.back()}
            className={`${montserrat.className} cursor-pointer flex flex-row items-center gap-1 font-bold text-base pb-8`}
          >
            <IoMdArrowRoundBack /> Geri
          </div>
          <div className="pb-8">
            <Title>{portfolioData.data.title}</Title>
            <SubTitleSingle>{portfolioData.data.description}</SubTitleSingle>
          </div>

          {/* Display the selected video */}
          <IframeVideo video={selectedVideo} />
          {/* Pass the filtered videos to the slider */}
          <VideosSlide
            data={sliderData}
            type="project"
            onVideoSelect={handleVideoSelect}
            activeVideo={selectedVideo}
          />

          <BenefitServices data={settingsData} />
          <div className="flex flex-row gap-9 items-center pt-60 pb-6">
            <Title>Digər işlər</Title>
          </div>
          <Slider data={allPortfolios.data.portfolios.data} type="project" />

          <div className="flex justify-center items-center pb-5">
            <ShowAllButton onClick={() => router.push("/portfolio")}>
              Hamısına bax
            </ShowAllButton>
          </div>
        </main>
      </Container>
      <Footer data={settingsData} />
    </>
  );
};

export default PortfolioDetailed;

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  const { slug } = context.params;

  try {
    const [settingsData, portfolioData, projectsData, allPortfolios] =
      await Promise.all([
        getSettings(lang),
        getSinglePortfolio(lang, slug),
        getProjects(lang),
        getPortfolio(lang),
      ]);

    return {
      props: {
        settingsData,
        portfolioData,
        projectsData,
        allPortfolios,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        settingsData: null,
        portfolioData: null,
        projectsData: null,
        allPortfolios: null,
      },
    };
  }
}
