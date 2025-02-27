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
import { getSingleBlog } from "@/services/getSingleBlog";
import { getSettings } from "@/services/getSettings";
import DOMPurify from "isomorphic-dompurify";
import Loading from "@/components/Loading";

const BlogDetailed = ({ blogData, settingsData }) => {
  if (!settingsData || !blogData) {
    return <><Loading /></>;
  }
  const router = useRouter();
  const { slug } = router.query;

  const sanitizedHTML = DOMPurify.sanitize(blogData.data.description, {
    FORBID_ATTR: ["style"],
  });

  const blogsMeta = settingsData.meta_tags.find(
    (meta) => meta.title === "Blogs"
  );
  return (
    <>
     <Head>
        {/* Fallback to default values if homeMeta is not found */}
        <title>
          {blogsMeta ? blogsMeta.meta_title : "Default Title"}
        </title>
        {blogsMeta && (
          <>
            <meta name="description" content={blogsMeta.meta_description} />
            <meta name="keywords" content={blogsMeta.meta_keywords} />
          </>
        )}
        <link rel="icon" href={settingsData.main.favicon} />
      </Head>
      <Header data={settingsData.main} />
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
              {blogData.data.title}
            </h2>
            <p
              className={`${spaceGrotesk.className} text-base sm:text-lg md:text-xl`}
            >
            {blogData.data.created_at}
            </p>
          </div>

          {/* Main Blog Image */}
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex justify-center items-center mx-auto py-8">
            <Image
              src={blogData.data.image}
              // src="/images/blog/blog-detail.png"
              width={700}
              height={700}
              quality={100}
              className="w-full object-cover rounded-2xl"
              alt="Blog Detailed"
            />
          </div>

          {/* Blog Content */}
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[50%] flex flex-col mx-auto pb-8 space-y-6">
            {/* <h6
              className={`${spaceGrotesk.className} inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl rounded-lg px-2 py-3 font-medium leading-tight text-neutralBlack dark:text-white`}
            >
              Global Tradeand Sustainability
            </h6> */}
            {/* <p
              className={`${spaceGrotesk.className} text-base sm:text-lg md:text-xl leading-relaxed`}
            >
              {blogData.data.description}
            </p> */}

            <div
              className={`${spaceGrotesk.className} text-base sm:text-lg md:text-xl leading-relaxed`}
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />
            {/* <Image
              src="/images/blog/blog-detail.png"
              width={700}
              height={700}
              quality={100}
              className="w-full object-cover rounded-2xl"
              alt="Blog Detailed"
            /> */}
          </div>
        </main>
      </Container>
      <Footer data={settingsData} />
    </>
  );
};

export default BlogDetailed;

export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  const { slug } = context.params;

  try {
    const [settingsData, blogData] = await Promise.all([
      getSettings(lang),
      getSingleBlog(lang, slug),
    ]);

    return {
      props: {
        settingsData,
        blogData,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        settingsData: null,
        blogData: null,
      },
    };
  }
}
