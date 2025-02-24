import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SingleTitle from "@/components/SingleTitle";
import Container from "@/components/Container";
import PortfolioCard from "@/components/PortfolioCard";
import LoadMoreButton from "@/components/LoadMoreButton";
import { getSettings } from "@/services/getSettings";
import { useRouter } from "next/router";
import { getPortfolio } from "@/services/getPortfolio";
import Loading from "@/components/Loading";

export default function Portfolio({ settingsData, portfolioData }) {
  const router = useRouter();
  if (!settingsData || !portfolioData) {
    return <><Loading /></>;
  }

  // Initialize state with initial portfolio data and pagination info
  const [portfolioItems, setPortfolioItems] = useState(portfolioData.data);
  const [pagination, setPagination] = useState({
    currentPage: portfolioData.meta.current_page,
    lastPage: portfolioData.meta.last_page,
    nextLink: portfolioData.links.next,
  });
  const [loadingMore, setLoadingMore] = useState(false);

  // Function to load more items from the API
  const loadMoreItems = async () => {
    if (pagination.nextLink) {
      setLoadingMore(true);
      try {
        const res = await fetch(pagination.nextLink);
        const newData = await res.json();
        // Concatenate new items with the existing ones
        setPortfolioItems((prevItems) => [...prevItems, ...newData.data]);
        // Update pagination info
        setPagination({
          currentPage: newData.meta.current_page,
          lastPage: newData.meta.last_page,
          nextLink: newData.links.next,
        });
      } catch (error) {
        console.error("Failed to load more items", error);
      }
      setLoadingMore(false);
    }
  };
  const portfolioMeta = settingsData.meta_tags.find((meta) => meta.title === "Portfolios");

  return (
    <>
    <Head>
        {/* Fallback to default values if homeMeta is not found */}
        <title>{portfolioMeta ? portfolioMeta.meta_title : "Default Title"}</title>
        {portfolioMeta && (
          <>
            <meta name="description" content={portfolioMeta.meta_description} />
            <meta name="keywords" content={portfolioMeta.meta_keywords} />
          </>
        )}
        <link rel="icon" href={settingsData.main.favicon} />
      </Head>
      <Header data={settingsData.main} />
      <SingleTitle>Portfolio</SingleTitle>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-60">
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.id} slide={item} type="blog" />
          ))}
        </div>
        {/* Render LoadMoreButton only if there's a next page */}
        {pagination.nextLink && (
          <LoadMoreButton onClick={loadMoreItems} disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load More"}
          </LoadMoreButton>
        )}
      </Container>
      <Footer data={settingsData} />
    </>
  );
}

export async function getServerSideProps(context) {
  const lang = context.locale || "az";

  try {
    const [settingsData, portfolioData] = await Promise.all([
      getSettings(lang),
      getPortfolio(lang),
    ]);

    return {
      props: {
        settingsData,
        portfolioData,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        settingsData: null,
        portfolioData: null,
      },
    };
  }
}
