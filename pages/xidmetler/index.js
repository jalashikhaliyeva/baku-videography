import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SingleTitle from "@/components/SingleTitle";
import CerviceCardSingle from "@/components/CerviceCardSingle";
import Container from "@/components/Container";
import { useRouter } from "next/router";
import { getServices } from "@/services/getServices";
import { getSettings } from "@/services/getSettings";
import Loading from "@/components/Loading";

export default function Xidmetler({ servicesData, settingsData }) {
  const router = useRouter();
  if (!servicesData || !settingsData) {
    return <><Loading /></>;
  }

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
      <SingleTitle>Xidmetler</SingleTitle>
      <Container>
        <CerviceCardSingle servicesData={servicesData} />
      </Container>
      <Footer data={settingsData} />
    </>
  );
}

export async function getServerSideProps(context) {
  const lang = context.locale || "az";

  try {
    const [servicesData, settingsData] = await Promise.all([
      getServices(lang),
      getSettings(lang),
    ]);

    return {
      props: {
        servicesData,
        settingsData,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        servicesData: null,
        settingsData: null,
      },
    };
  }
}
