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


const PortfolioDetailed = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [selectedVideo, setSelectedVideo] = useState(mockVideoSlide[0]);

  // This callback will be passed to the slider so that when a slide is clicked,
  // the selected video is updated.
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  // Filter out the selected video so it doesn't appear in the slider.
  const sliderData = mockVideoSlide.filter(
    (video) => video.slug !== selectedVideo.slug
  );
  return (
    <>
      <Head>
        <title>{slug} - Service Details</title>
      </Head>
      <Header />
      <Container>
        <main className="container mx-auto py-10 mt-24">
          <div
            onClick={() => router.back()}
            className={`${montserrat.className} cursor-pointer flex flex-row items-center gap-1 font-bold text-base pb-8`}
          >
            <IoMdArrowRoundBack /> Geri
          </div>
          <div className="pb-8">
            <Title>{slug}</Title>

            <SubTitleSingle>
              Lorem ipsum dolor sit amet consectetur. Amet neque eleifend id
              eget dui etiam sit fringilla pulvinar. A risus vitae tristique
              pellentesque aliquet sed enim nec. Sagittis ipsum congue pretium
              est. Ullamcorper nibh consequat nullam quis vitae. Lorem ipsum
              dolor sit amet consectetur. Amet neque eleifend id eget dui etiam
              sit fringilla pulvinar. A risus vitae tristique pellentesque
              aliquet sed enim nec. Sagittis ipsum congue pretium est.
              Ullamcorper nibh consequat nullam quis vitae.
            </SubTitleSingle>
          </div>

          <IframeVideo video={selectedVideo} />
          <VideosSlide
            data={sliderData}
            type="project"
            onVideoSelect={handleVideoSelect}
            activeVideo={selectedVideo}
          />
          <BenefitServices />
          <div className="flex flex-row gap-9 items-center pt-60 pb-6 ">
          <Title>Digər işlər</Title>
         
        </div>
          <Slider data={mockPortfolio} type="project" />
          <div className="flex justify-center items-center pb-5">
          <ShowAllButton onClick={() => router.push("/portfolio")}>Hamısına bax</ShowAllButton>
        </div>
     
        </main>
      </Container>
    

      <Footer />
    </>
  );
};

export default PortfolioDetailed;
