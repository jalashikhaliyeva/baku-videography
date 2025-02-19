import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SingleTitle from "@/components/SingleTitle";
import Container from "@/components/Container";
import PortfolioCard from "@/components/PortfolioCard";
import data from "@/data/mockPortfolio";
import LoadMoreButton from "@/components/LoadMoreButton";

export default function Portfolio() {
  // Start by showing the first 10 items.
  const [visibleItems, setVisibleItems] = useState(8);

  // Function to load 10 more items.
  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + 8);
  };

  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Header />
      <SingleTitle>Portfolio</SingleTitle>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-60">
          {data.slice(0, visibleItems).map((item) => (
            <PortfolioCard key={item.id} slide={item} type="blog" />
          ))}
        </div>
        {/* Show LoadMoreButton only if there are more items to display */}
        {visibleItems < data.length && (
          <LoadMoreButton onClick={loadMoreItems} />
        )}
      </Container>
      <Footer />
    </>
  );
}
