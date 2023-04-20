import MoreButton from "./more-button";
import SectionTitle from "./section-title";

export default function FeatureStories({ posts }) {
  return (
    <section className="body-font mx-auto max-w-7xl text-gray-600">
      <div className="container mx-auto px-5 py-20 ">
        <div className="border-b-16 border-black/10 bg-blue-100/80 p-8 ">
          <SectionTitle>Featured Stories</SectionTitle>
          <div className="-m-4 flex flex-wrap ">
            {posts.map(({ node }) => {
              const { databaseId, title, content } = node;
              return (
                <div className="lg:w-1/3" key={databaseId}>
                  <a href="#!" className="">
                    <div className="px-6 py-12">
                      <h2 className="title-font font-noto mb-3 text-xl font-medium text-gray-900 line-clamp-2 sm:text-2xl">
                        {title}
                      </h2>
                      <div className="font-noto prose mb-3 line-clamp-5 ">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                      </div>
                    </div>
                  </a>
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
