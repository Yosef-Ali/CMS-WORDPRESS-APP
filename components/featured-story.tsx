import Link from "next/link";
import MoreButton from "./more-button";
import SectionTitle from "./section-title";
import parse from "html-react-parser";
import { useState, useEffect } from "react";

export default function FeatureStories({ posts }) {
  // use a state variable to store the parsed content
  const [parsedContent, setParsedContent] = useState(null);

  // use useEffect to parse the content only on the client side
  useEffect(() => {
    setParsedContent(posts.map(({ node }) => parse(node.content)));
  }, [posts]);

  return (
    <section className="body-font mx-auto max-w-7xl text-gray-600">
      <div className="container mx-auto px-5 py-20 ">
        <div className="border-b-16 border-black/10 bg-blue-100/80 p-8 ">
          <SectionTitle>Featured Stories</SectionTitle>
          <div className="-m-4 flex flex-wrap ">
            {posts.map(({ node }, index) => {
              const { databaseId, title } = node;
              return (
                <div className="lg:w-1/3" key={databaseId}>
                  <div className="px-6 py-12">
                    <Link href={`featuredStories/${databaseId}`}>
                      <h2 className="title-font font-noto mb-3 text-xl font-medium text-gray-900 line-clamp-2 sm:text-2xl">
                        {title}
                      </h2>
                    </Link>
                    <div className="font-noto prose mb-3 line-clamp-5 ">
                      {/* use the state variable to render the parsed content */}
                      {parsedContent && parsedContent[index]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <MoreButton title={"Load More"} moreURL={"/featuredStories"} />
        </div>
      </div>
    </section>
  );
}
