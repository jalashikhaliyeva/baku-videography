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
import CategoryFilter from "@/components/CategoryFilter"; // Import the filter component

export default function Portfolio({ settingsData, portfolioData }) {
  const router = useRouter();
  if (!settingsData || !portfolioData) {
    return <Loading />;
  }

  // Destructure the portfolios data
  const initialPortfolios = portfolioData.data.portfolios.data;
  const initialMeta = portfolioData.data.portfolios.meta;
  const initialLinks = portfolioData.data.portfolios.links;

  // Initialize state for portfolio items and pagination
  const [portfolioItems, setPortfolioItems] = useState(initialPortfolios);
  const [pagination, setPagination] = useState({
    currentPage: initialMeta.current_page,
    lastPage: initialMeta.last_page,
    nextLink: initialLinks.next,
  });
  const [loadingMore, setLoadingMore] = useState(false);

  // Add filter state with default set to "All"
  const [selectedFilter, setSelectedFilter] = useState("Hamısı");

  // Extract categories. You can use the dedicated tags field if available or derive from items.
  const categories =
    portfolioData.tags ||
    Array.from(
      new Set(
        portfolioItems.flatMap((item) => item.tags.map((tag) => tag.title))
      )
    ).map((title) => ({ title }));

  // Build the filters list (default "All" + individual categories)
  const filters = ["Hamısı", ...categories.map((category) => category.title)];

  // Filter the portfolio items based on the selected filter
  const filteredPortfolioItems =
    selectedFilter === "Hamısı"
      ? portfolioItems
      : portfolioItems.filter((item) =>
          item.tags.some((tag) => tag.title === selectedFilter)
        );

  // Function to load more items from the API
  const loadMoreItems = async () => {
    if (pagination.nextLink) {
      setLoadingMore(true);
      try {
        const res = await fetch(pagination.nextLink);
        const newData = await res.json();
        const newPortfolios = newData.data.portfolios.data;
        const newMeta = newData.data.portfolios.meta;
        const newLinks = newData.data.portfolios.links;
        setPortfolioItems((prevItems) => [...prevItems, ...newPortfolios]);
        setPagination({
          currentPage: newMeta.current_page,
          lastPage: newMeta.last_page,
          nextLink: newLinks.next,
        });
      } catch (error) {
        console.error("Failed to load more items", error);
      }
      setLoadingMore(false);
    }
  };

  const portfolioMeta = settingsData.meta_tags.find(
    (meta) => meta.title === "Portfolios"
  );

  return (
    <>
      <Head>
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
      <SingleTitle>Portfolio</SingleTitle>

      <Container>
        {/* Render the category filter buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {filters.map((filter) => (
            <CategoryFilter
              key={filter}
              label={filter}
              isSelected={filter === selectedFilter}
              onClick={() => setSelectedFilter(filter)}
            />
          ))}
        </div>

        {/* Render portfolio items based on filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-60">
          {filteredPortfolioItems.map((item) => (
            <PortfolioCard
              key={item.id || item.slug}
              slide={item}
              type="blog"
            />
          ))}
        </div>
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
