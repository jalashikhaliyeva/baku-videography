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

const ServiceDetail = () => {
  const router = useRouter();
  const { slug } = router.query; // This retrieves the dynamic slug

  // You can fetch or use static data based on the slug here.
  // For instance, if you have a data file, you could filter by the slug.

  return (
    <>
      <Head>
        <title>{slug} - Service Details</title>
      </Head>
      <Header />
      <Container>
        <main className="container mx-auto py-10 mt-24">
          {/* Updated back button with onClick */}
          <div
            onClick={() => router.back()}
            className={`${montserrat.className} cursor-pointer flex flex-row items-center gap-1 font-bold text-base pb-8`}
          >
            <IoMdArrowRoundBack /> Geri
          </div>
          <Title>{slug}</Title>

          <SubTitleSingle>
            Lorem ipsum dolor sit amet consectetur. Amet neque eleifend id eget
            dui etiam sit fringilla pulvinar. A risus vitae tristique
            pellentesque aliquet sed enim nec. Sagittis ipsum congue pretium
            est. Ullamcorper nibh consequat nullam quis vitae. Lorem ipsum dolor
            sit amet consectetur. Amet neque eleifend id eget dui etiam sit
            fringilla pulvinar. A risus vitae tristique pellentesque aliquet sed
            enim nec. Sagittis ipsum congue pretium est. Ullamcorper nibh
            consequat nullam quis vitae.
          </SubTitleSingle>

          <ServicesImages />
          <BenefitServices />
        </main>
      </Container>

      <Footer />
    </>
  );
};

export default ServiceDetail;
