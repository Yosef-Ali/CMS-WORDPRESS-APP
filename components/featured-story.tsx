import Link from "next/link";
import MoreButton from "./more-button";
import SectionTitle from "./section-title";
import { useState, useEffect } from "react";
import reactHtmlParser from "react-html-parser";

interface StoryNode {
  databaseId: number;
  title: string;
  content: string;
}

interface Story {
  node: StoryNode;
}

interface FeatureStoriesProp {
  stories?: Story[]; // make stories prop optional so it can be undefined
}

export default function FeatureStories({ stories }: FeatureStoriesProp) {
  const [parsedContent, setParsedContent] = useState<(JSX.Element | null)[]>(
    []
  );

  useEffect(() => {
    if (stories && stories.length > 0) {
      Promise.all(
        stories.map((story) => {
          if (story.node) {
            return reactHtmlParser(story.node.content);
          } else {
            return null;
          }
        })
      ).then((parsedContents) => {
        setParsedContent(parsedContents);
      });
    } else {
      setParsedContent([]);
    }
  }, [stories]);

  // Check whether stories is undefined before calling map()
  if (!stories) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mx-auto max-w-7xl text-gray-600">
      <div className="container mx-auto px-5 py-20 ">
        <div className="border-b-16 border-black/10 bg-blue-100/80 p-8 ">
          <SectionTitle>Featured Stories</SectionTitle>
          <div className="-m-4 flex flex-wrap ">
            {stories.map((story, index) => {
              const { node } = story;
              if (!node) return null; // Check whether node is defined
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
                      {parsedContent[index] || (
                        <p className="text-red-500">Loading...</p>
                      )}
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
