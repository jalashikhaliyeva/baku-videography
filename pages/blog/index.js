import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SingleTitle from "@/components/SingleTitle";
import Container from "@/components/Container";
import LoadMoreButton from "@/components/LoadMoreButton";
import { mockBlogs } from "@/data/mockAllBlogs";
import BlogCard from "@/components/BlogCard";

export default function Blogs() {
  // Start by showing the first 9 items.
  const [visibleItems, setVisibleItems] = useState(9);

  // Function to load 9 more items.
  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + 9);
  };

  return (
    <>
      <Head>
        <title>Bloq</title>
      </Head>
      <Header />
      <Container>
        <SingleTitle>Bloq</SingleTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-60 pt-6">
          {mockBlogs.slice(0, visibleItems).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {visibleItems < mockBlogs.length && (
          <div className="flex justify-center items-center pb-60">
            <LoadMoreButton onClick={loadMoreItems} />
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}
