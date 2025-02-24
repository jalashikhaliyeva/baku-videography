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
import { getServices } from "@/services/getServices";
import { getSettings } from "@/services/getSettings";
import { getSingleService } from "@/services/getSingleService";
import Loading from "@/components/Loading";

const ServiceDetail = ({ serviceData, settingsData }) => {
  const router = useRouter();
  const { slug } = router.query; // This retrieves the dynamic slug
  if (!serviceData || !settingsData) {
    return <><Loading /></>;
  }

  // console.log(serviceData, "serviceData");
  const servicesMeta = settingsData.meta_tags.find(
    (meta) => meta.title === "Services"
  );
  return (
    <>
      <Head>
        {/* Fallback to default values if homeMeta is not found */}
        <title>
          {servicesMeta ? servicesMeta.meta_title : "Default Title"}
        </title>
        {servicesMeta && (
          <>
            <meta name="description" content={servicesMeta.meta_description} />
            <meta name="keywords" content={servicesMeta.meta_keywords} />
          </>
        )}
        <link rel="icon" href={settingsData.main.favicon} />
      </Head>
      <Header data={settingsData.main} />
      <Container>
        <main className="container mx-auto py-10 mt-24">
          {/* Updated back button with onClick */}
          <div
            onClick={() => router.back()}
            className={`${montserrat.className} cursor-pointer flex flex-row items-center gap-1 font-bold text-base pb-8`}
          >
            <IoMdArrowRoundBack /> Geri
          </div>
          <Title>{serviceData.data.title}</Title>

          <SubTitleSingle>{serviceData.data.description}</SubTitleSingle>

          <ServicesImages data={serviceData.data.images} />
          <BenefitServices />
        </main>
      </Container>

      <Footer data={settingsData} />
    </>
  );
};

export default ServiceDetail;

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  const { slug } = context.params;

  try {
    const [settingsData, serviceData] = await Promise.all([
      getSettings(lang),
      getSingleService(lang, slug),
    ]);

    return {
      props: {
        settingsData,
        serviceData,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        settingsData: null,
        serviceData: null,
      },
    };
  }
}
