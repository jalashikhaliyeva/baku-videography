import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SingleTitle from "@/components/SingleTitle";
import Container from "@/components/Container";
import LoadMoreButton from "@/components/LoadMoreButton";
import BlogCard from "@/components/BlogCard";
import { getBlogs } from "@/services/getBlogs";
import { getSettings } from "@/services/getSettings";
import Loading from "@/components/Loading";

export default function Blogs({
  initialBlogs,
  initialLinks,
  settingsData,
  lang,
}) {
  if (!settingsData || !initialBlogs) {
    return <><Loading /></>;
  }

  // Store blogs and next-page URL from the API in state.
  const [blogs, setBlogs] = useState(initialBlogs);
  const [nextPage, setNextPage] = useState(initialLinks?.next);
  const [loading, setLoading] = useState(false);

  // Load more blogs using the nextPage URL
  const loadMoreItems = async () => {
    if (!nextPage) return;
    setLoading(true);
    try {
      const res = await fetch(nextPage, {
        headers: { "Accept-Language": lang },
      });
      const data = await res.json();
      // Append the new blogs to the existing list.
      setBlogs((prevBlogs) => [...prevBlogs, ...data.data]);
      // Update the nextPage state (will be null if no further page exists)
      setNextPage(data.links?.next);
    } catch (error) {
      console.error("Error loading more blogs:", error);
    }
    setLoading(false);
  };

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
        <SingleTitle>Bloq</SingleTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-60 pt-6">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id || blog.slug || index} blog={blog} />
          ))}
        </div>
        {nextPage && (
          <div className="flex justify-center items-center pb-60">
            <LoadMoreButton onClick={loadMoreItems} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </LoadMoreButton>
          </div>
        )}
      </Container>
      <Footer data={settingsData} />
    </>
  );
}

export async function getServerSideProps(context) {
  const lang = context.locale || "az";

  try {
    const settingsData = await getSettings(lang);
    // Fetch the first page of blogs.
    const blogsResponse = await getBlogs(lang, 1);
    return {
      props: {
        settingsData,
        initialBlogs: blogsResponse.data,
        initialLinks: blogsResponse.links, // Pass the links separately
        lang,
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        settingsData: null,
        initialBlogs: [],
        initialLinks: {},
        lang,
      },
    };
  }
}
