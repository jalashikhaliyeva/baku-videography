import React from "react";
import Title from "../Title";
import SubTitle from "../SubTitle";
import Container from "../Container";
import BlogCard from "../BlogCard";
import { mockBlogs } from "../../data/mockBlogs";
import ShowAllButton from "../ShowAllButton";
import { useRouter } from "next/router";

function Blog() {
    const router = useRouter();
  return (
    <div className="border-t border-t-borderColor">
      <Container>
        <div className="flex flex-row gap-9 items-center pt-60 pb-24 ">
          <Title>Bloq</Title>
          <SubTitle>
            At our digital marketing agency, we offer a range of services to
            help businesses grow and succeed online. These services include:
          </SubTitle>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-60 ">
          {mockBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        <div className="flex justify-center items-center pb-60">
          <ShowAllButton onClick={() => router.push("/blog")}>Hamısına bax</ShowAllButton>
        </div>


      </Container>
    </div>
  );
}

export default Blog;
