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
import { spaceGrotesk } from "@/lib/fonts";
import Image from "next/image";

const BlogDetailed = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>{slug} - Service Details</title>
      </Head>
      <Header />
      <Container>
        <main className="container mx-auto py-5 md:py-10 mt-24 px-4">
          {/* Back Button */}
          <div
            onClick={() => router.back()}
            className={`${montserrat.className} cursor-pointer flex flex-row items-center gap-1 font-bold text-base pb-2  md:pb-8`}
          >
            <IoMdArrowRoundBack /> Geri
          </div>

          {/* Title and Date */}
          <div className="flex flex-col items-start">
            <h2
              className={`${spaceGrotesk.className} inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl rounded-lg px-2 py-3 font-medium leading-tight text-neutralBlack dark:text-white`}
            >
              {slug}
            </h2>
            <p
              className={`${spaceGrotesk.className} text-base sm:text-lg md:text-xl`}
            >
              17 Fevral, 2025
            </p>
          </div>

          {/* Main Blog Image */}
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex justify-center items-center mx-auto py-8">
            <Image
              src="/images/blog/blog-detail.png"
              width={700}
              height={700}
              quality={100}
              className="w-full object-cover rounded-2xl"
              alt="Blog Detailed"
            />
          </div>

          {/* Blog Content */}
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[50%] flex flex-col mx-auto pb-8 space-y-6">
            <h6
              className={`${spaceGrotesk.className} inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl rounded-lg px-2 py-3 font-medium leading-tight text-neutralBlack dark:text-white`}
            >
              Global Tradeand Sustainability
            </h6>
            <p
              className={`${spaceGrotesk.className} text-base sm:text-lg md:text-xl leading-relaxed`}
            >
              African architecture, the architecture of Africa, particularly of
              sub-Saharan Africa. In North Africa, where Islam and Christianity
              had a significant influence, architecture predominates among the
              visual arts. Included here are the magnificent mosques built of
              mud in Djenné and Mopti in Mali, the rock-hewn churches
              of Ethiopia, and the Islamic monuments of coastal eastern Africa.
              Discussions of architecture in sub-Saharan Africa focus chiefly on
              housing in villages, rural mosques, and the mélange of colonial
              and modern influences that characterize urban areas.
              <br />
              <br />
              This article addresses the range of architectural styles in
              sub-Saharan Africa. For a technical exploration of architecture as
              an art and as a technique, see architecture. For a discussion of
              the visual art of Africa, see African art. For a discussion
              of ancient Egyptian architecture, see Egyptian art and
              architecture. For a treatment of the later architecture
              of Egypt and other parts of North Africa, which were heavily
              influenced by Islam, see Islamic arts: Visual arts. Of
              the buildings of the continent south of the Sahara, the ruins
              of Great Zimbabwe are perhaps the best known. This complex of
              stone enclosures, particularly those popularly termed the
              elliptical building and the acropolis, was built on sites
              established as early as the 3rd century CE. The first Shona phase
              of building was probably begun six centuries later and continued
              until the 15th century, when, under the Mwene Matapa, or “Ravager
              of the Lands,” Zimbabwe reached its peak.
            </p>
            <Image
              src="/images/blog/blog-detail.png"
              width={700}
              height={700}
              quality={100}
              className="w-full object-cover rounded-2xl"
              alt="Blog Detailed"
            />
          </div>
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default BlogDetailed;
