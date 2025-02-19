import React from "react";
import { useRouter } from "next/router";
import { spaceGrotesk } from "../../lib/fonts";

function BlogCard({ blog }) {
  const router = useRouter();

  const handleClick = (slug) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div

      onClick={() => handleClick(blog.slug)}
      className="relative group bg-no-repeat bg-cover p-8 rounded-2xl shadow-raised h-full cursor-pointer"
      style={{
        background: `linear-gradient(180deg, rgba(25, 26, 35, 0.00) 0.12%, rgba(25, 26, 35, 0.49) 48.59%, #191A23 99.88%), url(${blog.image}) lightgray 50% / cover no-repeat`,
      }}
    >
      {/* SVG appears in the top-right on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="flex items-center gap-2 bg-black border border-lightGreen p-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
          >
            <path
              d="M11.25 24.701C10.5326 25.1152 10.2867 26.0326 10.701 26.75C11.1152 27.4674 12.0326 27.7133 12.75 27.299L11.25 24.701ZM30.7694 16.3882C30.9838 15.588 30.5089 14.7655 29.7087 14.5511L16.6687 11.0571C15.8685 10.8426 15.046 11.3175 14.8316 12.1177C14.6172 12.9179 15.0921 13.7404 15.8923 13.9548L27.4834 17.0607L24.3776 28.6518C24.1631 29.452 24.638 30.2745 25.4382 30.4889C26.2384 30.7033 27.0609 30.2284 27.2753 29.4282L30.7694 16.3882ZM12.75 27.299L30.0705 17.299L28.5705 14.701L11.25 24.701L12.75 27.299Z"
              fill="#B9FF66"
            />
          </svg>
        </div>
      </div>

      <div className={`${spaceGrotesk.className} flex flex-col text-white pt-20`}>
        <h6 className="text-3xl border-t border-t-white pt-4 transition-colors duration-300 group-hover:text-lightGreen">
          {blog.title}
        </h6>
        <p className="text-base">{blog.description}</p>
      </div>
    </div>
  );
}

export default BlogCard;
